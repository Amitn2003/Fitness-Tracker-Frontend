import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL;
const WorkoutStreak = () => {
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    const fetchWorkoutStreak = async () => {
      try {
        const response = await axios.get(API_URL+'/api/analytics/workout-streak', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response)
        setStreak(response.data.streak);
      } catch (error) {
        console.error('Error fetching workout streak:', error);
      }
    };

    fetchWorkoutStreak();
  }, []);

  if (streak === null) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Workout Streak</h2>
      <div className="text-6xl font-bold text-blue-600">{streak}</div>
      <p className="text-xl mt-2">days</p>
    </div>
  );
};

export default WorkoutStreak;
