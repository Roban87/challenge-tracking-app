import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { updateCommitmentAsync, removeCommitmentAsync } from '../../redux/commitments/commitments.actions';
import './Commitment.css';

function Commitment({ commitment }) {
  const {
    startDate, endDate, name, id, isDone,
  } = commitment;
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state) => state.currentDate);
  const [isRemoveHidden, setIsRemoveHidden] = useState(true);
  const numOfDays = dayjs(endDate).diff(startDate, 'd');
  const isCommitmentActive = dayjs(currentDate).diff(endDate, 'd') <= 1;
  function toggleIsDone() {
    if (!isCommitmentActive) {
      return;
    }
    dispatch(updateCommitmentAsync({
      startDate,
      endDate,
      name,
      id,
      isDone: !isDone,
    }));
  }

  function drag(ev) {
    if (!isCommitmentActive) {
      return;
    }
    const container = document.querySelector(`[date="${startDate}"][container-name="${name}"]`);
    const children = Array.from(container.children);
    ev.dataTransfer.setData('commitmentId', id);
    ev.dataTransfer.setData('name', name);
    ev.dataTransfer.setData('numofdays', numOfDays);
    setTimeout(() => {
      children.forEach((child) => {
        child.style.display = 'none';
      });
    }, 0);
  }
  function dragOver(ev) {
    ev.stopPropagation();
  }
  function dragEnd(ev) {
    setTimeout(() => {
      ev.target.style.display = 'block';
      ev.target.parentNode.style.display = 'block';
    }, 0);
  }
  function removeItem() {
    const container = document.querySelector(`[date="${startDate}"][container-name="${name}"]`);
    const children = Array.from(container.children);
    children.forEach((child) => {
      child.style.display = 'none';
    });
    dispatch(removeCommitmentAsync(id));
  }
  const showRemove = () => {
    setIsRemoveHidden(false);
  };

  const hideRemove = () => {
    setIsRemoveHidden(true);
  };

  const style = {
    height: `${35 * numOfDays}px`,
    backgroundColor: isDone ? '#86c232' : '#6b6e70',
    zIndex: '200',
    position: 'absolute',
    width: '100%',
    border: '1px solid #474b4f',
  };
  return (
    <div>
      <div
        onMouseEnter={showRemove}
        onMouseLeave={hideRemove}
        onTouchStart={showRemove}
        className="commitment-item"
        id={`${id}`}
        style={style}
        draggable
        onDragStart={drag}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
      >
        {
         isCommitmentActive ? !isRemoveHidden ? <i role="button" tabIndex="0" onClick={removeItem} className="fas fa-times remove-commitment" /> : null : null
        }
        {name}
        {
          isCommitmentActive ? <i role="button" tabIndex="0" onClick={toggleIsDone} className={`${isDone ? 'fas fa-check-square' : 'far fa-square'} checkbox`} /> : null
        }
      </div>
    </div>
  );
}

Commitment.propTypes = {
  commitment: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    challengeId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};

export default Commitment;
