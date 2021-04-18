//define action type
const PENDING_ALBUMS_FETCH = 'albums/PENDING_ALBUMS_FETCH';
const SUCCEED_ALBUMS_FETCH = 'albums/SUCCEED_ALBUMS_FETCH';
const FAIL_ALBUMS_FETCH = 'albums/FAIL_ALBUMS_FETCH';

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