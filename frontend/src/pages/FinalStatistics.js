import React from 'react';
import FinalCharts from '../components/Charts/FinalCharts';
import '../styles/FinalStatistics.css';

function FinalStatistics() {
  return (
    <div className='statistics-main-container'>
      <h1 className='statistics-title'>
        <span>Challenge</span> Results Page
      </h1>
      <div className='statistics-container'>
        <FinalCharts />
      </div>
    </div>
  );
}

export default FinalStatistics;
