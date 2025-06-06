import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts';
import './UserMoodChart.css';

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50",
  "#a4de6c", "#d0ed57", "#8dd1e1", "#ffb6b9",
  "#b5ead7", "#ffdac1", "#e0bbE4", "#c7ceea"
];

function UserMoodChart({ emotionCounts }) {
  if (!emotionCounts || typeof emotionCounts !== 'object') {
    return <p>Loading mood data...</p>;
  }

  const data = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion,
    count,
  }));

  return (
    <div className="user-mood-chart-card">
      {/* <h3>User Mood Analytics</h3> */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="emotion" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default UserMoodChart;
