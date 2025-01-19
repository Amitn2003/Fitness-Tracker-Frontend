import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const ExerciseFrequency = () => {
  const [frequency, setFrequency] = useState([]);

  useEffect(() => {
    const fetchExerciseFrequency = async () => {
      try {
        const response = await axios.get(API_URL+'/api/analytics/exercise-frequency', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFrequency(response.data);
      } catch (error) {
        console.error('Error fetching exercise frequency:', error);
      }
    };

    fetchExerciseFrequency();
  }, []);

  if (frequency.length === 0) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Exercise Frequency</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={frequency}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExerciseFrequency;
