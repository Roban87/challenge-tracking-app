import UsersActionTypes from './users.types';

const INITIAL_STATE = {
  users: [],
  error: '',
  isLoading: false,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS_LOAD:
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    case UsersActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        error: '',
        users: action.payload,
        isLoading: false,
      };
    case UsersActionTypes.GET_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
