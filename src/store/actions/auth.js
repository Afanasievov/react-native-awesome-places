import { AsyncStorage } from 'react-native';

import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStoptLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const authSetToken = (token) => ({
  type: AUTH_SET_TOKEN,
  token,
});

const authStoreToken = (token) => (dispatch) => {
  dispatch(authSetToken(token));
  AsyncStorage.setItem('ap:auth:token', token);
};

export const tryAuth = (authData, authMode) => (dispatch) => {
  dispatch(uiStartLoading());
  const apiKey = 'AIzaSyCkl7rV-ytzH025wy8vPiYZuJzmhhMcrjU';
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;

  if (authMode === 'login') {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
  }

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert('Authentication failed, please try again!');
      dispatch(uiStoptLoading());
    })
    .then((res) => res.json())
    .then((parsedRes) => {
      dispatch(uiStoptLoading());
      if (!parsedRes.idToken) {
        alert('Authentication failed, please try again!');
      } else {
        dispatch(authStoreToken(parsedRes.idToken));
        startMainTabs();
      }
    });
};

export const authGetToken = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const { token } = { ...getState().auth };

    if (!token) {
      AsyncStorage.getItem('ap:auth:token')
        .catch((err) => reject(err))
        .then((tokenFromStorage) => {
          dispatch(authSetToken(tokenFromStorage));
          resolve(tokenFromStorage);
        });
    } else {
      resolve(token);
    }
  });
