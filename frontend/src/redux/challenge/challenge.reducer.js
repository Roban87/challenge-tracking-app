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
        error: '',
      };
    case challengeActionTypes.CHALLENGE_LOAD_SUCCESS:
      return {
        ...state,
        challengeLoad: false,
        challenge: action.payload,
        error: '',
      };
    case challengeActionTypes.CHALLENGE_LOAD_FAILED:
      return {
        ...state,
        challengeLoad: false,
        error: action.payload,
        challenge: {},
      };
    default:
      return state;
  }
};

export default challengeReducer;
