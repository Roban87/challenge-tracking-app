import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDateArray, addDays, getDateString, formatDateToString } from '../../utilities/date.utils';
import Commitment from '../commitment/commitment.component';

import { updateCommitmentAsync } from '../../redux/commitments/commitments.actions';

import './commitment-group.styles.css';

export default function CommitmentGroup(props) {
  const dispatch = useDispatch();
  const { numOfDays, name, startDate, commitments, endDate } = props;
  const blockArray = createDateArray(startDate, numOfDays);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'antiquewhite'
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  const drop = (ev) => {
    ev.preventDefault();
    let commitmentId = ev.dataTransfer.getData("commitmentId");
    let name = ev.dataTransfer.getData("name");
    let numOfDays = ev.dataTransfer.getData("numofdays");
    let containerName = ev.target.getAttribute('container-name');
    let targetDate = ev.target.getAttribute('date');
    if (name === containerName) {
      if ((new Date(targetDate).getDate() + Number(numOfDays)) <= endDate.getDate()) {
        ev.target.appendChild(document.getElementById(commitmentId));
        const commitment = commitments.find((commitment) => commitment.id == commitmentId);
        commitment.startDate = targetDate;
        commitment.endDate = formatDateToString(addDays(new Date(targetDate), Number(numOfDays)));
        dispatch(updateCommitmentAsync(commitment));
      }
    }
    
  };

  return (
    <div className="commitment-container" style={containerStyle}>
      <h4 style={{
        backgroundColor: 'white',
        color: 'black'
      }} date={new Date()}>{name} </h4>
      {
        blockArray.map((date, index) => {
          const commitment = commitments.filter((commitment) => formatDateToString(new Date(commitment.startDate)) === formatDateToString(date))[0];
          return (
            <div 
              key={`${name}-${index}`} 
              container-name={`${name}`} 
              date={`${formatDateToString(date)}`} 
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
