// src/pages/DashboardPage.js
import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardContent from './components/DashboardContent/DashboardContent';
import './DashboardPage.css'; // We’ll add styling here

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Sidebar />
      <DashboardContent />
    </div>
  );
}

export default DashboardPage;
