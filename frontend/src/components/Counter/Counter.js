import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import TimeMachine from '../time-machine/time-machine.component';
import './Counter.css';

function Counter() {
  dayjs.extend(duration);
  const challenge = useSelector((state) => state.challenge.challenge);
  const [until, setUntil] = useState();

  const challengeStartTimestamp = dayjs(challenge.startDate);
  const challengeEndTimestamp = dayjs(challenge.endDate);
  const currentTimestamp = dayjs();

  const convertTime = (timestamp) => {
    const seconds = dayjs.duration(timestamp).seconds();
    const minutes = dayjs.duration(timestamp).minutes();
    const hours = dayjs.duration(timestamp).hours();
    const days = dayjs.duration(timestamp).days();

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
