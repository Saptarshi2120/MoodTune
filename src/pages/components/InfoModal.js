import React from "react";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">About MoodTunes</h2>
        <p className="text-gray-600">
          MoodTunes uses AI to recommend music based on your emotions. Simply choose how you feel, and we'll create a personalized playlist for you!
        </p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
