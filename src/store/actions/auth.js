import { uiStartLoading, uiStoptLoading } from './ui';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

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
      if (parsedRes.error) {
        alert('Authentication failed, please try again!');
      } else {
        startMainTabs();
      }
    });
};

export const unused = () => {}; // TODO: remove this export
