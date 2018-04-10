import { TRY_AUTH } from './actionTypes';

export const tryAuth = authData => ({
  type: TRY_AUTH,
  authData,
});
