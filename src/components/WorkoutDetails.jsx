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
      console.log(response.data)
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
                console.log(workout.exercises[index])
                console.log(exercise.exercise)

  // Check if exercise is null or not
  const currentExercise = exercise.exercise;
                // <li key={index} className="text-gray-600">
                //   <strong className="font-semibold">{'Exercise'}</strong>
                //   <ul className="list-inside mt-2">
                //     {exercise.sets.map((set, setIndex) => (
                //       <li key={setIndex} className="text-gray-500">
                //         <strong>Set {setIndex + 1}:</strong> {set.reps} reps at {set.weight} kg
                //       </li>
                //     ))}
                //   </ul>
                // </li>
                return(
                  <li key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* Check if the exercise data exists */}
      {currentExercise ? (
        <>
          <h3 className="text-2xl font-semibold text-gray-800">{currentExercise.name}</h3>
          <p className="mt-2 text-gray-600">{currentExercise.description}</p>
          <p className="mt-1 text-sm text-gray-500">
            <strong>Equipment:</strong> {currentExercise.equipment}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            <strong>Muscle Group:</strong> {
              Array.isArray(currentExercise.muscleGroup) && currentExercise.muscleGroup.length > 0
              ? currentExercise.muscleGroup.join(', ') // If it's an array, join the items
              : typeof currentExercise.muscleGroup === 'string' && currentExercise.muscleGroup.trim() !== ''
              ? currentExercise.muscleGroup // If it's a non-empty string, display it as is
              : 'N/A' // If it's anything else, show 'N/A'
            // currentExercise.muscleGroup !=[] && currentExercise.muscleGroup
            }
          </p>

          {/* Render image if available */}
          {currentExercise.imageUrl && currentExercise.imageUrl != "" && (
            <img 
              src={currentExercise.imageUrl} 
              alt={currentExercise.name} 
              className="w-full mt-4 rounded-lg shadow-lg"
            />
          )}

          {/* Sets */}
          <ul className="list-inside mt-4">
            {exercise.sets.map((set, setIndex) => (
              <li key={setIndex} className="bg-gray-100 p-2 rounded-lg mb-2">
                <strong>Set {setIndex + 1}:</strong> 
                <span className="text-gray-800"> {set.reps} reps</span> 
                at 
                <span className="font-semibold text-gray-800"> {set.weight} kg</span>
                {set.duration && (
                  <span className="text-gray-500 ml-2">Duration: {set.duration} seconds</span>
                )}
                {set.restAfter && (
                  <span className="text-gray-500 ml-2">Rest: {set.restAfter} seconds</span>
                )}
              </li>
            ))}
          </ul>

          {/* YouTube Link (if available) */}
          {currentExercise.youtubeLink !== 'none' && (
            <div className="mt-4">
              <a
                href={currentExercise.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Watch Tutorial
              </a>
            </div>
          )}
        </>
      ) : (
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
      )}
    </li>
              )})}
            </ul>
          </div>
        </div>

        {/* Action Button */}
        {/* <div className="mt-6 text-center">
          <Link
            to={`/update-workout/${id}`}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium transition-all hover:bg-blue-500"
          >
            Update Workout
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default WorkoutDetails;
