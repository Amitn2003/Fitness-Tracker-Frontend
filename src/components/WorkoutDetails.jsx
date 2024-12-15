import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  const fetchWorkoutDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/workouts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response)
      setWorkout(response.data);
    } catch (error) {
      console.error("Error fetching workout details:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutDetails();
  }, [id]);

  if (!workout) return <div>Loading...</div>;

  // <div>
  //   <h2>Workout Details</h2>
  //   <p>Routine: {workout.routine.name}</p>
  //   <p>Duration: {workout.duration} mins</p>
  //   <p>Notes: {workout.notes}</p>
  //   <Link to={`/update-workout/${id}`}>Update Workout</Link>
  // </div>
  return (
    <div className="flex justify-center py-8 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Workout Details</h2>

        <div className="space-y-6">
          {/* Routine Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Routine:</h3>
            <p className="text-gray-600">{workout.routine.name}</p>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Description:</h3>
            <p className="text-gray-600">{workout.routine.description}</p>
          </div>

          {/* Duration Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Duration:</h3>
            <p className="text-gray-600">{workout.duration} mins</p>
          </div>

          {/* Notes Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Notes:</h3>
            <p className="text-gray-600">{workout.notes || 'No additional notes'}</p>
          </div>

          {/* Exercises Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Exercises:</h3>
            <ul className="list-disc pl-6 space-y-3">
              {workout.exercises.map((exercise, index) => {
                console.log(exercise._id)
                return(
                <li key={index} className="text-gray-600">
                  <strong className="font-semibold">{'Exercise'}</strong>
                  <ul className="list-inside mt-2">
                    {exercise.sets.map((set, setIndex) => (
                      <li key={setIndex} className="text-gray-500">
                        <strong>Set {setIndex + 1}:</strong> {set.reps} reps at {set.weight} kg
                      </li>
                    ))}
                  </ul>
                </li>
              )})}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <Link
            to={`/update-workout/${id}`}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium transition-all hover:bg-blue-500"
          >
            Update Workout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
