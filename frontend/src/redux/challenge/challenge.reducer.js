import challengeActionTypes from './challenge.types';

const INITIAL_STATE = {
  challengeLoad: false,
  error: '',
  challenge: {},
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case challengeActionTypes.CHALLENGE_LOADING:
      return {
        ...state,
        challengeLoad: true,
      };
    case challengeActionTypes.CHALLENGE_LOAD_SUCCESS:
      return {
        ...state,
        challengeLoad: false,
        challenge: action.payload,
      };
    case challengeActionTypes.CHALLENGE_LOAD_FAILED:
      return {
        ...state,
        challengeLoad: false,
        error: action.message,
        challenge: {},
      };
    default:
      return state;
  }
};

export default challengeReducer;
