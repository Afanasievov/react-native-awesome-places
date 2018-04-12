import { DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => () => {
  fetch('https://us-central1-awesome-places-a0a92.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: image.base64,
    }),
  })
    .catch((err) => console.log(`Error: ${err}`))
    .then((res) => res.json())
    .then((parsedRes) => {
      const placeData = {
        name: placeName,
        image: parsedRes.imageUrl,
        location,
      };
      return fetch('https://awesome-places-a0a92.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify(placeData),
      });
    })
    .catch((err) => console.log(`Error: ${err}`))
    .then((res) => res.json())
    .then((parsedRes) => {
      console.log('parsedRes: ', parsedRes);
    });
};

export const deletePlace = (key) => ({
  type: DELETE_PLACE,
  placeKey: key,
});
