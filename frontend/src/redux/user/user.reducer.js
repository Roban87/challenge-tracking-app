import userActionTypes from './user.types';

const initialState = {
  userId: null,
  username: '',
  isAdmin: false,
  isValidated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
        isValidated: action.payload.isValidated,
      };
    default:
      return state;
  }
};

export default userReducer;
