import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get("/workouts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <h2>Workout History</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <Link to={`/workout-details/${workout._id}`}>
              {workout.routine.name} - {workout.duration} mins
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutHistory;
