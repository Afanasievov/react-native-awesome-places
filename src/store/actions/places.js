import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location) => ({
  type: ADD_PLACE,
  placeName,
  location,
});

export const deletePlace = key => ({
  type: DELETE_PLACE,
  placeKey: key,
});
