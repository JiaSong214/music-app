//define action type
const PENDING_NEW_RELEASES_FETCH = 'browse/PENDING_NEW_RELEASES_FETCH';
const SUCCEED_NEW_RELEASES_FETCH = 'browse/SUCCEED_NEW_RELEASES_FETCH';
const FAIL_NEW_RELEASES_FETCH = 'browse/FAIL_NEW_RELEASES_FETCH';

const PENDING_CATEGORIES_FETCH = 'browse/PENDING_CATEGORIES_FETCH';
const SUCCEED_CATEGORIES_FETCH = 'browse/SUCCEED_CATEGORIES_FETCH';
const FAIL_CATEGORIES_FETCH = 'browse/FAIL_CATEGORIES_FETCH';

const PENDING_FEATURED_FETCH = 'browse/PENDING_FEATURED_FETCH';
const SUCCEED_FEATURED_FETCH = 'browse/SUCCEED_FEATURED_FETCH';
const FAIL_FEATURED_FETCH = 'browse/FAIL_FEATURED_FETCH';

//make action generate function
export const pendingNewReleasesFetch = () => ({
  type: PENDING_NEW_RELEASES_FETCH
});

export const succeedNewReleasesFetch = (songs) => ({
  type: SUCCEED_NEW_RELEASES_FETCH,
  data: songs
});

export const failNewReleasesFetch = (error) => ({
  type: FAIL_NEW_RELEASES_FETCH,
  error: error
});

export const pendingCategoriesFetch = () => ({
  type: PENDING_CATEGORIES_FETCH
});

export const succeedCategoriesFetch = (songs) => ({
  type: SUCCEED_CATEGORIES_FETCH,
  data: songs
});

export const failCategoriesFetch = (error) => ({
  type: FAIL_CATEGORIES_FETCH,
  error: error
});

export const pendingFeaturedFetch = () => ({
  type: PENDING_FEATURED_FETCH
});

export const succeedFeaturedFetch = (songs) => ({
  type: SUCCEED_FEATURED_FETCH,
  data: songs
});

export const failFeaturedFetch = (error) => ({
  type: FAIL_FEATURED_FETCH,
  error: error
});


//initial state of module
const initialState = {
  pending: false,
  data: {},
  error: null
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  switch(action.type) {
    case PENDING_NEW_RELEASES_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_NEW_RELEASES_FETCH:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case FAIL_NEW_RELEASES_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case PENDING_CATEGORIES_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_CATEGORIES_FETCH:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case FAIL_CATEGORIES_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case PENDING_FEATURED_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_FEATURED_FETCH:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case FAIL_FEATURED_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}