import React,
{
  useState,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { setMessage } from '../../redux/message/message.action';
import { Picker } from 'emoji-mart';
import { Smile } from 'react-feather';
import socketIOClient from 'socket.io-client';
import { setMessage } from '../../redux/message/message.action';
import MessageBox from '../MessageBox/MessageBox';
import './MessageBoard.css';
import 'emoji-mart/css/emoji-mart.css'

function MessageBoard() {
  const user = useSelector((state) => state.user.username);
  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socket = socketIOClient(process.env.REACT_APP_SOCKET);
  dayjs.extend(localizedFormat);
  
  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(setMessage(message));
    });

    const messageContainer = document.getElementById('box');
    messageContainer.scrollTop = messageContainer.scrollHeight;

    return () => socket.disconnect();
  }, [socket, dispatch]);

  const sendMessage = (message) => {
    return socket.emit('send-message', { 
      message, 
      senderName: user, 
      id: dayjs().format('LT'), 
    });
  }

  const handleSendMessage = (event, message) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '') {
      sendMessage(trimmedMessage);
    }
  }

  function toggleEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  function addEmoji(emoji) {
    setText(`${text}${emoji.native}`);
  }

  return (
    <div className="message-board">
      <div className="message-container" id="box">
        <div className="messages">
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message.message}
              sender={message.senderName}
              time={message.id}
            />
          ))}
        </div>
      </div>
      
      {showEmojiPicker ? 
      (<Picker 
        onSelect={addEmoji}
        set='facebook'
        sheetSize={64}
        style={{
          width: 'inherit'
        }}
      />) :
      null
      }

      <form className="message-form" onSubmit={(event) => handleSendMessage(event, text)}>
        <textarea 
        type='text'
        className='message-area'
        placeholder='...'
        value={text}
        onChange={(event) => setText(event.target.value)}/>

        <button
            type="button"
            className="toggle-emoji btn"
            onClick={toggleEmojiPicker}
          >
            <Smile />
        </button>

        <input type="submit" class="btn send-btn" value="SEND" />
      </form>
    </div>
  );
}

export default MessageBoard;
