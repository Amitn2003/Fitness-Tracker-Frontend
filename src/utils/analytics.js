import axios from 'axios';

const API_URL = 'https://fitz-backend.vercel.app'; // Update with your backend URL

export const getAnalyticsData = async () => {
  try {
    const [dailyStats, workoutStreak, exerciseFrequency, progress] = await Promise.all([
      axios.get(`${API_URL}/api/analytics/daily-stats`),
      axios.get(`${API_URL}/api/analytics/workout-streak`),
      axios.get(`${API_URL}/api/analytics/exercise-frequency`),
      axios.get(`${API_URL}/api/analytics/progress/your-exercise-id`), // Replace with dynamic ID
    ]);

    return {
      dailyStats: dailyStats.data || { totalWorkouts: 0, totalDuration: 0, averageFeelingRating: 0 },
      workoutStreak: workoutStreak.data?.streak || 0,
      exerciseFrequency: exerciseFrequency.data || [],
      progress: progress.data || [],
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      dailyStats: { totalWorkouts: 0, totalDuration: 0, averageFeelingRating: 0 },
      workoutStreak: 0,
      exerciseFrequency: [],
      progress: [],
    };
  }
};
