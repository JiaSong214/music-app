import { applyMiddleware, createStore } from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const configure = () => {
  const store = createStore(modules, applyMiddleware(...middlewares));
  return store;
}

export default configure;