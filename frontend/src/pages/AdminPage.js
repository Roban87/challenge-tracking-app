import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import CreateChallenge from '../components/AdminChallenge/CreateChallenge';
import EditChallenge from '../components/AdminChallenge/EditChallenge';
import { getChallenge } from '../redux/challenge/challenge.action';
import '../styles/AdminPage.css';
import {
  transitions,
  types,
  positions,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

function AdminPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challenge.challenge)
  const isAdmin = useSelector((state) => state.user.isAdmin)

  if(!isAdmin){
    history.push('/challenge');
  }

  useEffect(() => {
    dispatch(getChallenge());
  }, [dispatch]);

  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    type: types.ERROR,
    transition: transitions.SCALE,
  };

  let challengeEndTimestamp = new Date(challenge.endDate).getTime();
  let currentTimestamp = Date.now();
  
  return (
    <div className='admin-main-container'>
      <div className="btn admin-btn" >
        <a href="/challenge" style={{color: 'white'}}>TO CHALLANGE PAGE</a>
      </div>
      <AlertProvider template={AlertTemplate} {...options}>
        {currentTimestamp < challengeEndTimestamp ? <EditChallenge /> : <CreateChallenge />}
      </AlertProvider>
      
    </div>
  );
}

export default AdminPage;
