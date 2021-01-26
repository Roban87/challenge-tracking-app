import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { addCommitmentAsync } from '../../redux/commitments/commitments.actions';
import { toggleCreateCommitmentForm } from '../../redux/commitment-form/commitment-form.actions';
import './add-commitment.styles.css';

function AddCommitment(props) {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state) => state.currentDate);
  const {
    startDate, endDate, commitments, targetGroup,
  } = props;
  const [commitmentName, setCommitmentName] = useState(targetGroup);
  const [commitmentStartDate, setCommitmentStartDate] = useState('');
  const [commitmentEndDate, setCommitmentEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const minStartDate = moment(startDate).diff(moment(currentDate).format('YYYY-MM-DD'), 'days') > 0 ? startDate : currentDate;
  const minEndDate = moment(minStartDate).add(1, 'd');

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'commitment-name') {
      setCommitmentName(value);
    }
    if (name === 'start-date') {
      setCommitmentStartDate(moment(value).format('YYYY-MM-DD'));
    }
    if (name === 'end-date') {
      setCommitmentEndDate(moment(value).format('YYYY-MM-DD'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commitmentName) {
      setErrorMessage('Commitment name required');
      return;
    }
    if (!commitmentStartDate) {
      setErrorMessage('Start Date required');
      return;
    }
    if (!commitmentEndDate) {
      setErrorMessage('End Date required');
      return;
    }

    const commitmentsByName = commitments.filter((commitment) => (
      commitment.name === commitmentName));

    if (commitmentsByName.length !== 0) {
      for (let i = 0; i < commitmentsByName.length; i++) {
        if (moment(commitmentStartDate).diff(commitmentsByName[i].startDate, 'days') >= 0
          && moment(commitmentStartDate).diff(commitmentsByName[i].endDate, 'days') < 0) {
          setErrorMessage('Existing commitment in selected timeslot');
          return;
        }
        if (moment(commitmentEndDate).diff(commitmentsByName[i].startDate, 'days') > 0
          && moment(commitmentEndDate).diff(commitmentsByName[i].endDate, 'days') <= 0) {
          setErrorMessage('Existing commitment in selected timeslot');
          return;
        }
      }
    }

    dispatch(addCommitmentAsync({
      name: commitmentName,
      startDate: commitmentStartDate,
      endDate: commitmentEndDate,
    }));
    dispatch(toggleCreateCommitmentForm());
    setErrorMessage('');
  };

  const exitForm = () => {
    dispatch(toggleCreateCommitmentForm());
  };

  return (
    <div className="create-commitment-container">
      <i role="button" tabIndex="0" className="fas fa-times exit-form" onClick={exitForm} />
      <h2>Add new commitment</h2>
      <form className="create-commitment-form" onSubmit={handleSubmit}>
        <label htmlFor="commitment-name">Commitment name</label>
        <input
          type="text"
          value={commitmentName}
          name="commitment-name"
          onChange={handleChange}
        />
        <label htmlFor="start-date">Start Date</label>
        <input
          name="start-date"
          type="date"
          onChange={handleChange}
          value={commitmentStartDate && commitmentStartDate}
          max={`${moment(endDate).format('YYYY-MM-DD')}`}
          min={`${moment(minStartDate).format('YYYY-MM-DD')}`}
        />
        <label htmlFor="end-date">End Date</label>
        <input
          name="end-date"
          type="date"
          onChange={handleChange}
          value={commitmentEndDate && commitmentEndDate}
          max={`${moment(endDate).format('YYYY-MM-DD')}`}
          min={`${moment(minEndDate).format('YYYY-MM-DD')}`}
        />
        {
          errorMessage ? <p>{errorMessage}</p> : null
        }
        <button className="create-commitment-button" type="submit">Add commitment</button>
      </form>
    </div>
  );
}

AddCommitment.defaultProps = {
  commitments: [],
  targetGroup: [],
};

AddCommitment.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  commitments: PropTypes.arrayOf(
    PropTypes.objectOf({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      id: PropTypes.number,
      userId: PropTypes.number,
      name: PropTypes.string,
      challengeId: PropTypes.number,
      isDone: PropTypes.number,
    }),
  ),
  targetGroup: PropTypes.arrayOf(PropTypes.string),
};

export default AddCommitment;
