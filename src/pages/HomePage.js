/*
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Emotion-Based Song Recommendation
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl mb-6 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Discover music that matches your mood
      </motion.p>

      <Link to="/questions">
        <motion.button
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-110 hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </Link>
    </div>
  );
};

export default HomePage;*/
/*import React, { useState, useEffect } from "react";
import { Music, Sun, Moon, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InfoModal from "./components/InfoModal";
import AuthModal from "./components/AuthPa";
import EmotionQuiz from "./components/EmotionQuiz";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleSignup = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  if (showQuiz) {
    return <EmotionQuiz onBack={() => setShowQuiz(false)} isDarkMode={isDarkMode} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#0a0a1f]" : "bg-gradient-to-br from-pink-100 to-purple-200"}`}>
      
      <nav className="fixed w-full p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Music className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            MoodTunes
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`} onClick={() => setIsInfoModalOpen(true)}>
            <Info className={isDarkMode ? "text-white" : "text-gray-800"} />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`} onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
          </button>
          <button className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"}`} onClick={handleLogin}>
            Login
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </nav>

      
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse`}
              style={{
                left: `${(i * 25) + (mousePosition.x * 10)}%`,
                top: `${(i * 20) + (mousePosition.y * 10)}%`,
                backgroundColor: isDarkMode ? "#7c3aed" : "#d8b4fe",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

     
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? "from-purple-400 to-pink-400" : "from-purple-600 to-pink-600"}`}>
            Let AI Find the Perfect Playlist for Your Mood!
          </h1>

          <p className={`text-xl mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Experience personalized music recommendations powered by AI.
            Tell us how you're feeling, and we'll create the perfect playlist to match your mood.
          </p>

          <button onClick={() => setShowQuiz(true)} className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transform hover:scale-105 transition-all">
            Discover Your Playlist 🎶
          </button>

         
          <div className={`mt-16 p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-lg`}>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              How are you feeling today?
            </h2>
            <div className="flex justify-center gap-6">
              <button className="text-4xl hover:scale-125 transition-transform">😊</button>
              <button className="text-4xl hover:scale-125 transition-transform">😢</button>
              <button className="text-4xl hover:scale-125 transition-transform">😡</button>
            </div>
          </div>
        </div>
      </main>

      
      <Link to="/" className="absolute bottom-6 left-6 text-white text-lg font-semibold hover:underline transition">
        ← Back to Home
      </Link>

      
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default HomePage;*/


import React, { useState, useEffect } from "react";
import { Music, Sun, Moon, Info } from "lucide-react";
import { Link } from "react-router-dom";
import InfoModal from "./components/InfoModal";
import AuthModal from "./components/AuthModal";

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEmotionQuizOpen, setIsEmotionQuizOpen] = useState(false); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleSignup = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#0a0a1f]" : "bg-gradient-to-br from-pink-100 to-purple-200"}`}>
      
      {/* Navigation Bar */}
      {/* <nav className="fixed w-full p-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <Music className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            MoodTunes
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`} onClick={() => setIsInfoModalOpen(true)}>
            <Info className={isDarkMode ? "text-white" : "text-gray-800"} />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"}`} onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
          </button>
          <button className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"}`} onClick={handleLogin}>
            Login
          </button>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </nav> */}
      <nav className="fixed w-full p-4 flex justify-between items-center z-50">
  <div className="flex items-center gap-2">
    <Music className={`w-8 h-8 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
    <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
      MoodTunes
    </span>
  </div>
  <div className="flex items-center gap-4">
    {/* Dashboard Button */}
    <Link to="/dashboard">
  <button
    className={`px-4 py-2 rounded-lg ${
      isDarkMode
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-white text-blue-600 hover:bg-blue-100"
    }`}
  >
    Dashboard
  </button>
</Link>


    {/* Info Button */}
    <button
      className={`p-2 rounded-lg transition-colors ${
        isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"
      }`}
      onClick={() => setIsInfoModalOpen(true)}
    >
      <Info className={isDarkMode ? "text-white" : "text-gray-800"} />
    </button>

    {/* Theme Toggle */}
    <button
      className={`p-2 rounded-lg transition-colors ${
        isDarkMode ? "hover:bg-gray-800" : "hover:bg-purple-100"
      }`}
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-gray-800" />}
    </button>

    {/* Login / Sign Up Buttons */}
    <button
      className={`px-4 py-2 rounded-lg ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
      onClick={handleLogin}
    >
      Login
    </button>
    <button
      className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
      onClick={handleSignup}
    >
      Sign Up
    </button>
  </div>
</nav>


      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse`}
              style={{
                left: `${(i * 25) + (mousePosition.x * 10)}%`,
                top: `${(i * 20) + (mousePosition.y * 10)}%`,
                backgroundColor: isDarkMode ? "#7c3aed" : "#d8b4fe",
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? "from-purple-400 to-pink-400" : "from-purple-600 to-pink-600"}`}>
            Let AI Find the Perfect Playlist for Your Mood!
          </h1>

          <p className={`text-xl mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Experience personalized music recommendations powered by AI.
            Tell us how you're feeling, and we'll create the perfect playlist to match your mood.
          </p>

          {/* Navigate to EmotionQuiz */}
          <Link to="/emotionquiz">
            <button className="px-8 py-4 text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 transform hover:scale-105 transition-all">
              Discover Your Playlist 🎶
            </button>
          </Link>

          {/* Mood Selection */}
          <div className={`mt-16 p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} backdrop-blur-lg`}>
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              How are you feeling today?
            </h2>
            <div className="flex justify-center gap-6">
              <button className="text-4xl hover:scale-125 transition-transform">😊</button>
              <button className="text-4xl hover:scale-125 transition-transform">😢</button>
              <button className="text-4xl hover:scale-125 transition-transform">😡</button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default HomePage;
