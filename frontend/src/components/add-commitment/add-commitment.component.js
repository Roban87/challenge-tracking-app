import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommitmentAsync} from '../../redux/commitments/commitments.actions';
import { toggleCreateCommitmentForm } from '../../redux/commitment-form/commitment-form.actions';
import { formatDateString, formatDateToString } from '../../utilities/date.utils';
import './add-commitment.styles.css';

export default function AddCommitment(props) {
  const dispatch = useDispatch();
  const { startDate, endDate, commitments, targetGroup } = props;
  const [commitmentName, setCommitmentName] = useState(targetGroup);
  const [commitmentStartDate, setCommitmentStartDate] = useState('')
  const [commitmentEndDate, setCommitmentEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "commitment-name") {
      setCommitmentName(value)
    }
    if (name === "start-date") {
      setCommitmentStartDate(`${value}`)
    }
    if (name === "end-date") {
      setCommitmentEndDate(`${value}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commitmentName) {
      setErrorMessage('Commitment name required')
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

    const commitmentsByName = commitments.filter((commitment) => commitment.name === commitmentName);

    if (commitmentsByName.length !== 0) {
      const startDateCompare = new Date(commitmentStartDate);
      const endDateCompare = new Date(commitmentEndDate);

      for (let i = 0; i < commitmentsByName.length; i++) {
        if (startDateCompare >= new Date(formatDateString(commitmentsByName[i].startDate)) 
          && startDateCompare < new Date(formatDateString(commitmentsByName[i].endDate))) {
            console.log(formatDateString(commitmentsByName[i].endDate))
            setErrorMessage('Existing commitment in selected timeslot')
            return;
        }
        if (endDateCompare > new Date(formatDateString(commitmentsByName[i].startDate)) 
          && endDateCompare <= new Date(formatDateString(commitmentsByName[i].endDate))) {
            setErrorMessage('Existing commitment in selected timeslot')
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
  }

  const exitForm = () => {
    dispatch(toggleCreateCommitmentForm())
  };

  return (
    <div className="create-commitment-container">
      <i class="fas fa-times exit-form" onClick={exitForm}></i>
      <h2>Add new commitment</h2>
      <form className="create-commitment-form" onSubmit={handleSubmit}>
        <label>Commitment name</label>
        <input 
          type="text" 
          value={commitmentName}
          name="commitment-name"
          onChange={handleChange}
          />
        <label>Start Date</label>
        <input 
          name="start-date"
          type="date"
          onChange={handleChange}
          value={commitmentStartDate && commitmentStartDate}
          max={`${formatDateToString(endDate)}`}
          min={`${formatDateToString(startDate)}`} 
        />
        <label>End Date</label>
        <input 
          name="end-date"
          type="date"
          onChange={handleChange}
          value={commitmentEndDate && commitmentEndDate}
          max={`${formatDateToString(endDate)}`}
          min={`${formatDateToString(startDate)}`} 
        />
        {
          errorMessage ? <p>{errorMessage}</p> : null
        }
        <button className="create-commitment-button" type="submit">Add commitment</button>
      </form>
    </div>
  )
}
