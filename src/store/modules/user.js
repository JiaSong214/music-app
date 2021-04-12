//define action type
const PENDING_USER_FETCH = 'user/PENDING_USER_FETCH';
const SUCCEED_USER_FETCH = 'user/SUCCEED_USER_FETCH';
const FAIL_USER_FETCH = 'user/FAIL_USER_FETCH';

export const pendingUserFetch = () => ({
  type: PENDING_USER_FETCH
});

export const succeedUserFetch = (user) => ({
  type: SUCCEED_USER_FETCH,
  data: user
});

export const failUserFetch = (err) => ({
  type: FAIL_USER_FETCH,
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
  // console.log(action)
  switch(action.type) {
      case PENDING_USER_FETCH:
        return {
          ...state,
          pending: true
        };
      case SUCCEED_USER_FETCH:
        return {
          ...state,
          data: action.data,
          pending: false
        };
      case FAIL_USER_FETCH:
        return {
          ...state,
          pending: false,
          error: action.error
        };
    default:
      return state;
  }
}