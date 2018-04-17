import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
  places: placesReducer,
  ui: uiReducer,
  auth: authReducer,
});

let composeEnhancers = compose;

/* eslint-disable no-undef, no-underscore-dangle */
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
/* eslint-enable no-undef, no-underscore-dangle */

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
