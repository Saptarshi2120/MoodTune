import React, { useEffect, useState } from 'react';
import UserStats from './UserStats';
import SongRepetition from './SongRepetition';
import UserMoodChart from './UserMoodChart';
import ListeningMinutesChart from './ListeningMinutesChart';
import SkeletonLoader from './SkeletonLoader'; // Make sure this is imported
import './DashboardContent.css';

function DashboardContent() {
  const [dailyListeningHours, setDailyListeningHours] = useState(null);
  const [last30DaysListeningHours, setLast30DaysListeningHours] = useState(null);
  const [dailySongRepetitions, setDailySongRepetitions] = useState([]);
  const [emotionCounts, setEmotionCounts] = useState({});
  const [listeningMinutesData, setListeningMinutesData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);

  const email = "anonymous@11e45874x157ample.com";

  const parseDurationToSeconds = (durationStr) => {
    if (!durationStr || !/^\d+:\d+$/.test(durationStr)) return 0;
    const [min, sec] = durationStr.split(':').map(Number);
    return (min * 60) + sec;
  };

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     setIsLoading(true);
  //     setIsDataReady(false);

  //     try {
  //       const [
  //         durationsRes,
  //         repetitionsRes,
  //         emotionsRes,
  //         weeklyListeningRes
  //       ] = await Promise.all([
  //         fetch(`http://localhost:8000/api/song-durations-summary/${email}`),
  //         fetch(`http://localhost:8000/api/last-songs-with-durations/${email}`),
  //         fetch(`http://localhost:8000/api/emotions/${email}`),
  //         fetch(`http://localhost:8000/api/weekly-listening-minutes/${email}`)
  //       ]);

  //       const durations = await durationsRes.json();
  //       const repetitions = await repetitionsRes.json();
  //       const emotions = await emotionsRes.json();
  //       const weekly = await weeklyListeningRes.json();

  //       // 🎧 Durations
  //       setDailyListeningHours(durations.total_duration_last_entry?.formatted || "Error");
  //       setLast30DaysListeningHours(durations.total_duration_all_entries?.formatted || "Error");

  //       // 🔁 Song Repetitions
  //       if (repetitions.songs) {
  //         const parsedSongs = repetitions.songs.map(song => ({
  //           song: song.name,
  //           durationSeconds: parseDurationToSeconds(song.duration),
  //         }));

  //         const maxDuration = Math.max(...parsedSongs.map(item => item.durationSeconds), 60);

  //         const formatted = parsedSongs.map(item => ({
  //           ...item,
  //           heightPercent: (item.durationSeconds / maxDuration) * 90 + 10
  //         }));

  //         setDailySongRepetitions(formatted);
  //       }

  //       // 😊 Emotions
  //       setEmotionCounts(emotions.emotion_counts || {});

  //       // ⏱️ Weekly Listening Data
  //       if (Array.isArray(weekly)) {
  //         setListeningMinutesData(weekly);
  //       } else {
  //         setListeningMinutesData([]);
  //       }

  //       // ✅ After ALL data is fetched and states are updated
  //       setIsDataReady(true);

  //     } catch (error) {
  //       console.error("❌ Error loading dashboard data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchAllData();
  // }, []);

  useEffect(() => {
  const fetchAllData = async () => {
    setIsLoading(true);
    setIsDataReady(false);

    try {
      const [
        durationsRes,
        repetitionsRes,
        emotionsRes,
        weeklyListeningRes
      ] = await Promise.all([
        fetch(`http://localhost:8000/api/song-durations-summary/${email}`),
        fetch(`http://localhost:8000/api/last-songs-with-durations/${email}`),
        fetch(`http://localhost:8000/api/emotions/${email}`),
        fetch(`http://localhost:8000/api/weekly-listening-minutes/${email}`)
      ]);

      const durations = await durationsRes.json();
      const repetitions = await repetitionsRes.json();
      const emotions = await emotionsRes.json();
      const weekly = await weeklyListeningRes.json();

      const allDataPresent = durations && repetitions && emotions && weekly;

      if (allDataPresent) {
        // 🎧 Durations
        setDailyListeningHours(durations.total_duration_last_entry?.formatted || "0:00");
        setLast30DaysListeningHours(durations.total_duration_all_entries?.formatted || "0:00");

        // 🔁 Song Repetitions
        if (Array.isArray(repetitions.songs)) {
          const parsedSongs = repetitions.songs.map(song => ({
            song: song.name,
            durationSeconds: parseDurationToSeconds(song.duration),
          }));

          const maxDuration = Math.max(...parsedSongs.map(item => item.durationSeconds), 60);

          const formatted = parsedSongs.map(item => ({
            ...item,
            heightPercent: (item.durationSeconds / maxDuration) * 90 + 10
          }));

          setDailySongRepetitions(formatted);
        }

        // 😊 Emotions
        setEmotionCounts(emotions.emotion_counts || {});

        // ⏱️ Weekly Listening Data
        if (Array.isArray(weekly)) {
          setListeningMinutesData(weekly);
        }

        // ✅ Set ready only after confirming all parts are valid
        const valid = durations.total_duration_last_entry &&
                      durations.total_duration_all_entries &&
                      Array.isArray(repetitions.songs) &&
                      emotions.emotion_counts &&
                      Array.isArray(weekly);

        if (valid) {
          setIsDataReady(true);
        }
      }

    } catch (error) {
      console.error("❌ Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAllData();
}, []);


  // 👉 Show Skeleton Loader until ALL data ready
  if (isLoading || !isDataReady) {
    return (
      <div className="dashboard-content">
        <h1>MoodTunes Dashboard</h1>
        <SkeletonLoader height="600px" />
      </div>
    );
  }

  // 👉 Once data is ready, show full dashboard
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
        <div>
          <UserMoodChart emotionCounts={emotionCounts} />
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
