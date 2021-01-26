import generalDataFetch from '../../utilities/generalFetch';
import challengeActionTypes from './challenge.types';

export const getChallenge = () => {
  const endpoint = '/challenge';
  const method = 'GET';

  return async (dispatch) => {
    dispatch({ type: challengeActionTypes.CHALLENGE_LOADING });
    try {
      const result = await generalDataFetch(endpoint, method);

      return dispatch({
        type: challengeActionTypes.CHALLENGE_LOAD_SUCCESS,
        payload: result.jsonData,
      });
    } catch (error) {
      return dispatch({
        type: challengeActionTypes.CHALLENGE_LOAD_FAILED,
        message: 'Can\'t load challenge. Please refresh the page!',
      });
    }
  };
};
