import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAccessToken } from './store/modules/token';
import { fetchAccessToken } from './api';

import Navigation from './components/navgation';
import PlayBar from './components/playBar';
import Header from './components/header';
import Main from './components/main';
import Modal from './components/modal';


function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  const [ modal, setModal ] = useState(false)

  //To extract parameters value from address
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


  //authorization
  useEffect(() => {
    //first, check if there is token or not.
    const checkAccessToken = () => {
      //if there is no token, authorize user
      if(accessToken === ''){
        checkAuth();
      }
    }

    //second, if there is no token, take user to authorize page.
    const checkAuth = async () => {
      //find a code from location parameters
      const code = getParamsValue().code;
      //get access token by exchanging with the code
      const { access_token } = await fetchAccessToken(code);

      if(access_token){
        //if you get access_token, set it in reducer
        dispatch(setAccessToken(access_token));
      }else{
        //if there is no access_token, require authorize.
        window.location.href = `https://accounts.spotify.com/authorize?client_id=7da971157300402095a7852508e36dce&response_type=code&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&redirect_uri=http://localhost:3000/callback/`;
      }
    }

    checkAccessToken();
  },[accessToken, dispatch]);


  //modal active 2 sec after rendering
  useEffect(() => {
    setTimeout(() => {
      setModal(true);
    }, 2000)
  },[])


  if(!accessToken) return null;
  return (
    <>
      <Navigation/>
      <Header/>
      <PlayBar/>
      <Main/>
      <Modal active={modal} />
    </>
  );
}

export default App;
