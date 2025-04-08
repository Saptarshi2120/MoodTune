/*import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./questionPage.css"; // ✅ Import external CSS file

const questions = [
  "How are you feeling today?",
  "What genre of music do you prefer?",
  "Do you have a favorite artist?",
  "Would you like upbeat or slow songs?",
];

const QuestionsPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState("");
  const [answers, setAnswers] = useState([]); // ✅ Stores answers

  const handleSubmit = async () => {
    if (response.trim() === "") return alert("Please enter a response!");

    // ✅ Store the answer
    setAnswers((prevAnswers) => [...prevAnswers, response]);

    // Reset response field
    setResponse("");

    // ✅ Move to the next question OR send data to backend if last question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        const res = await fetch("http://localhost:5000/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responses: [...answers, response] }),
        });

        const data = await res.json();
        alert(data.message);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    }
  };

  return (
    <div className="questions-container">
      <div className="question-box">
        <motion.h2
          className="question-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {questions[currentQuestion]}
        </motion.h2>

        <input
          type="text"
          className="question-input"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>

    
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
    </div>
  );
};

export default QuestionsPage;*/
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const questions = [
  "How are you feeling today?",
  "What genre of music do you prefer?",
  "Do you have a favorite artist?",
  "Would you like upbeat or slow songs?",
];

const QuestionsPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState("");
  const [answers, setAnswers] = useState([]); 

  const handleSubmit = async () => {
    if (response.trim() === "") return alert("Please enter a response!");

    setAnswers((prevAnswers) => [...prevAnswers, response]);
    setResponse("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        const res = await fetch("http://localhost:5000/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responses: [...answers, response] }),
        });

        const data = await res.json();
        alert(data.message);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 text-white relative">
      <motion.div
        className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">{questions[currentQuestion]}</h2>

        <motion.input
          type="text"
          className="w-full p-2 text-black rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-400"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          whileFocus={{ scale: 1.05 }}
        />

        <motion.button
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Submit
        </motion.button>
      </motion.div>

      {/* ✅ Back Button at Bottom Left */}
      <Link
        to="/"
        className="absolute bottom-6 left-6 text-white text-lg font-semibold hover:underline transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default QuestionsPage;

