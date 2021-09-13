import { combineReducers } from 'redux';
import token from './token';
import user from './user';
import play from './play';

export default combineReducers({
  token,
  user,
  play
});