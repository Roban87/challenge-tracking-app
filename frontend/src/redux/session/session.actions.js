import SessionActionTypes from './session.types';

export const sessionLoading = () => ({
  type: SessionActionTypes.SESSION_LOADING,
});

export const sessionSuccess = (token) => ({
  type: SessionActionTypes.SESSION_SUCCESS,
  payload: token,
});

export const sessionFailed = (message) => ({
  type: SessionActionTypes.SESSION_FAILED,
  message,
});

export const sessionLogout = () => ({
  type: SessionActionTypes.SESSION_LOGOUT,
});
