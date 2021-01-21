import React from 'react';
import './MessageBox.css';

function MessageBox({message, sender, time}) {
  return (
    <div className="message-box">
      <h3 className="message-text">{message}</h3>
      <div className="message-info">
        <p>{sender}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default MessageBox;