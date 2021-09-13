const SET_ACCESS_TOKEN = 'token/SET_TOKEN';

export const setAccessToken = (access_token) => ({
  type: SET_ACCESS_TOKEN,
  access_token: access_token
});


const initialState = {
  access_token: '',
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case SET_ACCESS_TOKEN:
      return {
        access_token: action.access_token
      };
    default:
      return state;
  }
}