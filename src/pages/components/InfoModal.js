import React from "react";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">About MoodTunes</h2>
        <p className="text-gray-600">

        MoodTune is a smart, emotion-based music recommendation system that personalizes song suggestions based on your current mood. Using real-time facial emotion detection via webcam and feedback from a short emotion quiz, it accurately identifies how you're feeling—happy, sad, relaxed, or energetic—and delivers music that matches your emotional state. Built with React and Flask, MoodTune integrates seamlessly with the Spotify API to curate mood-aligned playlists in your preferred language. The system uses advanced machine learning and computer vision models to analyze facial cues, ensuring personalized and responsive recommendations. It prioritizes user privacy and smooth UX, capturing only essential data with consent.!

        </p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
