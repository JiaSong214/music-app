import { applyMiddleware, createStore } from 'redux';
import modules from './modules';
import thunk from 'redux-thunk';

// const middlewares = [thunk];

const configure = () => {
  const store = createStore(modules, applyMiddleware(thunk));
  return store;
}

export default configure;