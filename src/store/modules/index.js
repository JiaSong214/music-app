import { combineReducers } from 'redux';
import token from './token';
import user from './user';
import mainView from './mainView';
import albums from './albums';
import songs from './songs';
import playlists from './playlists';
import browse from './browse';

export default combineReducers({
  token,
  user,
  mainView,
  albums,
  songs,
  playlists,
  browse
});