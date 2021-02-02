import React from 'react';
import SessionForm from '../components/SessionForm/SessionForm';
import '../styles/Session.css';

function Register() {
  return (
    <div className="form-container">
      <h1>
        i
        {' '}
        <span>CHALLENGE</span>
        {' '}
        you!
      </h1>
      <SessionForm formType="register" />
    </div>
  );
}

export default Register;
