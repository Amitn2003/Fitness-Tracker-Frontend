import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/workouts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data)
      console.log(response.data.workouts)
      setWorkouts(response.data.workouts);
    } catch (error) {
      console.error("Error fetching workout history:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // <div>
  //   <h2>Workout History</h2>
  //   <ul>
  //     {workouts.map((workout) => (
  //       <li key={workout._id}>
  //         <Link to={`/workout-details/${workout._id}`}>
  //           {workout.routine.name} - {workout.duration} mins
  //         </Link>
  //       </li>
  //     ))}
  //   </ul>
  // </div>
  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Workout History</h2>
        <ul className="space-y-6">
          {workouts.map((workout) => (
            <li key={workout._id} className="border-b border-gray-200 pb-6">
              {/* Workout Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Routine:</h3>
                <p className="text-gray-600">{workout.routine.name}</p>
              </div>

              <div className="mt-2">
                <h3 className="text-xl font-semibold text-gray-700">Duration:</h3>
                <p className="text-gray-600">{workout.duration} mins</p>
              </div>

              <div className="mt-2">
                <h3 className="text-xl font-semibold text-gray-700">Date:</h3>
                <p className="text-gray-600">{new Date(workout.date).toLocaleString()}</p>
              </div>

              {/* Exercises and Sets */}
              {workout.exercises && workout.exercises.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-700">Exercises:</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    {workout.exercises.map((exercise, index) => (
                      <li key={index} className="text-gray-600">
                        <strong className="font-semibold">{exercise.exercise ? exercise.exercise.name : "Exercise not defined"}</strong>
                        {exercise.sets && exercise.sets.length > 0 && (
                          <ul className="list-inside mt-2 text-gray-500">
                            {exercise.sets.map((set, setIndex) => (
                              <li key={setIndex}>
                                Set {setIndex + 1}: {set.reps} reps at {set.weight} kg, Rest: {set.restAfter} sec
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Details */}
              <div className="mt-4 text-center">
                <Link
                  to={`/workout-details/${workout._id}`}
                  className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-500 transition-all"
                >
                  View Workout Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutHistory;
