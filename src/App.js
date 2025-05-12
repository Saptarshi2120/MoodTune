import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthModal from "./pages/components/AuthModal";
import InfoModal from "./pages/components/InfoModal";
import EmotionQuiz from "./pages/components/EmotionQuiz";
import Sidebar from './pages/components/Sidebar/Sidebar';
import DashboardPage from "./pages/DashboardPage";
import QuestionsPage from "./pages/QuestionsPage";
import EmotionMusicPage from "./pages/components/EmotionMusicPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emotionquiz" element={<EmotionQuiz />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
             <Route path="/emotion" element={<EmotionMusicPage />} />
        
       
      </Routes>
      <AuthModal />
      <InfoModal />
     
    </Router>
  );
};

export default App;
