// ListeningMinutesChart.js
/*
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot
} from 'recharts';

const ListeningMinutesChart = ({ listeningMinutesData }) => {
  return (
    <div style={{ width: '100%', height: 300, backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
      <h3 style={{ textAlign: 'center', color: '#000' }}>Daily Listening Time (in Minutes)</h3>
      <ResponsiveContainer>
        <LineChart data={listeningMinutesData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#ff3c3c"
            strokeWidth={3}
            dot={{ stroke: '#ff3c3c', strokeWidth: 2, r: 5, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ListeningMinutesChart;*/
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import './ListeningMinutesChart.css';

function ListeningMinutesChart({ listeningMinutesData }) {
  return (
    <div className="chart-container">
      <h3>Daily Listening Time (in Minutes)</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={listeningMinutesData}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="linear"
              dataKey="minutes"
              stroke="#ff4d4f"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ListeningMinutesChart;



