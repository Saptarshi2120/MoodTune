/*import React from 'react';
import UserStats from './UserStats';
import SongRepetition from './SongRepetition';
import UserMoodChart from './UserMoodChart';
import ListeningMinutesChart from './ListeningMinutesChart'; // ✅ Only chart we keep
import './DashboardContent.css';


function DashboardContent() {
  const dailyListeningHours = 4;
  const last30DaysListeningHours = 128;

  const listeningMinutesData = [
    { day: 'Mon', minutes: 20 },
    { day: 'Tue', minutes: 40 },
    { day: 'Wed', minutes: 10 },
    { day: 'Thu', minutes: 50 },
    { day: 'Fri', minutes: 35 },
    { day: 'Sat', minutes: 64 },
    { day: 'Sun', minutes: 55 },
  ];

  const dailySongRepetitions = [
    { song: 'Song A', count: 12 },
    { song: 'Song B', count: 6 },
    { song: 'Song C', count: 15 },
    { song: 'Song D', count: 4 },
  ];

  const moodData = {
    Mon: { happy: 15, sad: 2, angry: 1, cry: 0, joy: 3 },
    Tue: { happy: 18, sad: 1, angry: 0, cry: 1, joy: 5 },
    Wed: { happy: 20, sad: 0, angry: 0, cry: 2, joy: 2 },
    Thu: { happy: 16, sad: 3, angry: 1, cry: 0, joy: 4 },
    Fri: { happy: 22, sad: 1, angry: 0, cry: 0, joy: 3 },
    Sat: { happy: 25, sad: 0, angry: 0, cry: 1, joy: 5 },
    Sun: { happy: 20, sad: 2, angry: 1, cry: 0, joy: 2 },
  };

  return (
    <div className="dashboard-content">
      <h1>MoodTunes Dashboard</h1>
  
      <div className="top-row horizontal">
        <UserStats
          dailyListeningHours={dailyListeningHours}
          last30DaysListeningHours={last30DaysListeningHours}
        />
        <ListeningMinutesChart listeningMinutesData={listeningMinutesData} />
      </div>
  
      <div className="bottom-row">
        <SongRepetition dailySongRepetitions={dailySongRepetitions} />
        <UserMoodChart moodData={moodData} />
      </div>
    </div>
  );
}
<<<<<<< HEAD
export default DashboardContent;
=======

export default DashboardContent;*/
// src/pages/components/DashboardContent/DashboardContent.js

import React from 'react';
import UserStats from './UserStats';
import SongRepetition from './SongRepetition';
import UserMoodChart from './UserMoodChart';
import ListeningMinutesChart from './ListeningMinutesChart'; // ✅ Only chart we keep
import './DashboardContent.css';

function DashboardContent() {
  const dailyListeningHours = 4;
  const last30DaysListeningHours = 128;

  const listeningMinutesData = [
    { day: 'Mon', minutes: 20 },
    { day: 'Tue', minutes: 40 },
    { day: 'Wed', minutes: 10 },
    { day: 'Thu', minutes: 50 },
    { day: 'Fri', minutes: 35 },
    { day: 'Sat', minutes: 64 },
    { day: 'Sun', minutes: 55 },
  ];

  const dailySongRepetitions = [
    { song: 'Song A', count: 12 },
    { song: 'Song B', count: 6 },
    { song: 'Song C', count: 15 },
    { song: 'Song D', count: 4 },
  ];

  const moodData = {
    Mon: { happy: 15, sad: 2, angry: 1, cry: 0, joy: 3 },
    Tue: { happy: 18, sad: 1, angry: 0, cry: 1, joy: 5 },
    Wed: { happy: 20, sad: 0, angry: 0, cry: 2, joy: 2 },
    Thu: { happy: 16, sad: 3, angry: 1, cry: 0, joy: 4 },
    Fri: { happy: 22, sad: 1, angry: 0, cry: 0, joy: 3 },
    Sat: { happy: 25, sad: 0, angry: 0, cry: 1, joy: 5 },
    Sun: { happy: 20, sad: 2, angry: 1, cry: 0, joy: 2 },
  };

  return (
    <div className="dashboard-content">
      <h1>MoodTunes Dashboard</h1>
  
      <div className="top-row horizontal">
        <UserStats
          dailyListeningHours={dailyListeningHours}
          last30DaysListeningHours={last30DaysListeningHours}
        />
        <ListeningMinutesChart listeningMinutesData={listeningMinutesData} />
      </div>
  
      <div className="bottom-row">
        <SongRepetition dailySongRepetitions={dailySongRepetitions} />
        <UserMoodChart moodData={moodData} />
      </div>
    </div>
  );
}
export default DashboardContent;

>>>>>>> 2ddb15b86cb92fc0be7d41510e2d36450a10ceee
