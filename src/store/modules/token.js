//define action type
const SET_ACCESS_TOKEN = 'token/SET_TOKEN';
const SET_REFRESH_TOKEN = 'token/SET_REFRESH_TOKEN';

//make action generate function
export const setAccessToken = (access_token) => ({
  type: SET_ACCESS_TOKEN,
  access_token: access_token
});

export const setRefreshToken = (refresh_token) => ({
  type: SET_ACCESS_TOKEN,
  refresh_token: refresh_token
});

//initial state of module
const initialState = {
  access_token: '',
  refresh_token: ''
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  switch(action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.access_token
      };
    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refersh_token: action.refresh_token
      };
    default:
      return state;
  }
}