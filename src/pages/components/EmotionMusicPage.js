// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom'; // Ensure React Router is used

// const emotionTaglines = {
//   joy: "Yay! You are happy today!",
//   sad: "Oh no! You're feeling a bit down.",
//   angry: "Take a breath, let's cool down.",
//   surprise: "Whoa! Something unexpected, huh?",
//   disgust: "Ugh! That’s unpleasant.",
//   fear: "It’s okay to be scared sometimes.",
// };

// const songs = [
//   {
//     name: "Happy Vibes",
//     playlist: "Sunshine Playlist",
//     album_image_url: "https://i.scdn.co/image/ab67616d0000b273e2d8657bdbd236fa72efaf1f",
//     play_link: "https://open.spotify.com/track/1gDNkE6e8idKwqf0OeE1uF"
//   },
//   {
//     name: "Feel Good Inc.",
//     playlist: "Feel Good",
//     album_image_url: "https://i.scdn.co/image/ab67616d0000b2737029f0433cb61d4b2d8f0850",
//     play_link: "https://open.spotify.com/track/0d28khcov6AiegSCpG5TuT"
//   },
//   {
//     name: "Can't Stop the Feeling!",
//     playlist: "Dance Hits",
//     album_image_url: "https://i.scdn.co/image/ab67616d0000b273f1b514d3ff8621f7fbdccf84",
//     play_link: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc"
//   },
//   {
//     name: "Uptown Funk",
//     playlist: "Funky Beats",
//     album_image_url: "https://i.scdn.co/image/ab67616d0000b2736d71e3e679cfa01f2d383d71",
//     play_link: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS"
//   },
//   {
//     name: "Best Day of My Life",
//     playlist: "Optimistic Moods",
//     album_image_url: "https://i.scdn.co/image/ab67616d0000b273079b6434ff3f407f1ffb8b9b",
//     play_link: "https://open.spotify.com/track/0nJW01T7XtvILxQgC5J7Wh"
//   }
// ];

// const EmotionMusicPage = () => {
//   const emotion = "joy"; // Set emotion dynamically
//   const tagline = emotionTaglines[emotion] || "Here's something for you!";
//   const playlistName = songs[0]?.playlist || "Recommended Playlist";
//   const albumImage = songs[0]?.album_image_url;

//   return (
//     <div className="min-h-screen px-8 py-10 flex flex-col items-center relative overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">

//       {/* Background Video */}
//       <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
//         <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
//       </video>

//       {/* Dark Overlay */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0"></div>

//       {/* Back to Home Button */}
//       <Link to="/" className="absolute bottom-5 left-5 z-20">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-100 transition duration-300"
//         >
//           ← Back to Homepage
//         </motion.button>
//       </Link>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center space-y-8">

//         {/* Emotion Tagline */}
//         <motion.h2
//           className="text-5xl font-semibold text-white mb-4 italic drop-shadow-xl"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           {tagline}
//         </motion.h2>

//         {/* Intro Text */}
//         <motion.p
//           className="text-2xl font-medium text-white text-center mb-8 max-w-2xl"
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           Based on your current mood, here are the top 5 songs that we recommend to uplift your spirits! Enjoy the tunes 🎶.
//         </motion.p>

//         {/* Heading */}
//         <motion.h1
//           className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Top 5 Song Recommendations
//         </motion.h1>

