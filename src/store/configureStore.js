import { createStore, combineReducers, compose } from 'redux';

import placesReducer from './reducers/places';

const rootReducer = combineReducers({
  places: placesReducer,
});

let composeEnhancers = compose;

/* eslint-disable no-undef, no-underscore-dangle */
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
/* eslint-enable no-undef, no-underscore-dangle */

const configureStore = () => createStore(rootReducer, composeEnhancers());

export default configureStore;