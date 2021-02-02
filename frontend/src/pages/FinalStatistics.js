import React from 'react';
import FinalCharts from '../components/Charts/FinalCharts';
import '../styles/Statistics.css';

function FinalStatistics() {
  return (
    <section className="statistics-main-container">
      <h1>
        <span>Challenge</span>
        {' '}
        Results
      </h1>
      <div className="statistics-container">
        <FinalCharts />
      </div>
    </section>
  );
}

export default FinalStatistics;
