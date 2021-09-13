import { pendingUserFetch, succeedUserFetch, failUserFetch } from './store/modules/user';
import http from './http/http.js';

export const fetchUserData = (access_token) => (dispatch) => {
  dispatch(pendingUserFetch());

  return http(`/me`, access_token)
    .then(data => dispatch(succeedUserFetch(data)))
    .catch(err => dispatch(failUserFetch(err)))
}


export const fetchAlbums = async (access_token) => {
  return http(`/me/albums`, access_token)
}


export const fetchAlbumTracks = (access_token, id) => {
  return http(`/albums/${id}`, access_token)
}


export const fetchNewReleases = async (access_token) => {
  return http(`/browse/new-releases`, access_token);
}


export const fetchCategories = (access_token) => {
  return http(`/browse/categories`, access_token);
}


export const fetchFeatured = (access_token) => {
  return http(`/browse/featured-playlists`, access_token);
}


export const fetchRecentlyPlayed = (access_token) => {
  return http(`/me/player/recently-played`, access_token)
  .then(data => {
    //remove duplication
    const uniqueArray = data.items.filter((item, index, self) => (
      index === self.findIndex(t => (
        t.track.id === item.track.id
      ))
    ));
  
    return uniqueArray;
  })
}


export const fetchLikedSongs = (access_token) => {
  return http(`/me/tracks`, access_token);
}


export const fetchSearchResults = (access_token, search_term) => {
  return http(`/search?q=${search_term}&type=track&limit=30&offset=5`, access_token)
    .then(data => {
      //remove duplication
      const uniqueArray = data.tracks.items.filter((item, index, self) => (
        index === self.findIndex(t => (
          t.id === item.id
        ))
      ));

      return uniqueArray;
    })
}

export const fetchPlaylist = (access_token, playlist_id) => {
  return http(`/playlists/${playlist_id}`, access_token);
}


export const fetchPlaylists = (access_token) => {
  return http(`/me/playlists`, access_token);
}


export const putLikedSong = (access_token, song_id) => {
  http(`/me/tracks?ids=${song_id}`, access_token, {
    method: "PUT"
  });
}


export const putMyAlbum = (access_token, album_id) => {
  http(`/me/albums?ids=${album_id}`, access_token, {
    method: "PUT"
  });
}
