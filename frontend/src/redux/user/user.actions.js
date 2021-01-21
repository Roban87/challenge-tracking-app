import userActionTypes from './user.types';

export const setUser = (userId, username, isAdmin, isValidated) => ({
  type: userActionTypes.SET_USER,
  payload: { userId, username, isAdmin, isValidated }
});