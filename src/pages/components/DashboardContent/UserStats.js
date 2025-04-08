import React from 'react';
import './UserStats.css';

function UserStats({ dailyListeningHours, last30DaysListeningHours }) {
  return (
    <div className="user-stats-container">
      <div className="stat-card">
        <h3>User Stats</h3>
        <div className="stat-item">
          <span className="label">Daily Listening Time:</span>
          <span className="value">{dailyListeningHours} hours</span>
        </div>
        <div className="stat-item">
          <span className="label">Last 30 Days Listening Time:</span>
          <span className="value">{last30DaysListeningHours} hours</span>
        </div>
      </div>
    </div>
  );
}

export default UserStats;