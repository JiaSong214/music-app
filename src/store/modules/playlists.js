//define action type
const PENDING_PLAYLISTS_FETCH = 'playlists/PENDING_PLAYLISTS_FETCH';
const SUCCEED_PLAYLISTS_FETCH = 'playlists/SUCCEED_PLAYLISTS_FETCH';
const FAIL_PLAYLISTS_FETCH = 'playlists/FAIL_PLAYLISTS_FETCH';

const PENDING_PLAYLIST_TRACKS_FETCH = 'playlists/PENDING_PLAYLIST_TRACKS_FETCH';
const SUCCEED_PLAYLIST_TRACKS_FETCH = 'playlists/SUCCEED_PLAYLIST_TRACKS_FETCH';
const FAIL_PLAYLIST_TRACKS_FETCH = 'playlists/FAIL_PLAYLIST_TRACKS_FETCH';

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


export const pendingPlaylistTracksFetch = () => ({
  type: PENDING_PLAYLIST_TRACKS_FETCH
});

export const succeedPlaylistTracksFetch = (track) => ({
  type: SUCCEED_PLAYLIST_TRACKS_FETCH,
  data: track
});

export const failPlaylistTracksFetch = (err) => ({
  type: FAIL_PLAYLIST_TRACKS_FETCH,
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
        data: {
          ...state.data,
          playlist: action.data
        },
        pending: false
      };
    case FAIL_PLAYLISTS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case PENDING_PLAYLIST_TRACKS_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_PLAYLIST_TRACKS_FETCH:
      return {
        ...state,
        data: {
          ...state.data,
          tracks: action.data
        },
        pending: false
      };
    case FAIL_PLAYLIST_TRACKS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        data: {
          ...state.data,
          currentPlaylist : action.data
        },
      };
    default:
      return state;
  }
}