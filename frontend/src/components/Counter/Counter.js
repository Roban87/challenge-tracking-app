import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import TimeMachine from '../time-machine/time-machine.component';
import './Counter.css';

function Counter() {
  const challenge = useSelector((state) => state.challenge.challenge);
  const [ until, setUntil ] = useState();

  const challengeStartTimestamp = moment(challenge.startDate);
  const challengeEndTimestamp = moment(challenge.endDate);
  const currentTimestamp = moment(new Date());

  const convertTime = (timestamp) => {
    let seconds = moment.duration(timestamp).seconds();
    let minutes = moment.duration(timestamp).minutes();
    let hours = moment.duration(timestamp).hours();
    let days = moment.duration(timestamp).days();

    let formatedTime = 
      days.toString() + ' day(s) ' + 
      hours.toString().padStart(2, '0') + ' h ' + 
      minutes.toString().padStart(2, '0') + ' m ' + 
      seconds.toString().padStart(2, '0') + ' s';

    return formatedTime;
  }

  useEffect(() => {
      const getUntilTime = setInterval(() => {
        if (currentTimestamp < challengeStartTimestamp) {
          let untilTimestamp = challengeStartTimestamp - currentTimestamp;
          let time = convertTime(untilTimestamp)
          setUntil(time);
        }
        if (currentTimestamp < challengeEndTimestamp) {
          let untilTimestamp = challengeEndTimestamp - currentTimestamp;
          let time = convertTime(untilTimestamp)
          setUntil(time);
        }
    }, 1000 );

    return () => clearInterval(getUntilTime);
  }, [currentTimestamp, challengeStartTimestamp, challengeEndTimestamp]);

  return (
    <div className="counter-container">
      <TimeMachine />
      {currentTimestamp < challengeStartTimestamp ?
      <h1><span>{until}</span> 'till <span>CHALLENGE</span> starts</h1> :
      (currentTimestamp < challengeEndTimestamp ? 
      <h1><span>{until}</span> 'till <span>CHALLENGE</span> ends</h1> :
      <h1>There is no <span>CHALLENGE</span> right now!</h1>
      )}
    </div>
  );
}

export default Counter;