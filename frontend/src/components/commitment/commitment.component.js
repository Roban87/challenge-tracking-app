import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNumOfDays, formatDateToString } from '../../utilities/date.utils';
import { updateCommitmentAsync, removeCommitmentAsync } from '../../redux/commitments/commitments.actions';
import './commitment.styles.css';

export default function Commitment({ commitment }) {
  const { startDate, endDate, name, id, isDone } = commitment;
  const dispatch = useDispatch();
  const { currentDate } = useSelector(state => state.currentDate);
  const [isRemoveHidden, setIsRemoveHidden] = useState(true);
  const startDateString = formatDateToString(new Date(startDate));
  const endDateString = formatDateToString(new Date(endDate));
  const numOfDays = getNumOfDays(new Date(startDate), new Date(endDate));

  const isCommitmentActive = new Date(endDate).getTime() >= (currentDate.getTime() + (1000*60*60*24));
  function toggleIsDone(e) {
    if (!isCommitmentActive) {
      return;
    }
    dispatch(updateCommitmentAsync({
      startDate: startDateString,
      endDate: endDateString,
      name,
      id,
      isDone: !isDone,
    }));
  }

  function drag(ev) {
    if (!isCommitmentActive) {
      return;
    }
    const name = ev.target.getAttribute('name');
    const numOfDays = ev.target.getAttribute('numofdays');
    const container = document.querySelector(`[date="${startDateString}"][container-name="${name}"]`)
    const children = Array.from(container.children);
    ev.dataTransfer.setData("commitmentId", ev.target.id);
    ev.dataTransfer.setData("name", name);
    ev.dataTransfer.setData("numofdays", numOfDays);
    console.log(name);
    setTimeout(() => {
      children.forEach((child) => {
        child.style.display = 'none';
      })
    }, 0)
    
  }
  function dragOver(ev) {
    ev.stopPropagation();
  }
  function dragEnd(ev) {
    console.log(ev.target);
    setTimeout(() => {
      ev.target.style.display = 'block';
      ev.target.parentNode.style.display = 'block';
    }, 0)
  }

  const showRemove = (e) => {
    setIsRemoveHidden(false);
  }

  const hideRemove = (e) => {
    setIsRemoveHidden(true);
  }

  const style = {
    height: `${30*numOfDays}px`,
    backgroundColor: isDone ? '#86c232' : '#6b6e70',
    zIndex: '200',
    position: 'absolute',
    width:'100%',
    border: '1px solid #474b4f'
  }
  return (
    <div>
      <div 
        onMouseEnter={showRemove} 
        onMouseLeave={hideRemove}
        className='commitment-item'
        id={`${id}`} 
        style={style} 
        draggable={true} 
        onDragStart={drag}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        name={`${name}`}
        numofdays={`${numOfDays}`}
        >
        {
         isCommitmentActive ? !isRemoveHidden ? <i onClick={() => dispatch(removeCommitmentAsync(id))} className="fas fa-times remove-commitment"></i> : null : null
        }
        {name}
        {
          isCommitmentActive ? <i onClick={toggleIsDone} className={`${isDone ? "fas fa-check-square" : "far fa-square"} checkbox`}></i> : null
        }      
      </div>
    </div>
  )
}
