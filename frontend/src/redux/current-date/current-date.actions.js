import CurrentDateActionTypes from './current-date.types';

export const setDate = (date) => ({
  type: CurrentDateActionTypes.SET_DATE,
  payload: date,
});

export const resetDate = () => ({
  type: CurrentDateActionTypes.RESET_DATE,
});
