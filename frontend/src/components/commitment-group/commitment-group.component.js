import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createDateArray } from '../../utilities/date.utils';
import Commitment from '../commitment/commitment.component';

import { updateCommitmentAsync } from '../../redux/commitments/commitments.actions';

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
    handleClick,
  } = props;
  const blockArray = createDateArray(challengeStartDate, challengeNumOfDays);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  function allowDrop(ev) {
    ev.preventDefault();
  }

  const drop = (ev) => {
    ev.preventDefault();
    const commitmentId = Number(ev.dataTransfer.getData('commitmentId'));
    const commitName = ev.dataTransfer.getData('name');
    const commitDays = ev.dataTransfer.getData('numofdays');
    const containerName = ev.target.getAttribute('container-name');
    const targetStartDate = ev.target.getAttribute('date');
    const isBeforeEndDate = moment(challengeEndDate).diff(moment(targetStartDate).add(commitDays, 'd'), 'days') >= 0;
    const isAfterCurrentDate = moment(targetStartDate).add(Number(commitDays), 'd').diff(currentDate, 'days') >= 0;
    const targetEndDate = moment(targetStartDate).add(commitDays, 'd').format('YYYY-MM-DD');

    const isSlotFree = (commitment, allCommitments) => {
      const { startDate, endDate, id } = commitment;
      const otherCommitments = allCommitments.filter((otherCommitment) => (
        otherCommitment.id !== id));
      for (let i = 0; i < otherCommitments.length; i++) {
        if (moment(startDate).diff(otherCommitments[i].startDate, 'days') >= 0
          && moment(startDate).diff(otherCommitments[i].endDate, 'days') < 0) {
          return false;
        }
        if (moment(endDate).diff(otherCommitments[i].startDate, 'days') > 0
          && moment(endDate).diff(otherCommitments[i].endDate, 'days') <= 0) {
          return false;
        }
      }
      return true;
    };

    if (commitName === containerName) {
      if (isBeforeEndDate && isAfterCurrentDate && isSlotFree({
        id: commitmentId,
        endDate: targetEndDate,
        startDate: targetStartDate,
      }, commitments)) {
        ev.target.appendChild(document.getElementById(commitmentId));
        const commitment = commitments.find((commit) => commit.id === Number(commitmentId));
        commitment.startDate = targetStartDate;
        commitment.endDate = targetEndDate;
        dispatch(updateCommitmentAsync(commitment));
      }
    }
  };

  return (
    <div className="commitment-group-container" style={containerStyle}>
      <div className="table-header" date={new Date()}>
        <h4 className="group-title">{name}</h4>
        <i role="button" tabIndex="0" name={name} onClick={handleClick} className="fas fa-plus" />
      </div>
      {
        blockArray.map((date, index) => {
          const commitment = commitments.filter((commit) => (
            moment(commit.startDate).diff(date, 'days') === 0))[0];
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
  commitments: PropTypes.string.isRequired,
  challengeEndDate: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CommitmentGroup;
