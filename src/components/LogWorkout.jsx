import React, { useState } from "react";
import axios from "axios";

const LogWorkout = () => {
  const [workoutData, setWorkoutData] = useState({
    routine: "",
    duration: 0,
    exercises: [],
    notes: "",
    feelingRating: 0,
    location: "",
    weather: "",
    photoUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/workouts", workoutData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Workout logged successfully!");
    } catch (error) {
      console.error("Error logging workout:", error);
      alert("Failed to log workout.");
    }
  };

  return (
    <div>
      <h2>Log Workout</h2>
      <form>
        <input
          type="text"
          name="routine"
          placeholder="Routine ID"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (in minutes)"
          onChange={handleInputChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          name="feelingRating"
          placeholder="Feeling Rating (1-5)"
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Submit Workout
        </button>
      </form>
    </div>
  );
};

export default LogWorkout;
