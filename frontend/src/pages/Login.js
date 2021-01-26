import React from 'react';
import '../styles/Login.css';
import {
  transitions,
  types,
  positions,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import SessionForm from '../components/SessionForm/SessionForm';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  type: types.ERROR,
  transition: transitions.SCALE,
};

function Login() {
  return (
    <div>
      <h1 className="head-text">
        See your
        {' '}
        <span>CHALLENGE</span>
      </h1>
      <div className="form-container login-form">
        <AlertProvider template={AlertTemplate} {...options}>
          <SessionForm formType="login" />
        </AlertProvider>
      </div>
    </div>
  );
}

export default Login;
