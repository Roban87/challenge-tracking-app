import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/Landing.css';

function Landing() {
  const challenge = useSelector((state) => state.challenge.challenge);
  const currentTime = useSelector((state) => state.currentDate.currentDate);

  const challengeStartTimestamp = new Date(challenge.startDate).getTime();
  const challengeEndTimestamp = new Date(challenge.endDate).getTime();
  const currentTimestamp = currentTime;

  return (
    <div className="landing-container">

      <div className="btn landing-admin-btn">
        <a href="/login">ADMIN LOGIN</a>
      </div>

      <div className="landing-main-text">

        <h1>
          ARE YOU READY FOR A
          <br />
          <span>CHALLENGE?!</span>
        </h1>

        {
        currentTimestamp < challengeEndTimestamp
          ? (
            <div>
              <div className="landing-details">
                <h2>{challenge.title}</h2>
                <p>{challenge.description}</p>
              </div>

              <div className="landing-user-btns">
                <div className="btn login-btn">
                  <a href="/login">LOGIN</a>
                </div>

                {currentTimestamp < challengeStartTimestamp
                  ? (
                    <div className="btn register-btn">
                      <a href="/register">JOIN CHALLENGE</a>
                    </div>
                  )
                  : null }
              </div>
            </div>
          )
          : (
            <h3>
              Sorry! There is no new challenge at the moment.
              <br />
              {' '}
              Please, come back later!
            </h3>
          )
}

      </div>

    </div>
  );
}

export default Landing;
