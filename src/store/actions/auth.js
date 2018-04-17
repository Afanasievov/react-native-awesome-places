export const authSignup = (authData) => () => {
  fetch(
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCkl7rV-ytzH025wy8vPiYZuJzmhhMcrjU',
    {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .catch((err) => {
      console.log(`Error: ${err}`);
      alert('Authentication failed, please try again!');
    })
    .then((res) => res.json())
    .then((parseRes) => {
      console.log('parseRes: ', parseRes);
    });
};

export const tryAuth = (authData) => (dispatch) => {
  dispatch(authSignup(authData));
};
