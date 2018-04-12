import { DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location) => () => {
  const placeData = {
    name: placeName,
    location,
  };
  fetch('https://awesome-places-a0a92.firebaseio.com/places.json', {
    method: 'POST',
    body: JSON.stringify(placeData),
  })
    .catch((err) => console.log(`Error: ${err}`))
    .then((res) => res.json())
    .then((parsedResponse) => {
      console.log('parsedResponse: ', parsedResponse);
    });
};

export const deletePlace = (key) => ({
  type: DELETE_PLACE,
  placeKey: key,
});
