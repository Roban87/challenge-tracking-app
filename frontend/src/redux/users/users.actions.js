import UsersActionTypes from './users.types';
import generalDataFetch from '../../utilities/generalDataFetch';

export const getUsers = (users) => ({
  type: UsersActionTypes.GET_USERS_SUCCESS,
  payload: users,
});

export const getUsersLoad = () => ({
  type: UsersActionTypes.GET_USERS_LOAD,
});

export const getUsersError = (errorMessage) => ({
  type: UsersActionTypes.GET_USERS_ERROR,
  payload: errorMessage,
});

export const getUsersAsync = () => (
  async (dispatch) => {
    dispatch(getUsersLoad());
    const method = 'GET';
    const endpoint = '/users';
    try {
      const usersData = await generalDataFetch(endpoint, method);
      dispatch(getUsers(usersData.jsonData));
    } catch (error) {
      dispatch(getUsersError(error.message));
    }
  }
);
