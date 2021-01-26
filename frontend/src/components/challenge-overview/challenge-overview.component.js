import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { getMonthAndDayString, createDateArray } from '../../utilities/date.utils';
import CommitmentGroup from '../commitment-group/commitment-group.component';
import AddCommitment from '../add-commitment/add-commitment.component';

import { toggleCreateCommitmentForm } from '../../redux/commitment-form/commitment-form.actions';
import './challenge-overview.styles.css';

export default function ChallengeOverview() {
  const dispatch = useDispatch();
  const [targetGroup, setTargetGroup] = useState('');
  const createFormOpenStatus = useSelector((state) => state.commitmentForm.createCommitmentForm);
  const { challenge } = useSelector((state) => state.challenge);
  const { userId } = useSelector((state) => state.user);
  const userCommitments = useSelector((state) => {
    const filteredCommitments = state.commitments.commitments.filter((commitment) => (
      commitment.userId === userId));
    return filteredCommitments;
  });
  const numOfDays = moment(challenge.endDate).diff(challenge.startDate, 'days');
  const commitmentGroups = userCommitments.reduce((acc, commitment) => {
    if (!acc.includes(commitment.name)) {
      acc.push(commitment.name);
    }
    return acc;
  }, []);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const dateArray = createDateArray(challenge.startDate, numOfDays);

  const handleClick = (e) => {
    setTargetGroup(e.target.getAttribute('name'));
    dispatch(toggleCreateCommitmentForm());
  };

  return (
    <div className="challenge-overview">
      {
        createFormOpenStatus ? (
          <AddCommitment
            targetGroup={targetGroup}
            startDate={challenge.startDate}
            endDate={challenge.endDate}
            commitments={userCommitments}
          />
        ) : null
      }
      <div style={containerStyle} className="challenge-days">
        <div className="table-header">
          <button
            className="toggle-create-form-button"
            type="button"
            onClick={() => {
              setTargetGroup('');
              dispatch(toggleCreateCommitmentForm());
            }}
          >
            {' '}
            &#43; Commitment
          </button>
          <h4 className="table-date-head">Date</h4>
        </div>
        {
          dateArray.map((date, index) => (
            <div key={`day-${index}`} className="table-date">
              { getMonthAndDayString(date) }
            </div>
          ))
        }
      </div>
      <div className="commitments-container">

        {
        commitmentGroups.map((group) => {
          const commitments = userCommitments.filter((commitment) => commitment.name === group);
          return (
            <CommitmentGroup
              handleClick={handleClick}
              name={group}
              challengeStartDate={challenge.startDate}
              challengeEndDate={challenge.endDate}
              challengeNumOfDays={numOfDays}
              commitments={commitments}
            />
          );
        })
      }
      </div>
    </div>
  );
}
