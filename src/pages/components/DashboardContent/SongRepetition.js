import React from 'react';
import './SongRepetition.css';

function SongRepetition({ dailySongRepetitions }) {
  const maxRepetition = Math.max(...dailySongRepetitions.map(item => item.count), 16); // Assuming max repetition around 16

  return (
    <div className="song-repetition-container">
      <h3>Song Repetition</h3>
      <div className="bar-chart">
        {dailySongRepetitions.map((item) => (
          <div key={item.song} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${(item.count / maxRepetition) * 100}%` }}
            >
              <span className="bar-label">{item.count}</span>
            </div>
            <div className="song-label">{item.song}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongRepetition;