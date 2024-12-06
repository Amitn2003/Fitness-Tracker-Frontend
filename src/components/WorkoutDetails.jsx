import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  const fetchWorkoutDetails = async () => {
    try {
      const response = await axios.get(`/workouts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWorkout(response.data);
    } catch (error) {
      console.error("Error fetching workout details:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutDetails();
  }, [id]);

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <h2>Workout Details</h2>
      <p>Routine: {workout.routine.name}</p>
      <p>Duration: {workout.duration} mins</p>
      <p>Notes: {workout.notes}</p>
      <Link to={`/update-workout/${id}`}>Update Workout</Link>
    </div>
  );
};

export default WorkoutDetails;
