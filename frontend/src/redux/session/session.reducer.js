import SessionActionTypes from './session.types';

const INTITAL_STATE = {
  sessionLoading: false,
  token: '',
  sessionError: '',
};

const sessionReducer = (state = INTITAL_STATE, action) => {
  switch (action.type) {
    case SessionActionTypes.SESSION_LOADING:
      return {
        ...state,
        sessionLoading: true,
      };
    case SessionActionTypes.SESSION_SUCCESS:
      return {
        ...state,
        token: action.payload,
        sessionLoading: false,
      };
    case SessionActionTypes.SESSION_FAILED:
      return {
        ...state,
        sessionError: action.message,
        sessionLoading: false,
      };
    default:
      return state;
  }
};

export default sessionReducer;
