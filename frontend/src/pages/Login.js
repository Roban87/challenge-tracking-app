import React from 'react';
import SessionForm from '../components/SessionForm/SessionForm';
import '../styles/Login.css';

function Login() {
  return (
    <div>
      <h1 className="head-text">
        See your
        <span>CHALLENGE</span>
      </h1>
      <div className="form-container login-form">
        <SessionForm formType="login" />
      </div>
    </div>
  );
}

export default Login;
