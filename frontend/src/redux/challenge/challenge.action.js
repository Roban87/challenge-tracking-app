import generalDataFetch from '../../utilities/generalDataFetch';
import challengeActionTypes from './challenge.types';

export const getChallenge = (challengeData) => ({
  type: challengeActionTypes.CHALLENGE_LOAD_SUCCESS,
  payload: challengeData,
});

export const setChallengeError = (errorMessage) => ({
  type: challengeActionTypes.CHALLENGE_LOAD_FAILED,
  payload: errorMessage,
});

export const getChallengeAsync = () => {
  const endpoint = '/challenge';
  const method = 'GET';

  return async (dispatch) => {
    dispatch({ type: challengeActionTypes.CHALLENGE_LOADING });
    try {
      const result = await generalDataFetch(endpoint, method);

      return dispatch(getChallenge(result.jsonData));
    } catch (error) {
      return dispatch(setChallengeError(error.message));
    }
  };
};
