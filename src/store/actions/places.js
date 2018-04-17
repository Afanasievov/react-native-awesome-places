import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStoptLoading } from './index';

export const addPlace = (placeName, location, image) => (dispatch) => {
  dispatch(uiStartLoading());
  fetch('https://us-central1-awesome-places-a0a92.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: image.base64,
    }),
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
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert('Something went wrong, please try again!');
      dispatch(uiStoptLoading());
    });
};

export const setPlaces = (places) => ({
  type: SET_PLACES,
  places,
});
export const getPlaces = () => (dispatch) => {
  fetch('https://awesome-places-a0a92.firebaseio.com/places.json')
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
    })
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.log(`Error: ${err}`);
    });
};

export const removePlace = (key) => ({
  type: REMOVE_PLACE,
  key,
});

export const deletePlace = (key) => (dispatch) => {
  dispatch(removePlace(key));
  fetch(`https://awesome-places-a0a92.firebaseio.com/places/${key}.json`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((parsedRes) => {
      console.log('parsedRes: ', parsedRes);
      console.log('Done!');
    })
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.log(`Error: ${err}`);
    });
};
