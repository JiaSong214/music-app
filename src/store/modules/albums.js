//define action type
const PENDING_ALBUMS_FETCH = 'albums/PENDING_ALBUMS_FETCH';
const SUCCEED_ALBUMS_FETCH = 'albums/SUCCEED_ALBUMS_FETCH';
const FAIL_ALBUMS_FETCH = 'albums/FAIL_ALBUMS_FETCH';

const PENDING_ALBUM_TRACKS_FETCH = 'albums/PENDING_ALBUM_TRACKS_FETCH';
const SUCCEED_ALBUM_TRACKS_FETCH = 'albums/SUCCEED_ALBUM_TRACKS_FETCH';
const FAIL_ALBUM_TRACKS_FETCH = 'albums/FAIL_ALBUM_TRACKS_FETCH';

const SET_CURRENT_ALBUM = 'albums/SET_CURRENT_ALBUM';

//make action generate function
export const pendingAlbumsFetch = () => ({
  type: PENDING_ALBUMS_FETCH
});

export const succeedAlbumsFetch = (albums) => ({
  type: SUCCEED_ALBUMS_FETCH,
  data: albums
});

export const failAlbumsFetch = (err) => ({
  type: FAIL_ALBUMS_FETCH,
  error: err
});

export const setCurrentAlbum = (album) => ({
  type: SET_CURRENT_ALBUM,
  data: album
})

export const pendingAlbumTracksFetch = () => ({
  type: PENDING_ALBUM_TRACKS_FETCH
});

export const succeedAlbumTracksFetch = (songs) => ({
  type: SUCCEED_ALBUM_TRACKS_FETCH,
  data: songs
});

export const failAlbumTracksFetch = (err) => ({
  type: FAIL_ALBUM_TRACKS_FETCH,
  error: err
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
    case PENDING_ALBUMS_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_ALBUMS_FETCH:
      return {
        ...state,
        data: {
          ...state.data,
          albums: action.data
        },
        pending: false
      };
    case FAIL_ALBUMS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case PENDING_ALBUM_TRACKS_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_ALBUM_TRACKS_FETCH:
      return {
        ...state,
        data: {
          ...state.data,
          tracks: action.data
        },
        pending: false
      };
    case FAIL_ALBUM_TRACKS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case SET_CURRENT_ALBUM:
      return {
        ...state,
        data: {
          ...state.data,
          currentAlbum : action.data
        }
      };
    default:
      return state;
  }
}