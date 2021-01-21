import messageActionTypes from './message.types';

export const setMessage = ( message) => ({
  type: messageActionTypes.SET_MESSAGE,
  payload: message,
}); 