import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Landing.css';

function Landing() {
  const challenge = useSelector((state) => state.challenge.challenge);
  const currentTime = useSelector((state) => state.currentDate.currentDate);
  const history = useHistory();

  const challengeStartTimestamp = new Date(challenge.startDate).getTime();
  const challengeEndTimestamp = new Date(challenge.endDate).getTime();
  const currentTimestamp = currentTime;

  const onClickHandler = (path) => {
    history.push(path);
  };

  return (
    <div className="landing-container">

      <button
        type="button"
        className="btn landing-admin-btn"
        onClick={() => onClickHandler('/login')}
      >
        ADMIN LOGIN
      </button>

      <section className="landing-main-content">

        <h1>
          ARE YOU READY FOR A
          {' '}
          <span>CHALLENGE?!</span>
        </h1>

        {
        currentTimestamp < challengeEndTimestamp
          ? (
            <div>
              <div>
                <h2>{challenge.title}</h2>
                <p>{challenge.description}</p>
              </div>

              <div className="landing-user-btns">
                <button
                  type="button"
                  className="btn login-btn"
                  onClick={() => onClickHandler('/login')}
                >
                  LOGIN
                </button>

                {currentTimestamp < challengeStartTimestamp
                  ? (
                    <button
                      type="button"
                      className="btn register-btn"
                      onClick={() => onClickHandler('/register')}
                    >
                      JOIN CHALLENGE
                    </button>
                  )
                  : null }
              </div>
            </div>
          )
          : (
            <h3>
              Sorry! There is no new challenge at the moment.
              Please, come back later!
            </h3>
          )
        }

      </section>

    </div>
  );
}

export default Landing;
