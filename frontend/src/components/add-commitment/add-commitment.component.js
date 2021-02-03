import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { addCommitmentAsync } from '../../redux/commitments/commitments.actions';
import { toggleCreateCommitmentForm } from '../../redux/commitment-form/commitment-form.actions';
import './AddCommitment.css';

function AddCommitment(props) {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state) => state.currentDate);
  const {
    startDate, endDate, commitments, targetGroup,
  } = props;
  const minStartDate = dayjs(startDate).diff(dayjs(currentDate).format('YYYY-MM-DD'), 'd') > 0 ? startDate : currentDate;
  const [commitmentName, setCommitmentName] = useState(targetGroup);
  const [commitmentLength, setCommitmentLength] = useState(1);
  const [commitmentStartDate, setCommitmentStartDate] = useState(minStartDate);
  const [commitmentRepeat, setCommitmentRepeat] = useState('single');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'commitment-name') {
      setCommitmentName(value);
    }
    if (name === 'start-date') {
      setCommitmentStartDate(dayjs(value).format('YYYY-MM-DD'));
    }
    if (name === 'commitment-length') {
      setCommitmentLength(Number(value));
    }
    if (name === 'commitment-repeat') {
      setCommitmentRepeat(value);
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

    const commitmentsByName = commitments.filter((commitment) => (
      commitment.name === commitmentName));

    if (commitmentsByName.length !== 0) {
      setErrorMessage('Commitment group already exists');
      return;
    }
    if (commitmentRepeat === 'single') {
      dispatch(addCommitmentAsync({
        name: commitmentName,
        startDate: commitmentStartDate,
        endDate: dayjs(commitmentStartDate).add(commitmentLength, 'd').format('YYYY-MM-DD'),
      }));
      dispatch(toggleCreateCommitmentForm());
      setErrorMessage('');
    }
    if (commitmentRepeat === 'repeat') {
      const commitmentsArray = [];
      let counter = 0;

      while (dayjs(commitmentStartDate).add(counter + commitmentLength, 'd').diff(endDate, 'd') <= 0) {
        commitmentsArray.push({
          name: commitmentName,
          startDate: dayjs(commitmentStartDate).add(counter, 'd').format('YYYY-MM-DD'),
          endDate: dayjs(commitmentStartDate).add(counter + commitmentLength, 'd').format('YYYY-MM-DD'),
        });
        counter += commitmentLength;
      }
      dispatch(addCommitmentAsync(commitmentsArray));
      dispatch(toggleCreateCommitmentForm());
      setErrorMessage('');
    }
  };

  const exitForm = () => {
    dispatch(toggleCreateCommitmentForm());
  };

  return (
    <div className="create-commitment-container">
      <i role="button" tabIndex="0" className="fas fa-times exit-form" onClick={exitForm} />
      <h2>Add new commitment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commitment-name">Commitment name</label>
        <input
          type="text"
          value={commitmentName}
          name="commitment-name"
          id="commitment-name"
          onChange={handleChange}
        />
        <label htmlFor="start-date">Start Date</label>
        <input
          name="start-date"
          id="start-date"
          type="date"
          onChange={handleChange}
          value={commitmentStartDate && commitmentStartDate}
          max={`${dayjs(endDate).format('YYYY-MM-DD')}`}
          min={`${dayjs(minStartDate).format('YYYY-MM-DD')}`}
        />
        <label htmlFor="commitment-length">Commitment length (days)</label>
        <input
          name="commitment-length"
          id="commitment-length"
          type="number"
          onChange={handleChange}
          value={commitmentLength}
          min={1}
          max={7}
        />
        <p>Commitment repeat</p>
        <div className="commitment-repeat-box">
          <div className="radio-group">
            <label htmlFor="single-commitment-radio">Single</label>
            <input type="radio" id="single-commitment-radio" onChange={handleChange} checked name="commitment-repeat" value="single" />
          </div>
          <div className="radio-group">
            <label htmlFor="repeat-commitment-radio">Repeat</label>
            <input type="radio" id="repeat-commitment-radio" onChange={handleChange} name="commitment-repeat" value="repeat" />
          </div>
        </div>
        <p className="error-message">{errorMessage || null}</p>
        <button className="create-commitment-button" type="submit">Add commitment</button>
      </form>
    </div>
  );
}

AddCommitment.defaultProps = {
  commitments: [],
  targetGroup: '',
};

AddCommitment.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  commitments: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      id: PropTypes.number,
      userId: PropTypes.number,
      name: PropTypes.string,
      challengeId: PropTypes.number,
      isDone: PropTypes.bool,
    }),
  ),
  targetGroup: PropTypes.string,
};

export default AddCommitment;
