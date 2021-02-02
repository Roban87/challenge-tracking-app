import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
// import './GetEmail.css';

function GetEmail({ verificationStatus, sendEmail }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage('');
  };
  const resendClick = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Email address is required.');
      return null;
    }

    const emailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailFormat.test(String(email).toLowerCase())) {
      setErrorMessage('E-mail should follow this format: example@mail.com.');
      return null;
    }

    return sendEmail(email);
  };

  return (
    <div>
      <form id="getEmailForm" onSubmit={(e) => { e.preventDefault(); }}>
        <i className="far fa-envelope" />
        <h1>{verificationStatus}</h1>
        <div className="errorMessage">
          {errorMessage}
        </div>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="text"
            id="email"
            onChange={emailChange}
          />
        </label>
        <div className="buttons">
          <Button
            buttonText="RESEND"
            handleClick={resendClick}
            buttonClass={errorMessage ? 'disabledButton' : 'resend'}
          />
        </div>
      </form>
    </div>
  );
}

GetEmail.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  verificationStatus: PropTypes.string.isRequired,
};

export default GetEmail;
