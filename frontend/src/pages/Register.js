import React from 'react';
import SessionForm from '../components/SessionForm/SessionForm';

function Register() {
  return (
    <div>
      <h1 className="head-text">
        i
        <span>CHALLENGE</span>
        {' '}
        you!
      </h1>
      <div className="form-container register-from">
        <SessionForm formType="register" />
      </div>
    </div>
  );
}

export default Register;