//         {/* Song List */}
//         <div className="w-full max-w-4xl space-y-6">
//           {/* First Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {songs.slice(0, 3).map((song, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.4, duration: 0.8 }}
//               >
//                 <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-xl hover:scale-105 transition-transform">
//                   <motion.a
//                     href={song.play_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-2xl font-semibold text-purple-600 hover:text-purple-800 mb-4"
//                   >
//                     {song.name}
//                   </motion.a>
//                   {/* <p className="text-gray-600 mb-2">{emotion === "joy" ? "Good vibes only!" : "Just feel the music!"}</p> */}
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Second Row */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {songs.slice(3).map((song, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: (index + 3) * 0.4, duration: 0.8 }}
//               >
//                 <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-xl hover:scale-105 transition-transform">
//                   <motion.a
//                     href={song.play_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-2xl font-semibold text-purple-600 hover:text-purple-800 mb-4"
//                   >
//                     {song.name}
//                   </motion.a>
//                   {/* <p className="text-gray-600 mb-2">{emotion === "joy" ? "Good vibes only!" : "Just feel the music!"}</p> */}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Playlist & Album */}
//         <motion.div
//   className="mt-12 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 px-4"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 2.5, duration: 1 }}
// >
//   {/* Playlist Name Box */}
//   <div className="flex-1">
//   <div className="bg-blue-100 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
//       <h2 className="text-2xl font-bold text-purple-700 mb-2">
//         Playlist:
//       </h2>
//       <motion.a
//         href={`https://open.spotify.com/playlist/${songs[0]?.playlist}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-xl font-bold text-purple-900 underline hover:text-purple-600"
//       >
//         {playlistName}
//       </motion.a>

//       {/* Floating Text */}
//       <motion.div
//         className="mt-4 text-lg font-semibold text-gray-800"
//         initial={{ y: 0 }}
//         animate={{ y: [0, -10, 0] }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         🎶 Feel the rhythm, let's vibe!
//       </motion.div>
//     </div>
//   </div>

//   {/* Album Image */}
//   <motion.div
//     className="flex justify-center items-center flex-shrink-0"
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 1 }}
//   >
//     <img
//       src={albumImage}
//       alt="Album"
//       className="w-52 h-52 object-cover rounded-xl shadow-2xl border-4 border-purple-300 hover:scale-110 transition-transform duration-300"
//     />
//   </motion.div>
// </motion.div>



//       </div>
//     </div>
//   );
// };

// export default EmotionMusicPage;





import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const emotionTaglines = {
  joy: "Yay! You are happy today!",
  sad: "Oh no! You're feeling a bit down.",
  angry: "Take a breath, let's cool down.",
  surprise: "Whoa! Something unexpected, huh?",
  disgust: "Ugh! That’s unpleasant.",
  fear: "It’s okay to be scared sometimes.",
  neutral: "Just a chill, regular moment.",
};

