/* global __DEV_TOOLS__ */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';
import * as reducers from '../reducers';

// Here we have all our application stores
let combinedCreateStore;

const storeEnhancers = [
  reduxReactRouter({ createHistory })
];

if (__DEV_TOOLS__) {
  const DevTools = require('../components/DevTools');
  storeEnhancers.push(DevTools.instrument());
}

combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore);

// Here we have all the application reducers
const combinedReducer = combineReducers(Object.assign({
  router: routerStateReducer
}, reducers));

const configureStore = (initialState) => {
  const store = finalCreateStore(combinedReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
