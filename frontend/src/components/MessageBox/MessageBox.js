import React from 'react';
import PropTypes from 'prop-types';
import './MessageBox.css';

function MessageBox({ message, sender, time }) {
  return (
    <div className="message-box">
      <h1 className="message-text">{message}</h1>
      <div className="message-info">
        <p>{sender}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default MessageBox;