const EmotionMusicPage = () => {
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState({});
  const [emotion, setEmotion] = useState(""); // Optional: Set based on API if needed

  const email = "anonymous@11e45874x157ample.com"; // Replace with dynamic email or auth user
// const id = 5;
useEffect(() => {
  const fetchUserEmotions = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-emotions/${email}`);
      const data = response.data;

      // Set songs and playlist directly from the structured response
      if (Array.isArray(data.songs)) {
        const fetchedSongs = data.songs.map(song => ({
          name: song.name,
          play_link: song.link,
          album_image_url: song.image
        }));
        setSongs(fetchedSongs);
      }

      if (data.playlist) {
        setPlaylist({
          name: data.playlist.name,
          link: data.playlist.link,
          image: data.playlist.image
        });
      }

      // if (data.emotion) {
      //   setEmotion(data.emotion);
      // }
      if (data.text_emotion) {
          setEmotion(data.text_emotion.toLowerCase()); // ensure match with keys in emotionTaglines
        }

    } catch (error) {
      console.error("Error fetching user emotions:", error);
    }
  };

  fetchUserEmotions();
}, [email]);

//   useEffect(() => {
//   const fetchUserEmotions = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/user-emotions/${email}`);
//       const data = response.data;

//       // Directly use the songs and playlist from response
//       setSongs(data.songs);
//       setPlaylist(data.playlist);

//       if (data.emotion) setEmotion(data.emotion); // If backend sends emotion too
//     } catch (error) {
//       console.error("Error fetching user emotions:", error);
//     }
//   };

//   fetchUserEmotions();
// }, []);


  const tagline = emotionTaglines[emotion] || "Here's something for you!";

  return (
    <div className="min-h-screen px-8 py-10 flex flex-col items-center relative overflow-hidden bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>  */}

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0"></div>

      <Link to="/" className="absolute bottom-5 left-5 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-purple-100 transition duration-300"
        >
          ← Back to Homepage
        </motion.button>
      </Link>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.h2
          className="text-5xl font-semibold text-white mb-4 italic drop-shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {tagline}
        </motion.h2>

        <motion.p
          className="text-2xl font-medium text-white text-center mb-8 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          Based on your current mood, here are the top 5 songs that we recommend to uplift your spirits! Enjoy the tunes 🎶.
        </motion.p>

        <motion.h1
          className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Top 5 Song Recommendations
        </motion.h1>

        {/* <div className="w-full max-w-4xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {songs.slice(0, 3).map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.4, duration: 0.8 }}
              >
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-xl hover:scale-105 transition-transform">
                  <motion.a
                    href={song.play_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-semibold text-purple-600 hover:text-purple-800 mb-4"
                  >
                    {song.name}
                  </motion.a>
                  <img src={song.album_image_url} alt={song.name} className="w-32 h-32 rounded-md" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {songs.slice(3).map((song, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 3) * 0.4, duration: 0.8 }}
              >
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-xl hover:scale-105 transition-transform">
                  <motion.a
                    href={song.play_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-semibold text-purple-600 hover:text-purple-800 mb-4"
                  >
                    {song.name}
                  </motion.a>
                  <img src={song.album_image_url} alt={song.name} className="w-32 h-32 rounded-md" />
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}
        <div className="w-full max-w-4xl space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {songs.slice(0, 3).map((song, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.4, duration: 0.8 }}
        className="text-center"
      >
        <a
          href={song.play_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-semibold text-white hover:text-purple-800 block mb-2"
        >
          {song.name}
        </a>
        <img
          src={song.album_image_url}
          alt={song.name}
          className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto"
        />
      </motion.div>
    ))}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {songs.slice(3).map((song, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index + 3) * 0.4, duration: 0.8 }}
        className="text-center"
      >
        <a
          href={song.play_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-semibold text-white hover:text-purple-800 block mb-2"
        >
          {song.name}
        </a>
        <img
          src={song.album_image_url}
          alt={song.name}
          className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto"
        />
      </motion.div>
    ))}
  </div>
</div>

        {/* Playlist & Album */}
        {/* {playlist.name && (
          <motion.div
            className="mt-12 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <div className="flex-1">
              <div className="bg-blue-100 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">
                  Playlist:
                </h2>
                <motion.a
                  href={playlist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-purple-900 underline hover:text-purple-600"
                >
                  {playlist.name}
                </motion.a>
                <motion.div
                  className="mt-4 text-lg font-semibold text-gray-800"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎶 Feel the rhythm, let's vibe!
                </motion.div>
              </div>
            </div>

            <motion.div
              className="flex justify-center items-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <img
                src={playlist.image}
                alt="Album"
                className="w-52 h-52 object-cover rounded-xl shadow-2xl border-4 border-purple-300 hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          </motion.div>
        )} */}

        {playlist.name && (
  <motion.div
    className="mt-12 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 px-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.5, duration: 1 }}
  >
    <div className="flex-1 text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-2">Playlist:</h2>
      <motion.a
        href={playlist.link}
        target="_blank"
        rel="noopener noreferrer"
       className="text-xl font-bold text-white underline hover:text-purple-600"
      >
        {playlist.name}
      </motion.a>
      <motion.div
        className="mt-4 text-lg font-semibold text-white-800"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🎶 Feel the rhythm, let's vibe!
      </motion.div>
    </div>

    <motion.div
      className="flex justify-center items-center flex-shrink-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        src={playlist.image}
        alt="Album"
        className="w-32 h-32 object-cover rounded-xl shadow-2xl border-4 border-purple-300 hover:scale-110 transition-transform duration-300"
      />
    </motion.div>
  </motion.div>
)}

      </div>
    </div>
  );
};

export default EmotionMusicPage;
