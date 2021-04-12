//define action type
const SET_TOKEN = 'token/SET_TOKEN';

//make action generate function
export const setToken = (access_token) => ({
  type: SET_TOKEN,
  token: access_token
});

//initial state of module
const initialState = {
  token: ''
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  switch(action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}