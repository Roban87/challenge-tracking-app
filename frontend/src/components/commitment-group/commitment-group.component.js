import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { createDateArray } from '../../utilities/date.utils';
import Commitment from '../commitment/commitment.component';

import { updateCommitmentAsync, addCommitmentAsync } from '../../redux/commitments/commitments.actions';

import './commitment-group.styles.css';

function CommitmentGroup(props) {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state) => state.currentDate);
  const {
    challengeNumOfDays,
    name,
    challengeStartDate,
    commitments,
    challengeEndDate,
  } = props;
  const numOfDays = dayjs(commitments[0].endDate).diff(commitments[0].startDate, 'd');
  const commitmentsObj = commitments.reduce((acc, commitment) => {
    acc[commitment.startDate] = commitment;
    return acc;
  }, {});
  const dateArray = createDateArray(challengeStartDate, challengeNumOfDays);

  const blockedDatesObj = commitments.reduce((dateObj, commitment) => {
    for (let i = 0; i < numOfDays; i++) {
      const dateCheck = dayjs(commitment.startDate).add(i, 'd').format('YYYY-MM-DD');
      dateObj[dateCheck] = commitment.id;
    }
    return dateObj;
  }, {});
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const isSlotFree = (targetDate, blockedHelper, id) => {
    for (let i = 0; i < numOfDays; i++) {
      const dateCheck = dayjs(targetDate).add(i, 'd').format('YYYY-MM-DD');
      if (blockedHelper[dateCheck] && blockedHelper[dateCheck] !== id) {
        return false;
      }
    }
    return true;
  };

  const isBeforeEndDate = (commitStartDate) => dayjs(challengeEndDate).diff(dayjs(commitStartDate).add(numOfDays, 'd'), 'd') >= 0;
  const isAfterCurrentDate = (commitStartDate) => dayjs(commitStartDate).add(numOfDays, 'd').diff(currentDate, 'd') >= 0;

  function allowDrop(ev) {
    ev.preventDefault();
  }

  const drop = (ev) => {
    console.time();
    ev.preventDefault();
    const commitmentId = Number(ev.dataTransfer.getData('commitmentId'));
    const commitName = ev.dataTransfer.getData('name');
    const containerName = ev.target.getAttribute('container-name');
    const targetStartDate = ev.target.getAttribute('date');
    const targetEndDate = dayjs(targetStartDate).add(numOfDays, 'd').format('YYYY-MM-DD');

    if (commitName === containerName) {
      if (isBeforeEndDate(targetStartDate) && isAfterCurrentDate(targetStartDate) && isSlotFree(
        targetStartDate,
        blockedDatesObj,
        commitmentId,
      )) {
        ev.target.appendChild(document.getElementById(commitmentId));
        const commitment = commitments.find((commit) => commit.id === Number(commitmentId));
        commitment.startDate = targetStartDate;
        commitment.endDate = targetEndDate;
        dispatch(updateCommitmentAsync(commitment));
      }
    }
    console.timeEnd();
  };

  const quickAdd = () => {
    for (let i = 0; i < dateArray.length; i++) {
      if (isSlotFree(dateArray[i], blockedDatesObj)
      && isBeforeEndDate(dateArray[i]) && isAfterCurrentDate(dateArray[i])) {
        dispatch(addCommitmentAsync({
          startDate: dateArray[i],
          endDate: dayjs(dateArray[i]).add(numOfDays, 'd').format('YYYY-MM-DD'),
          name,
        }));
        return null;
      }
    }
    return null;
  };

  return (
    <div className="commitment-group-container" style={containerStyle}>
      <div className="table-header" date={new Date()}>
        <h4 className="group-title">{name}</h4>
        <i role="button" tabIndex="0" name={name} onClick={quickAdd} className="fas fa-plus" />
      </div>
      {
        dateArray.map((date, index) => {
          const commitment = commitmentsObj[date];
          return (
            <div
              key={`${name}-${index}`}
              container-name={`${name}`}
              date={`${date}`}
              className="calendar-block"
              onDrop={drop}
              onDragOver={allowDrop}
            >
              {
                commitment ? <Commitment commitment={commitment} /> : null
              }
            </div>
          );
        })
      }
    </div>
  );
}

CommitmentGroup.propTypes = {
  challengeNumOfDays: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  challengeStartDate: PropTypes.string.isRequired,
  commitments: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
      challengeId: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  challengeEndDate: PropTypes.string.isRequired,
};

export default CommitmentGroup;
