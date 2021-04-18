import { pendingUserFetch, succeedUserFetch, failUserFetch } from './store/modules/user';

import { pendingAlbumsFetch, succeedAlbumsFetch, failAlbumsFetch } from './store/modules/albums';

import { pendingSongsFetch, succeedSongsFetch, failSongsFetch,
  pendingSearchSongsFetch, succeedSearchSongsFetch, failSearchSongsFetch } from './store/modules/songs'

import { pendingPlaylistsFetch, succeedPlaylistsFetch, failPlaylistsFetch } from './store/modules/playlists'

import { pendingNewReleasesFetch, succeedNewReleasesFetch, failNewReleasesFetch,
  pendingCategoriesFetch, succeedCategoriesFetch, failCategoriesFetch,
  pendingFeaturedFetch, succeedFeaturedFetch, failFeaturedFetch } from './store/modules/browse'


const client_id = `7da971157300402095a7852508e36dce`;
const client_secret = `9c0e75f27b084a718f560a6e7ec7ef19`;
const redirect_uri=`http://localhost:3000/callback/`;
// const scope = `playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state`;



export const fetchAccessToken = async (code) => {
  // token request address
  const requestApi = `https://accounts.spotify.com/api/token?code=${code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`;

  //get a token from Api
  try{
    const response = await fetch(requestApi, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    });

    const data = await response.json();
    const access_token = data.access_token;

    return access_token;

  }catch{
    console.log('access token err');
  }
}


// 이게 왜 필요한건지??
export const fetchRefreshedAccessToken = async (code) => {
  const requestApi = `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${code}`;

  try{
    const response = await fetch(requestApi, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const data = response.json();

    console.log(data);
  }catch{

  }
}


export const fetchUserData = (access_token) => (dispatch) => {
  dispatch(pendingUserFetch());

  return fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedUserFetch(data)))
  .catch(err => dispatch(failUserFetch(err)))
}


export const fetchAlbums = (access_token) => (dispatch) => {
  dispatch(pendingAlbumsFetch());

  return fetch(`https://api.spotify.com/v1/me/albums`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedAlbumsFetch(data)))
  .catch(err => dispatch(failAlbumsFetch(err)))
}


export const fetchAlbumTracks = (access_token, href) => (dispatch) => {
  dispatch(pendingSongsFetch());

  return fetch(href, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedSongsFetch(data)))
  .catch(err => dispatch(failSongsFetch(err)))
}


export const fetchNewReleases = (access_token) => (dispatch) => {
  dispatch(pendingNewReleasesFetch());

  return fetch(`https://api.spotify.com/v1/browse/new-releases`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedNewReleasesFetch(data)))
  .catch(err => dispatch(failNewReleasesFetch(err)))
}


export const fetchCategories = (access_token) => (dispatch) => {
  dispatch(pendingCategoriesFetch());

  return fetch(`https://api.spotify.com/v1/browse/categories`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedCategoriesFetch(data)))
  .catch(err => dispatch(failCategoriesFetch(err)))
}


export const fetchFeatured = (access_token) => (dispatch) => {
  dispatch(pendingFeaturedFetch());

  return fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedFeaturedFetch(data)))
  .catch(err => dispatch(failFeaturedFetch(err)))
}


export const fetchRecentlyPlayed = (access_token) => (dispatch) => {
  dispatch(pendingSongsFetch());

  return fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => {
    //remove duplication
    const uniqueArray = data.items.filter((item, index, self) => {
      return index === self.findIndex(t => {
        return t.track.name === item.track.name && t.track.artists[0].name === item.track.artists[0].name
      })
    });
    //make it same formet
    const dataArray = {
      items: [...uniqueArray]
    };
    return dataArray;
  })
  .then(data => dispatch(succeedSongsFetch(data)))
  .catch(err => dispatch(failSongsFetch(err)))
}


export const fetchLikedSongs = (access_token) => (dispatch) => {
  dispatch(pendingSongsFetch());

  return fetch(`https://api.spotify.com/v1/me/tracks`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedSongsFetch(data)))
  .catch(err => dispatch(failSongsFetch(err)))
}


export const fetchSearchResults = (access_token, search_term) => (dispatch) => {
  dispatch(pendingSearchSongsFetch());

  return fetch(`https://api.spotify.com/v1/search?q=${search_term}&type=track&limit=30&offset=5`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => {
    //remove duplication
    const uniqueArray = data.tracks.items.filter((item, index, self) => {
      return index === self.findIndex(t => {
        return t.name === item.name && t.artists[0].name === item.artists[0].name
      })
    });
    //make it same formet
    const dataArray = {
      items: [...uniqueArray]
    };
    return dataArray;
  })
  .then(data => dispatch(succeedSearchSongsFetch(data, search_term)))
  .catch(err => dispatch(failSearchSongsFetch(err)))
}


export const fetchPlaylists = (access_token) => (dispatch) => {
  dispatch(pendingPlaylistsFetch());

  return fetch(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedPlaylistsFetch(data)))
  .catch(err => dispatch(failPlaylistsFetch(err)))
}


export const fetchPlaylistTracks = (access_token, playlist_id) => (dispatch) => {
  dispatch(pendingSongsFetch());

  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
  .then(data => dispatch(succeedSongsFetch(data)))
  .catch(err => dispatch(failSongsFetch(err)))
}
