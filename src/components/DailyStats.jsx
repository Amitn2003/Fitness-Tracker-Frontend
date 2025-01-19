import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const AUTH_HEADERS = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};
const DailyStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDailyStats = async () => {
      try {
        const response = await axios.get(API_URL+'/api/analytics/daily-stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching daily stats:', error);
      }
    };

    fetchDailyStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  const data = [
    { name: 'Workout Time', value: stats.totalDuration },
    { name: 'Rest of Day', value: 1440 - stats.totalDuration } // 1440 minutes in a day
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daily Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg">Total Workouts: <span className="font-bold">{stats.totalWorkouts}</span></p>
          <p className="text-lg">Total Duration: <span className="font-bold">{stats.totalDuration} minutes</span></p>
          <p className="text-lg">Average Feeling: <span className="font-bold">{stats.averageFeelingRating.toFixed(1)}/5</span></p>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyStats;
