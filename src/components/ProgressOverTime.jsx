import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const ProgressOverTime = ({ exerciseId }) => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgressOverTime = async () => {
      try {
        const response = await axios.get(API_URL+`/api/analytics/progress/${exerciseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(API_URL+`/api/analytics/progress/${exerciseId}`, response)
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching progress over time:', error);
      }
    };

    fetchProgressOverTime(exerciseId);
  }, [exerciseId]);

  if (progress.length === 0) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Progress Over Time</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="maxWeight" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="totalReps" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressOverTime;
