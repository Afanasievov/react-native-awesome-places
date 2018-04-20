import { AsyncStorage } from 'react-native';

import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStoptLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const authSetToken = (token) => ({
  type: AUTH_SET_TOKEN,
  token,
});

const authStoreToken = (token, expiresIn, refreshToken) => (dispatch) => {
  dispatch(authSetToken(token));
  const expiryDate = Date.now() + 20 * 1000;
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
        dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
        startMainTabs();
      }
    });
};

export const authClearStorage = () => () => {
  AsyncStorage.removeItem('ap:auth.token');
  AsyncStorage.removeItem('ap:auth.expiryDate');
};

export const authGetToken = () => (dispatch, getState) => {
  const promise = new Promise((resolve, reject) => {
    const { token } = { ...getState().auth };
    if (!token) {
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
  return promise.catch((err) => {
    console.log('err: ', err);
    return AsyncStorage.getItem('ap:auth:refreshToken')
      .then((refreshToken) =>
        fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        }))
      .then((res) => res.json())
      .then((parsedRes) => {
        if (parsedRes.id_token) {
          console.log('Refresh token is working!');
          dispatch(authStoreToken(
            parsedRes.id_token,
            parsedRes.expires_in,
            parsedRes.refresh_token,
          ));
          return parsedRes.id_token;
        }

        return dispatch(authClearStorage());
      });
  })
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
