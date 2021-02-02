import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { getMonthAndDayString, createDateArray } from '../../utilities/date.utils';
import CommitmentGroup from '../commitment-group/commitment-group.component';
import AddCommitment from '../add-commitment/add-commitment.component';
import { toggleCreateCommitmentForm } from '../../redux/commitment-form/commitment-form.actions';
import './ChallengeOverview.css';

export default function ChallengeOverview() {
  const dispatch = useDispatch();
  const [targetGroup, setTargetGroup] = useState('');
  const createFormOpenStatus = useSelector((state) => state.commitmentForm.createCommitmentForm);
  const { challenge } = useSelector((state) => state.challenge);
  const { userId } = useSelector((state) => state.user);
  const allCommitments = useSelector((state) => state.commitments.commitments);
  const userCommitments = allCommitments.filter((commitment) => (
    commitment.userId === userId));
  const numOfDays = dayjs(challenge.endDate).diff(challenge.startDate, 'd');
  const commitmentGroups = userCommitments.reduce((acc, commitment) => {
    if (!acc.includes(commitment.name)) {
      acc.push(commitment.name);
    }
    return acc;
  }, []);

  const dateArray = createDateArray(challenge.startDate, numOfDays);

  return (
    <section className="challenge-overview">
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
      <div className="challenge-days">
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
          <h1>Date</h1>
        </div>
        {
          dateArray.map((date, index) => (
            <div key={`day-${index}`} className="table-date">
              <p>{ getMonthAndDayString(date) }</p>
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
                key={group}
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
    </section>
  );
}
