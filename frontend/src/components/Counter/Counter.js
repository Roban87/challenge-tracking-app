import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import TimeMachine from '../time-machine/time-machine.component';
import './Counter.css';

function Counter() {
  const challenge = useSelector((state) => state.challenge.challenge);
  const [until, setUntil] = useState();

  const challengeStartTimestamp = moment(challenge.startDate);
  const challengeEndTimestamp = moment(challenge.endDate);
  const currentTimestamp = moment(new Date());

  const convertTime = (timestamp) => {
    const seconds = moment.duration(timestamp).seconds();
    const minutes = moment.duration(timestamp).minutes();
    const hours = moment.duration(timestamp).hours();
    const days = moment.duration(timestamp).days();

    const formatedTime = `${days.toString()} day(s) ${
      hours.toString().padStart(2, '0')} h ${
      minutes.toString().padStart(2, '0')} m ${
      seconds.toString().padStart(2, '0')} s`;

    return formatedTime;
  };

  useEffect(() => {
    const getUntilTime = setInterval(() => {
      if (currentTimestamp < challengeStartTimestamp) {
        const untilTimestamp = challengeStartTimestamp - currentTimestamp;
        const time = convertTime(untilTimestamp);
        setUntil(time);
      }
      if (currentTimestamp < challengeEndTimestamp) {
        const untilTimestamp = challengeEndTimestamp - currentTimestamp;
        const time = convertTime(untilTimestamp);
        setUntil(time);
      }
    }, 1000);

    return () => clearInterval(getUntilTime);
  }, [currentTimestamp, challengeStartTimestamp, challengeEndTimestamp]);

  return (
    <div className="counter-container">
      <TimeMachine />
      {currentTimestamp < challengeStartTimestamp
        ? (
          <h1>
            <span>{until}</span>
            {' '}
            &apos;till
            {' '}
            <span>CHALLENGE</span>
            {' '}
            starts
          </h1>
        )
        : (currentTimestamp < challengeEndTimestamp
          ? (
            <h1>
              <span>{until}</span>
              {' '}
              &apos;till
              {' '}
              <span>CHALLENGE</span>
              {' '}
              ends
            </h1>
          )
          : (
            <h1>
              There is no
              <span>CHALLENGE</span>
              {' '}
              right now!
            </h1>
          )
        )}
    </div>
  );
}

export default Counter;
