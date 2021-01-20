import CommitmentActionTypes from './commitments.types';
import generalDataFetch from '../../utilities/generalDataFetch';

export const getCommitments = (commitments) => ({
  type: CommitmentActionTypes.GET_COMMITMENTS,
  payload: commitments
});

export const updateCommitment = (commitment) => ({
  type: CommitmentActionTypes.UPDATE_COMMITMENT,
  payload: commitment,
});

export const updateCommitmentAsync = (commitment) => {
  return async (dispatch) => {
    console.log(commitment);
    const endpoint = '/commitments';
    const method = 'PUT';
    const results = await generalDataFetch(endpoint, method, commitment);
    if (results.status !== 200) {
      return dispatch(commitmentsError(results.jsonData.message))
    }
    return dispatch(updateCommitment(results.jsonData));
  }
}

export const removeCommitment = (commitmentId) => ({
  type: CommitmentActionTypes.REMOVE_COMMITMENT,
  payload: commitmentId,
});

export const removeCommitmentAsync = (commitmentId) => {
  return async (dispatch) => {
    const endpoint = '/commitments';
    const method = 'DELETE';
    const results = await generalDataFetch(endpoint, method, {id: commitmentId});
    if (results.status !== 200) {
      return dispatch(commitmentsError(results.jsonData.message))
    }
    return dispatch(removeCommitment(commitmentId));
  }
}

export const addCommitment = (commitment) => ({
  type: CommitmentActionTypes.ADD_COMMITMENT,
  payload: commitment,
});

export const addCommitmentAsync = (commitment) => {
  return async (dispatch) => {
    const endpoint = '/commitments';
    const method = 'POST';
    const results = await generalDataFetch(endpoint, method, commitment);
    if (results.status !== 200) {
      return dispatch(commitmentsError(results.jsonData.message))
    }
    return dispatch(addCommitment(results.jsonData));
  }
}

export const commitmentsLoading = () => ({ type: CommitmentActionTypes.COMMITMENTS_LOADING });

export const commitmentsError = (errorMessage) => ({ type: CommitmentActionTypes.COMMITMENTS_ERROR, payload: errorMessage })

export const fetchCommitmentsAsync = () => {
  return async (dispatch) => {
    dispatch(commitmentsLoading());
    const endpoint = '/commitments';
    const method = 'GET';
    const results = await generalDataFetch(endpoint, method);
    if (results.status !== 200) {
      return dispatch(commitmentsError(results.jsonData.message))
    }
    return dispatch(getCommitments(results.jsonData));
  }
}