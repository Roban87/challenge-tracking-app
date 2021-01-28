/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import generalDataFetch from '../../utilities/generalDataFetch';
import {
  sessionLoading,
  sessionSuccess,
  sessionFailed,
} from '../../redux/session/session.actions';
import { setUser } from '../../redux/user/user.actions';
import './SessionForm.css';

function SessionForm({ formType }) {
  let alert;
  if (formType === 'login') {
    alert = useAlert();
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const loginError = useSelector((state) => (state.session.sessionError));
  const challenge = useSelector((state) => (state.challenge.challenge));
  const currentTime = useSelector((state) => state.currentDate.currentDate);
  const history = useHistory();
  const dispatch = useDispatch();

  const onUsernameChange = (event) => {
    if (loginError) {
      dispatch(sessionFailed(''));
    }
    setUsername(event.target.value);
  };

  const onPasswordChange = (event) => {
    if (loginError) {
      dispatch(sessionFailed(''));
    }
    setPassword(event.target.value);
  };

  const onEmailChange = (event) => {
    if (loginError) {
      dispatch(sessionFailed(''));
    }
    setEmail(event.target.value);
  };

  function determinePath(isAdmin) {
    const challengeEndTimestamp = new Date(challenge.endDate).getTime();
    if (challengeEndTimestamp < currentTime) {
      if (isAdmin === 1) {
        return '/admin';
      }
      return '/';
    }
    return '/challenge';
  }

  const loginUser = async () => {
    dispatch(sessionLoading());

    const endpoint = '/login';
    const method = 'POST';
    const loginData = {
      username,
      password,
    };

    try {
      const loginResponse = await generalDataFetch(endpoint, method, loginData);

      if (loginResponse.status !== 200) {
        return dispatch(sessionFailed(loginResponse.jsonData.message));
      }

      const {
        token,
        userId,
        username,
        isAdmin,
        isValidated,
      } = loginResponse.jsonData;

      if (isValidated !== 1) {
        alert.error(
          <div style={{ color: 'white' }}>
            Please check your e-mails for user verification!
          </div>,
        );
        throw Error('User is not verified');
      }

      setPassword('');
      setUsername('');
      dispatch(sessionSuccess(token));
      dispatch(setUser(userId, username, isAdmin, isValidated));
      return history.push(determinePath(isAdmin));
    } catch (error) {
      return dispatch(sessionFailed(error.message));
    }
  };

  const registerUser = async () => {
    dispatch(sessionLoading());

    const endpoint = '/register';
    const method = 'POST';
    const registData = {
      username,
      password,
      email,
    };

    try {
      const registerResponse = await generalDataFetch(
        endpoint,
        method,
        registData,
      );
      if (registerResponse.status !== 200) {
        return dispatch(sessionFailed(registerResponse.jsonData.message));
      }

      history.push('/login');
    } catch (error) {
      return dispatch(sessionFailed(error.message));
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'login') {
      if (!username || !password) {
        dispatch(sessionFailed('All the input fields are required'));
        return null;
      }
      loginUser();
    }
    if (formType === 'register') {
      if (!username || !password) {
        dispatch(sessionFailed('All fields are required'));
        return null;
      }
      registerUser();
    }
    return null;
  };

  useEffect(() => {
    dispatch(sessionFailed(''));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="session-form">
        <input
          type="text"
          id="username-input"
          value={username}
          placeholder="Username"
          onChange={onUsernameChange}
        />

        {formType === 'register' ? (
          <input
            type="email"
            id="email-input"
            value={email}
            placeholder="Email"
            onChange={onEmailChange}
          />
        ) : null}

        <input
          type="password"
          id="password-input"
          value={password}
          placeholder="Password"
          onChange={onPasswordChange}
        />
        {/* {formType === 'register' && (
          <PasswordStrengthMeter password={password} />
        )} */}

        <p className="error-message">{loginError && loginError}</p>

        <button type="submit">
          {formType === 'register' ? 'ACCEPTED!' : 'LOG IN'}
        </button>
      </form>
    </div>
  );
}

SessionForm.propTypes = {
  formType: PropTypes.string.isRequired,
};

export default SessionForm;
