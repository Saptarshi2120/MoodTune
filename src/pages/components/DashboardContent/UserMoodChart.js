import React from 'react';
import './UserMoodChart.css';

function UserMoodChart({ moodData }) {
  const moodColors = {
    happy: '#28a745', // Green
    sad: '#ffc107',   // Yellow
    angry: '#dc3545', // Red
    cry: '#007bff',   // Blue
    joy: '#FF69B4',   // Pink
  };

  const moodOrder = ['happy', 'sad', 'angry', 'cry', 'joy'];

  // Calculate the maximum mood count for scaling
  const maxMoodCount = Object.values(moodData).reduce((max, dayMoods) => {
    return Math.max(max, ...Object.values(dayMoods));
  }, 0);

  return (
    <div className="user-mood-chart-container">
      <h3>Users' Mood (Past 7 Days)</h3>
      <div className="mood-chart-horizontal-bar">
        {moodOrder.map((mood) => {
          const totalMoodCount = Object.values(moodData).reduce((sum, dayMoods) => {
            return sum + (dayMoods[mood] || 0);
          }, 0);
          const barWidthPercentage = maxMoodCount > 0 ? (totalMoodCount / maxMoodCount) * 100 : 0;

          return (
            <div key={mood} className="mood-bar-horizontal-container">
              <div className="mood-label-horizontal-bar">{mood.charAt(0).toUpperCase() + mood.slice(1)}</div>
              <div className="mood-bar-horizontal" style={{ width: `${barWidthPercentage}%`, backgroundColor: moodColors[mood] }}></div>
              <div className="mood-count-horizontal-bar">{totalMoodCount}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserMoodChart;