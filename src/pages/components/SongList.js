// src/components/SongList.js
import React, { useEffect, useState } from 'react';
import './SongList.css';

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error("❌ Failed to load songs:", err));
  }, []);

  return (
    <div className="song-list-container">
      <h3>Songs from Database</h3>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <strong>{song.name}</strong> - {song.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
