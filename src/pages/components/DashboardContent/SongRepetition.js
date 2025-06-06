// SongRepetition.js
import React from 'react';
import './SongRepetition.css';

const colorPalette = ["#FF9999", "#D4AC0D", "#28B463", "#1ABC9C", "#5DADE2", "#D63384"];

function SongRepetition({ dailySongRepetitions }) {
  const maxDuration = Math.max(...dailySongRepetitions.map(item => item.durationSeconds), 60);

  return (
    <div className="song-repetition-container">
      <h3>Last Played Songs (Durations in sec)</h3>
      <div className="bar-chart">
        {dailySongRepetitions.map((item, index) => {
          const heightPercent = (item.durationSeconds / maxDuration) * 100;

          return (
            <div key={item.song} className="bar-wrapper">
              <div
                className="bar"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: colorPalette[index % colorPalette.length],
                }}
              >
                <span className="bar-label">{item.durationSeconds}</span>
              </div>
              <div className="song-label">{item.song}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongRepetition;
