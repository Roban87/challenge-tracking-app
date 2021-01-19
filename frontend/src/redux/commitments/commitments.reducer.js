import CommitmentActionTypes from './commitments.types';

const INITIAL_STATE = {
  commitments: [{name: 'test and test'},{name: 'test2'},{name: 'test3'},{name: 'test4'}],
  error: '',
  isLoading: false,
};

const commitmentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommitmentActionTypes.GET_COMMITMENTS:
      return {
        ...state,
        commitments: action.payload,
        isLoading: false,
        error: ''
      }
    case CommitmentActionTypes.COMMITMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case CommitmentActionTypes.COMMITMENTS_ERROR:
      return {
        ...state,
        isLoadin: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default commitmentsReducer;