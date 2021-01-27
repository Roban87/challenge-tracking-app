import React from 'react';
import '../styles/Session.css';
import {
  transitions,
  types,
  positions,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import SessionForm from '../components/SessionForm/SessionForm';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  type: types.ERROR,
  transition: transitions.SCALE,
};

function Login() {
  return (
    <div className="form-container">
      <h1>
        See your
        {' '}
        <span>CHALLENGE</span>
      </h1>
      <AlertProvider template={AlertTemplate} {...options}>
        <SessionForm formType="login" />
      </AlertProvider>
    </div>
  );
}

export default Login;
