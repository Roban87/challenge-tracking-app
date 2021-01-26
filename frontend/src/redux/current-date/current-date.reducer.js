import CurrentDateActionTypes from './current-date.types';

const INTITAL_STATE = {
  currentDate: new Date(),
};

const currentDateReducer = (state = INTITAL_STATE, action) => {
  switch (action.type) {
    case CurrentDateActionTypes.SET_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
    case CurrentDateActionTypes.RESET_DATE:
      return {
        ...state,
        currentDate: new Date(),
      };
    default:
      return state;
  }
};

export default currentDateReducer;
