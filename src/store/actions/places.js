import { SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStoptLoading } from './index';

export const addPlace = (placeName, location, image) => (dispatch) => {
  dispatch(uiStartLoading());
  fetch('https://us-central1-awesome-places-a0a92.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: image.base64,
    }),
  })
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert('Something went wrong, please try again!');
      dispatch(uiStoptLoading());
    })
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
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert('Something went wrong, please try again!');
      dispatch(uiStoptLoading());
    })
    .then((res) => res.json())
    .then((parsedRes) => {
      console.log('parsedRes: ', parsedRes);
      dispatch(uiStoptLoading());
    });
};

export const setPlaces = (places) => ({
  type: SET_PLACES,
  places,
});
export const getPlaces = () => (dispatch) => {
  fetch('https://awesome-places-a0a92.firebaseio.com/places.json')
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.log(`Error: ${err}`);
    })
    .then((res) => res.json())
    .then((parsedRes) => {
      const places = [];
      Object.keys(parsedRes).forEach((key) => {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image,
          },
          key,
        });
      });
      dispatch(setPlaces(places));
    });
};
