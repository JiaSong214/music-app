import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../store/modules/token';

const useAuth = () => {
  const dispatch = useDispatch();

  const redirect_uri = "http://jiasong214.github.io/spotify-clone/";
  // const redirect_uri = "http://localhost:3000";
  const client_id = "7da971157300402095a7852508e36dce";
  const client_secret = "9c0e75f27b084a718f560a6e7ec7ef19";

  const fetchAccessToken = async (code) => {
    // token request address
    const requestApi = `https://accounts.spotify.com/api/token?code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`;
  
    //get a token from Api
    try{
      const response = await fetch(requestApi, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
          'Content-Type': 'application/x-www-form-urlencoded',
          "Accept": "application/json",
        }
      }).then(res => res.json());
  
      const access_token = await response.access_token;
      const refresh_token = await response.refresh_token;
  
      return { access_token, refresh_token };
    }catch{
      console.log('access token err');
    }
  }

  // extract parameters value from address
  const getParamsValue = () => {
    //destructe url to check if there is access_token
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      // q = window.location.hash.substring(1);
      q = window.location.href.split('?')[1];

    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  }

  // take user to authorize page.
  const checkAuth = useCallback(async () => {
    // find a code from location parameters
    const code = getParamsValue().code;
    // get access token by exchanging with the code
    const { access_token } = await fetchAccessToken(code);

    if(access_token){
      // if you get access_token, set it in reducer
      dispatch(setAccessToken(access_token));
      window.history.pushState({}, null, "/");
      
    }else{
      // if there is no access_token, require authorize.
      const scopes = [
        "playlist-read-private", "playlist-read-collaborative", "playlist-modify-public", "playlist-modify-private", "user-read-recently-played", "ugc-image-upload", "user-follow-modify", "user-follow-read", "user-library-read", "user-library-modify", "user-read-private", "user-read-email", "user-top-read", "user-read-playback-state"
      ]

      // redirect user
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&scope=${scopes.join("%20")}&redirect_uri=${redirect_uri}`;
    }
  }, [dispatch]);


  return { checkAuth }
}

export default useAuth;