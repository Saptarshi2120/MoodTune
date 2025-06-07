// import React from "react";

// const InfoModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
//         <h2 className="text-xl font-semibold mb-4">About MoodTunes</h2>
//         <p className="text-gray-600">

//         MoodTune is an intelligent mood-based song recommendation system designed to personalize music suggestions by understanding the user's emotions and sentiments. The journey begins with a secure OAuth-based login system powered by JWT tokens to manage user sessions effectively. Users respond to a set of curated questions intended to reflect their current emotional state, along with selecting their preferred song language.

// MoodTune processes these responses using NLP models to extract both textual emotions (Joy, Sadness, Fear, Anger, Disgust, Surprise, Neutral) and sentiments (Positive, Negative, Neutral). Emotions are mapped to sentiments and then fused using a weighted scoring system (60% emotion, 40% sentiment). These insights are organized into a 7x3 emotion-sentiment matrix, which determines the user’s final mood profile.

// The final mood, sentiment, and language preferences are passed to an LLM (Large Language Model) that generates an optimized search query. This query is used to fetch highly relevant results from the Spotify API, including the top 5 songs and playlists, each with associated cover art and clickable links.

// The backend is built using FastAPI, the frontend with React, and data is stored in PostgreSQL. MoodTune offers an emotionally intelligent music discovery experience that’s deeply personalized and dynamic.

//         </p>
//         <button onClick={onClose} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InfoModal;


// import React, { useEffect, useRef, useState } from "react";

// const InfoModal = ({ isOpen, onClose }) => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       const playAudio = async () => {
//         try {
//           await audioRef.current.play();
//           setIsPlaying(true);
//         } catch (err) {
//           console.warn("Autoplay prevented:", err);
//           setIsPlaying(false);
//         }
//       };
//       playAudio();
//     } else {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//         setIsPlaying(false);
//       }
//     }
//   }, [isOpen]);

//   const togglePlayback = () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play().then(() => {
//         setIsPlaying(true);
//       }).catch(err => {
//         console.warn("Playback failed:", err);
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] flex flex-col">
//         <h2 className="text-xl font-semibold mb-4">About MoodTunes</h2>

//         {/* Scrollable content area */}
//         <div className="overflow-y-auto text-gray-600 mb-4 pr-2" style={{ maxHeight: '60vh' }}>
//           <p>
//             MoodTune is an intelligent mood-based song recommendation system designed to personalize music suggestions by understanding the user's emotions and sentiments. The journey begins with a secure OAuth-based login system powered by JWT tokens to manage user sessions effectively. Users respond to a set of curated questions intended to reflect their current emotional state, along with selecting their preferred song language.
//             <br /><br />
//             MoodTune processes these responses using NLP models to extract both textual emotions (Joy, Sadness, Fear, Anger, Disgust, Surprise, Neutral) and sentiments (Positive, Negative, Neutral). Emotions are mapped to sentiments and then fused using a weighted scoring system (60% emotion, 40% sentiment). These insights are organized into a 7x3 emotion-sentiment matrix, which determines the user’s final mood profile.
//             <br /><br />
//             The final mood, sentiment, and language preferences are passed to an LLM (Large Language Model) that generates an optimized search query. This query is used to fetch highly relevant results from the Spotify API, including the top 5 songs and playlists, each with associated cover art and clickable links.
//             <br /><br />
//             The backend is built using FastAPI, the frontend with React, and data is stored in PostgreSQL. MoodTune offers an emotionally intelligent music discovery experience that’s deeply personalized and dynamic.
//           </p>
//         </div>

//         {/* Control Buttons */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={togglePlayback}
//             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//           >
//             {isPlaying ? "Pause Music" : "Play Music"}
//           </button>
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//           >
//             Close
//           </button>
//         </div>

//         {/* Hidden audio element */}
//         <audio ref={audioRef} src="/intro-music.mp3" preload="auto" />
//       </div>
//     </div>
//   );
// };

// export default InfoModal;


import React, { useEffect, useRef, useState } from "react";
import moodtunesLogo from "../../assets/info dia.png"; // adjust path based on your structure

const InfoModal = ({ isOpen, onClose }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Autoplay prevented:", err);
          setIsPlaying(false);
        }
      };
      playAudio();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  }, [isOpen]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Playback failed:", err);
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-semibold mb-4">About MoodTunes</h2>

        {/* Scrollable content area */}
        <div
  className="overflow-y-auto text-gray-600 mb-4 pr-2 px-4 text-justify"
  style={{ maxHeight: '60vh' }}
>
  {/* Inserted image */}
  <img
    src={moodtunesLogo}
    alt="MoodTunes Logo"
    className="w-full h-auto mb-4 rounded-lg shadow"
  />

  <p>
    MoodTune is an intelligent mood-based song recommendation system designed to personalize music suggestions by understanding the user's emotions and sentiments. The journey begins with a secure OAuth-based login system powered by JWT tokens to manage user sessions effectively. Users respond to a set of curated questions intended to reflect their current emotional state, along with selecting their preferred song language.
    <br /><br />
    MoodTune processes these responses using NLP models to extract both textual emotions (Joy, Sadness, Fear, Anger, Disgust, Surprise, Neutral) and sentiments (Positive, Negative, Neutral). Emotions are mapped to sentiments and then fused using a weighted scoring system (60% emotion, 40% sentiment). These insights are organized into a 7x3 emotion-sentiment matrix, which determines the user’s final mood profile.
    <br /><br />
    The final mood, sentiment, and language preferences are passed to an LLM (Large Language Model) that generates an optimized search query. This query is used to fetch highly relevant results from the Spotify API, including the top 5 songs and playlists, each with associated cover art and clickable links.
    <br /><br />
    The backend is built using FastAPI, the frontend with React, and data is stored in PostgreSQL. MoodTune offers an emotionally intelligent music discovery experience that’s deeply personalized and dynamic.
  </p>
</div>


        {/* Control Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={togglePlayback}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {isPlaying ? "Pause Music" : "Play Music"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Close
          </button>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src="/intro-music.mp3" preload="auto" />
      </div>
    </div>
  );
};

export default InfoModal;

