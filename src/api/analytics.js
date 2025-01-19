import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const AUTH_HEADERS = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

// Fetch Daily Workout Statistics
export const getDailyStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/daily-stats`, AUTH_HEADERS);
    console.log(response, API_URL)
    return response.data;
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    return null;
  }
};

// Fetch Workout Streak
export const getWorkoutStreak = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/workout-streak`, AUTH_HEADERS);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching workout streak:", error);
    return null;
  }
};

// Fetch Exercise Frequency
export const getExerciseFrequency = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/exercise-frequency`, AUTH_HEADERS);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching exercise frequency:", error);
    return [];
  }
};

// Fetch Progress Over Time
export const getProgressOverTime = async (exerciseId) => {
  try {
    console.log(`${API_URL}/analytics/progress/${exerciseId}`)
    const response = await axios.get(`${API_URL}/analytics/progress/${exerciseId}`, AUTH_HEADERS);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching progress over time:", error);
    return [];
  }
};



export const getAnalyticsData = async () => {
  try {
    const [dailyStats, workoutStreak, exerciseFrequency, progress] = await Promise.all([
      axios.get(`${API_URL}/analytics/daily-stats`),
      axios.get(`${API_URL}/analytics/workout-streak`),
      axios.get(`${API_URL}/analytics/exercise-frequency`),
      axios.get(`${API_URL}/analytics/progress/your-exercise-id`), // Replace with dynamic ID
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
