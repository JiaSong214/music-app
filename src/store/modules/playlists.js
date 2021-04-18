//define action type
const PENDING_PLAYLISTS_FETCH = 'playlists/PENDING_PLAYLISTS_FETCH';
const SUCCEED_PLAYLISTS_FETCH = 'playlists/SUCCEED_PLAYLISTS_FETCH';
const FAIL_PLAYLISTS_FETCH = 'playlists/FAIL_PLAYLISTS_FETCH';

const SET_CURRENT_PLAYLIST = 'playlists/SET_CURRENT_PLAYLIST';

//make action generate function
export const pendingPlaylistsFetch = () => ({
  type: PENDING_PLAYLISTS_FETCH
});

export const succeedPlaylistsFetch = (playlists) => ({
  type: SUCCEED_PLAYLISTS_FETCH,
  data: playlists
});

export const failPlaylistsFetch = (err) => ({
  type: FAIL_PLAYLISTS_FETCH,
  error: err
});

export const setCurrentPlaylist = (playlist) => ({
  type: SET_CURRENT_PLAYLIST,
  data: playlist
});



//initial state of module
const initialState = {
  data: {},
  pending: false,
  error: null
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  switch(action.type) {
    case PENDING_PLAYLISTS_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_PLAYLISTS_FETCH:
      return {
        ...state,
        data: action.data,
        pending: false
      };
    case FAIL_PLAYLISTS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        current_playlist: action.data,
      };
    default:
      return state;
  }
}