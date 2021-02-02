import React from 'react';
import Charts from '../components/Charts/Charts';
import '../styles/Statistics.css';

function Statistics() {
  return (
    <section className="statistics-main-container">
      <h1>
        <span>Challenge</span>
        {' '}
        Statistics
      </h1>
      <div className="statistics-container">
        <Charts />
      </div>
    </section>
  );
}

export default Statistics;
