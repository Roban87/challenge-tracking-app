import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { useAlert } from 'react-alert';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import generalDataFetch from '../../utilities/generalFetch';

function CreateChallenge() {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [challengeName, setChallengeName] = useState(null);
  const [challengeDescription, setChallengeDescription] = useState(null);
  const [minCommit, setMinCommit] = useState(null);
  const DatePickerOnChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const alert = useAlert();
  const history = useHistory();

  const submitChallenge = async () => {
    const method = 'POST';
    const endpoint = '/admin/challenge';
    const data = {
      challengeDetails: {
        isAdmin,
        challengeName,
        challengeDescription,
        startDate: dayjs(startDate).format().slice(0, 10),
        endDate: dayjs(endDate).format().slice(0, 10),
        minCommit,
      },
    };
    try {
      if (!challengeName || !challengeDescription || !startDate || !endDate) {
        alert.error(
          <div style={{ color: 'white' }}>
            some data is missing,
            {' '}
            <br />
            {' '}
            Please set all details!
          </div>,
        );
        throw Error('Missing data');
      }

      await generalDataFetch(endpoint, method, data);
      history.push('/challenge');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-challenge-main-container">
      <h1 className="create-challenge-title">
        <span>Challenge</span>
        {' '}
        Creator Page
      </h1>
      <div className="create-challenge-container">
        <div className="challenge-form">
          <div className="title-number">
            <div className="title">
              <label htmlFor="form-input" className="form-label">
                <span>Challenge</span>
                {' '}
                title
              </label>
              <input
                type="text"
                className="form-input title"
                placeholder="My Life-Changing Challenge"
                onChange={(event) => setChallengeName(event.target.value)}
              />
            </div>
            <div className="commit-number">
              <label htmlFor="form-input" className="form-label">
                Min. Commitments
              </label>
              <input
                type="text"
                className="form-input title"
                placeholder="100"
                onChange={(event) => setMinCommit(event.target.value)}
              />
            </div>
          </div>
          <label htmlFor="form-input" className="form-label">
            <span>Challenge</span>
            {' '}
            description
          </label>
          <textarea
            type="text"
            className="form-input description"
            placeholder="In this challenge I will do the following awesome things..."
            onChange={(event) => setChallengeDescription(event.target.value)}
          />
        </div>
        <div className="challenge-date">
          <label htmlFor="date-picker" className="form-label">
            <span>Challenge</span>
            {' '}
            intervall
          </label>
          <DatePicker
            minDate={new Date()}
            selected={startDate}
            onChange={DatePickerOnChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
        <div className="create-challenge-submit">
          <button type="button" className="submit-challenge" onClick={submitChallenge}>
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChallenge;
