import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useAlert } from 'react-alert';
import dayjs from 'dayjs';
import generalDataFetch from '../../utilities/generalDataFetch';
import { getChallengeAsync, getChallenge, setChallengeError } from '../../redux/challenge/challenge.action';
import 'react-datepicker/dist/react-datepicker.css';
import './ChallengeForm.css';

function EditChallenge() {
  const challenge = useSelector((state) => state.challenge.challenge);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date(challenge.startDate));
  const [endDate, setEndDate] = useState(new Date(challenge.endDate));
  const [challengeName, setChallengeName] = useState(challenge.title);
  const [challengeDescription, setChallengeDescription] = useState(
    challenge.description,
  );
  const [minCommit, setMinCommit] = useState(challenge.minCommit);
  const [isUpdating, setIsUpdating] = useState(false);

  const startDatePickerOnChange = (date) => {
    setStartDate(date);
  };
  const endDatePickerOnChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    dispatch(getChallengeAsync());
  }, [dispatch]);

  const alert = useAlert();
  const history = useHistory();

  const submitChallenge = async () => {
    const method = 'PUT';
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
      if (startDate > endDate) {
        alert.error(
          <div style={{ color: 'white' }}>Please set valid dates!</div>,
        );
        throw Error('Not valid dates');
      }

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

      const results = await generalDataFetch(endpoint, method, data);
      dispatch(getChallenge(results.jsonData));
      history.push('/challenge');
    } catch (error) {
      dispatch(setChallengeError(error.message));
    }
  };

  return (
    <div className="create-challenge-container">
      <h1 className="create-challenge-title">
        <span>Challenge</span>
        {' '}
        Editor Page
      </h1>
      <form className="create-challenge-form">

        <div>
          <label htmlFor="challenge-title" className="form-label">
            <span>Challenge</span>
            {' '}
            Title
          </label>
          <input
            type="text"
            className="edit-form-input"
            id="challenge-title"
            placeholder={challenge.title}
            onChange={(event) => setChallengeName(event.target.value)}
            disabled={!isUpdating}
            value={challengeName}
          />
        </div>

        <div>
          <label htmlFor="challenge-commitments" className="form-label">
            Min. Commitments
          </label>
          <input
            type="number"
            className="edit-form-input"
            id="challenge-commitments"
            placeholder={challenge.minCommit}
            onChange={(event) => setMinCommit(event.target.value)}
            disabled={!isUpdating}
            value={minCommit}
          />
        </div>

        <div>
          <label htmlFor="challenge-description" className="form-label">
            <span>Challenge</span>
            {' '}
            Decription
          </label>
          <textarea
            disabled={!isUpdating}
            type="text"
            className="edit-form-input description"
            id="challenge-description"
            placeholder={challenge.challengeDescription}
            onChange={(event) => setChallengeDescription(event.target.value)}
            value={challengeDescription}
          />
        </div>

        <div className="challenge-date">
          <label htmlFor="challenge-date-picker" className="form-label">
            <span>Challenge</span>
            {' '}
            Interval
          </label>
          <div className="date-pickers" id="challenge-date-pickers">
            <DatePicker
              className="start-date simple-date-picker"
              minDate={new Date()}
              selected={startDate}
              onChange={startDatePickerOnChange}
              disabled={!isUpdating}
            />
            <DatePicker
              className="end-date simple-date-picker"
              minDate={new Date()}
              selected={endDate}
              onChange={endDatePickerOnChange}
              disabled={!isUpdating}
            />
          </div>
        </div>

        <div className="create-challenge-submit">
          {!isUpdating ? (
            <button
              type="button"
              className="submit-challenge"
              onClick={() => setIsUpdating(true)}
            >
              Update Challenge
            </button>
          ) : (
            <div className="updating-buttons">
              <button
                type="button"
                className="cancel-update"
                onClick={() => {
                  setIsUpdating(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="submit-challenge"
                onClick={submitChallenge}
              >
                Update Challenge
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditChallenge;
