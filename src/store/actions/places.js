import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes';
import { uiStartLoading, uiStoptLoading, authGetToken } from './index';

export const startAddPlace = () => ({
  type: START_ADD_PLACE,
});

export const placeAded = () => ({
  type: PLACE_ADDED,
});

export const addPlace = (placeName, location, image) => (dispatch) => {
  let authToken;

  dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found!');
    })
    .then((token) => {
      authToken = token;
      dispatch(uiStartLoading());
      return fetch('https://us-central1-awesome-places-a0a92.cloudfunctions.net/storeImage', {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64,
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    })
    .catch((err) => {
      console.log(`Erro r: ${err}`);
      alert('Something went wrong, please try again!');
      dispatch(uiStoptLoading());
    })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then((parsedRes) => {
      const placeData = {
        name: placeName,
        image: parsedRes.imageUrl,
        imagePath: parsedRes.imagePath,
        location,
      };

      return fetch(`https://awesome-places-a0a92.firebaseio.com/places.json?auth=${authToken}`, {
        method: 'POST',
        body: JSON.stringify(placeData),
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert('Something went wrong, please try again!');
      dispatch(uiStoptLoading());
    })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then((parsedRes) => {
      console.log('parsedRes: ', parsedRes);
      dispatch(uiStoptLoading());
      dispatch(placeAded());
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
  dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found!');
    })
    .then((token) => fetch(`https://awesome-places-a0a92.firebaseio.com/places.json?auth=${token}`))
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then((parsedRes) => {
      if (parsedRes) {
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
      }
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
  dispatch(authGetToken())
    .catch(() => {
      alert('No valid token found!');
    })
    .then((token) => {
      dispatch(removePlace(key));
      return fetch(`https://awesome-places-a0a92.firebaseio.com/places/${key}.json?auth=${token}`, {
        method: 'DELETE',
      });
    })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .then((parsedRes) => {
      console.log('parsedRes: ', parsedRes);
      console.log('Done!');
    })
    .catch((err) => {
      alert('Something went wrong, sorry :/');
      console.log(`Error: ${err}`);
    });
};
