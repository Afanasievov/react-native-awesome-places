import { AsyncStorage } from 'react-native';

import App from '../../../App';
import { uiStartLoading, uiStoptLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import triggerNotification from '../../utility/triggerNotification';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { HEADING_ERROR, AUTHENTICATION_FAILED } from '../../constants/messages';
import { NOTIFICATION_TYPE_ERROR } from '../../constants/values';

export const authSetToken = (token, expiryDate) => ({
  type: AUTH_SET_TOKEN,
  token,
  expiryDate,
});

const authStoreToken = (token, expiresIn, refreshToken) => (dispatch) => {
  const expiryDate = Date.now() + expiresIn * 1000;
  dispatch(authSetToken(token, expiryDate));
  AsyncStorage.setItem('ap:auth:token', token);
  AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
  AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
};

const API_KEY = 'AIzaSyCkl7rV-ytzH025wy8vPiYZuJzmhhMcrjU';

export const tryAuth = (authData, authMode) => (dispatch) => {
  dispatch(uiStartLoading());
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;

  if (authMode === 'login') {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
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
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((parsedRes) => {
      dispatch(uiStoptLoading());
      if (!parsedRes.idToken) {
        return Promise.reject(new Error(AUTHENTICATION_FAILED));
      }
      dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
      return startMainTabs();
    })
    .catch((err) => {
      dispatch(uiStoptLoading());
      return triggerNotification({
        type: NOTIFICATION_TYPE_ERROR,
        heading: HEADING_ERROR,
        message: err.message || err.statusText,
      });
    });
};

export const authClearStorage = () => () => {
  AsyncStorage.removeItem('ap:auth:token');
  AsyncStorage.removeItem('ap:auth:expiryDate');
  return AsyncStorage.removeItem('ap:auth:refreshToken');
};

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const { token, expiryDateStorage } = { ...getState().auth };
    if (!token || new Date(expiryDateStorage) <= new Date()) {
      let fetchToken;

      AsyncStorage.getItem('ap:auth:token')
        .catch((err) => reject(err))
        .then((tokenFromStorage) => {
          if (!tokenFromStorage) {
            return reject();
          }
          fetchToken = tokenFromStorage;
          return AsyncStorage.getItem('ap:auth:expiryDate');
        })
        .then((expiryDate) => {
          const parsedExpiryDate = new Date(parseInt(expiryDate, 10));
          const now = new Date();
          if (parsedExpiryDate > now) {
            dispatch(authSetToken(fetchToken));
            return resolve(fetchToken);
          }
          return reject();
        })
        .catch((err) => reject(err));
    } else {
      resolve(token);
    }
  });

  // prettier-ignore
  return promise.catch(() =>
    AsyncStorage.getItem('ap:auth:refreshToken')
      .then((refreshToken) =>
        fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        }))
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((parsedRes) => {
        if (parsedRes.id_token) {
          dispatch(authStoreToken(
            parsedRes.id_token,
            parsedRes.expires_in,
            parsedRes.refresh_token,
          ));
          return parsedRes.id_token;
        }

        return dispatch(authClearStorage());
      }))
    .then((token) => {
      if (!token) {
        throw (new Error());
      }

      return token;
    });
};

export const authAutoSignIn = () => (dispatch) => {
  dispatch(authGetToken())
    .then(() => {
      startMainTabs();
    })
    .catch((err) => console.log(`Error. AutoSignIn ${err}`));
};

export const authRemoveToken = () => ({
  type: AUTH_REMOVE_TOKEN,
});

export const authLogout = () => (dispatch) => {
  dispatch(authClearStorage()).then(() => App());
  dispatch(authRemoveToken());
};
