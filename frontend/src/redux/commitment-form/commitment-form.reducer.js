import CommitmentFormActionTypes from './commitment-form.types';

const INITIAL_STATE = {
  createCommitmentForm: false,
};

const commitmentFormReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CommitmentFormActionTypes.TOGGLE_CREATE_COMMITMENT_FORM:
      return {
        ...state,
        createCommitmentForm: !state.createCommitmentForm,
      }
    default: 
      return state;
  }
};

export default commitmentFormReducer;