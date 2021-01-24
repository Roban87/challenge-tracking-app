import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { createDateArray, addDays, formatDateToString, getNumOfDays } from '../../utilities/date.utils';
import Commitment from '../commitment/commitment.component';

import { updateCommitmentAsync } from '../../redux/commitments/commitments.actions';

import './commitment-group.styles.css';

export default function CommitmentGroup(props) {
  const dispatch = useDispatch();
  const { currentDate } = useSelector(state => state.currentDate);
  const { numOfDays, name, startDate, commitments, endDate, handleClick } = props;
  const blockArray = createDateArray(startDate, numOfDays);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  const drop = (ev) => {
    ev.preventDefault();
    let commitmentId = Number(ev.dataTransfer.getData("commitmentId"));
    let name = ev.dataTransfer.getData("name");
    let commitDays = ev.dataTransfer.getData("numofdays");
    let containerName = ev.target.getAttribute('container-name');
    let targetDate = ev.target.getAttribute('date');
    let isBeforeEndDate = moment(endDate).diff(moment(targetDate).add(commitDays, 'd'), 'days') >= 0;
    let isAfterCurrentDate = moment(targetDate).add(Number(numOfDays), 'd').diff(currentDate, 'days') >= 0;
    let commitEndDate = moment(targetDate).add(commitDays, 'd').format('YYYY-MM-DD');

    const isSlotFree = (commitment, allCommitments) => {
      const { startDate, endDate, id } = commitment;
      const otherCommitments = allCommitments.filter((otherCommitment) => otherCommitment.id !== id);
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
    }

    if (name === containerName) {
      if (isBeforeEndDate && isAfterCurrentDate && isSlotFree({
            id: commitmentId, 
            endDate: commitEndDate, 
            startDate: targetDate,
          }, commitments)) {
        ev.target.appendChild(document.getElementById(commitmentId));
        const commitment = commitments.find((commitment) => commitment.id === Number(commitmentId));
        commitment.startDate = targetDate;
        commitment.endDate = commitEndDate;
        dispatch(updateCommitmentAsync(commitment));
      }
    }
    
  };

  return (
    <div className="commitment-group-container" style={containerStyle}>
      <div className="table-header" date={new Date()}>
        <h4 className="group-title">{name}</h4> 
        <i name={name} onClick={handleClick} class="fas fa-plus"></i>
      </div>
      {
        blockArray.map((date, index) => {
          const commitment = commitments.filter((commitment) => (
            moment(commitment.startDate).diff(date,'days') === 0))[0];
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
            </div>)
        })
      }
    </div>
  )
}
