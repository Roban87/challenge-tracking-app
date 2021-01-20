import React from 'react';
import Charts from '../components/Charts/Charts';
import '../styles/Statistics.css';

function Statistics() {
  return (
    <div className='statistics-main-container'>
      <h1 className='statistics-title'>
        <span>Challenge</span> Statistics Page
      </h1>
      <div className='statistics-container'>
        <Charts />
      </div>
    </div>
  );
}

export default Statistics;
