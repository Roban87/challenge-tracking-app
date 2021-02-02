import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import GetEmail from '../components/GetEmail/GetEmail';
import generalDataFetch from '../utilities/generalDataFetch';
import '../styles/VerificationPage.css';

const useStyle = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#00a6a6cc',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    lineHeight: '5',
  },
  circular: {
    justifySelf: 'center',
  },
  text: {
    color: '#efca08ff',
    fontFamily: 'Montserrat',
  },
}));

function VerificationPage() {
  const [showLoading, setShowLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [resendEmail, setResendEmail] = useState(false);
  const [verified, setVerified] = useState(false);

  const classes = useStyle();
  const history = useHistory();
  const tokenData = window.location.pathname.split(':').slice(2);
  const token = tokenData[0];
  localStorage.setItem('verificationToken', token);

  const headers = () => {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    const session = {
      verification: localStorage.getItem('verificationToken'),
    };
    if (session.verification) {
      header.append('Verification', `Bearer ${session.verification}`);
    }
    return header;
  };

  useEffect(() => {
    async function setUserVerified() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/verification`, {
          method: 'PUT',
          headers: headers(),
        });
        const data = await response.json();
        setTimeout(() => {
          if (response.status === 200) {
            setShowLoading(false);
            setVerificationStatus('Email is verified. You will be redirected to Login shortly.');
            setVerified(true);
            setTimeout(() => {
              history.push('/login');
            }, 5000);
          } else if (response.status === 401) {
            setVerificationStatus(data.message);
            setResendEmail(true);
            setShowLoading(false);
          } else if (response.status === 403) {
            setVerificationStatus(data.message);
            setShowLoading(false);
          } else if (response.status === 500) {
            setVerificationStatus('Your verification link may have expired. Please click on resend for verify your Email!');
            setResendEmail(true);
            setShowLoading(false);
          }
        }, 2500);
      } catch (verificationError) {
        setVerificationStatus('Oops! Something went wrong, please try again!');
      }
    }
    setUserVerified();
  }, []);

  const sendNewVerificationEmail = async (email) => {
    try {
      const response = await generalDataFetch(`verification/${email}`, 'GET');
      if (response.status === 200) {
        setVerificationStatus(response.message);
      } else {
        setVerificationStatus(response.message);
      }
    } catch (err) {
      setVerificationStatus('Oops! Something went wrong, please try again later!');
    }
  };

  return (
    <div className="verification-page">
      {showLoading && (
      <Backdrop className={classes.backdrop} open>
        <h1 className={classes.text}>
          Please wait until your account is verified!
        </h1>
        <CircularProgress className={classes.circular} color="inherit" />
      </Backdrop>
      ) }

      {showLoading === false && resendEmail
      && (
      <GetEmail
        verificationStatus={verificationStatus}
        sendEmail={sendNewVerificationEmail}
      />
      )}

      {showLoading === false && verificationStatus && resendEmail === false ? (
        <div className="verification-error">
          {verified === false && <i className="fas fa-exclamation-triangle" />}
          <h1>{verificationStatus}</h1>
        </div>
      ) : ''}

    </div>
  );
}

export default VerificationPage;
