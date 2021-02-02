import React, { useEffect } from 'react';
import {
  transitions,
  types,
  positions,
  Provider as AlertProvider,
} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import CreateChallenge from '../components/AdminChallenge/CreateChallenge';
import EditChallenge from '../components/AdminChallenge/EditChallenge';
import { getChallengeAsync } from '../redux/challenge/challenge.action';
import '../styles/AdminPage.css';

function AdminPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const challenge = useSelector((state) => state.challenge.challenge);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { currentDate } = useSelector((state) => state.currentDate);

  if (!isAdmin) {
    history.push('/challenge');
  }

  useEffect(() => {
    dispatch(getChallengeAsync());
  }, [dispatch]);

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    type: types.ERROR,
    transition: transitions.SCALE,
  };

  return (
    <div className="admin-main-container">
      <div className="btn to-challenge-admin-btn">
        <a href="/challenge">TO CHALLANGE PAGE</a>
      </div>
      <AlertProvider template={AlertTemplate} {...options}>
        {dayjs(challenge.endDate).diff(currentDate, 'd') > 0 ? <EditChallenge /> : <CreateChallenge />}
      </AlertProvider>

    </div>
  );
}

export default AdminPage;
