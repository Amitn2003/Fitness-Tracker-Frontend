import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateWorkout = () => {
  const { id } = useParams();
  const [workoutData, setWorkoutData] = useState({
    duration: 0,
    notes: "",
    feelingRating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(workoutData)
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/workouts/${id}`, workoutData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Workout updated successfully!");
    } catch (error) {
      console.error("Error updating workout:", error);
      alert("Failed to update workout.");
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`/workouts/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setWorkoutData({
          duration: response.data.duration,
          notes: response.data.notes,
          feelingRating: response.data.feelingRating,
        });
      } catch (error) {
        console.error("Error fetching workout details:", error);
      }
    };
    fetchWorkout();
  }, [id]);

  return (
    <div>
      <h2>Update Workout</h2>
      <form>
        <input
          type="number"
          name="duration"
          placeholder="Duration"
          value={workoutData.duration}
          onChange={handleInputChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={workoutData.notes}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="number"
          name="feelingRating"
          placeholder="Feeling Rating"
          value={workoutData.feelingRating}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSubmit}>
          Update Workout
        </button>
      </form>
    </div>
  );
};

export default UpdateWorkout;
