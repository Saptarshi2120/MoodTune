import React from 'react';
import './Sidebar.css';
import logo from '../../../assets/moodtunes_logo.jpg';// Adjust the path if needed
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Settings, User } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="MoodTunes Logo" className="logo-image" />
        <span className="logo-text">MoodTunes</span>
      </div>
      <ul className="nav-links">
        <li><a href="#" className="active">Home</a></li>
        <li><a href="#">Songs</a></li>
        <li><a href="#">Users</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
      <button
  onClick={() => navigate("/")}
  className="absolute bottom-4 left-4 px-4 py-3 flex items-center rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors"
>
  <ArrowLeft className="mr-2 w-5 h-5" />
  Back to Homepage
</button>


    </div>
  );
}

export default Sidebar;