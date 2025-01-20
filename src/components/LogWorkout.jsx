
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LogWorkout = () => {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState(null);
  const [workoutData, setWorkoutData] = useState({
    duration: 0,
    exercises: [],
    notes: "",
    feelingRating: 0,
    location: "",
    weather: "",
    photoUrl: "",
  });
  const [errors, setErrors] = useState({});


  const [exerciseDetails, setExerciseDetails] = useState({});

  const [exerciseOptions, setExerciseOptions] = useState([]);

  const fetchExerciseOptions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/exercises`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response)
      setExerciseOptions(response.data.exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const fetchRoutineDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/routines/${routineId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.exercises)
      setRoutine(response.data);
      setWorkoutData((prev) => ({
        ...prev,
        exercises: response.data.exercises.map((exercise) => ({
          exercise: exercise._id,
          exerciseall: exercise,
          sets: [],
        })),
      }));
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  };

  const handleAddSet = (exerciseIndex) => {
    // const updatedExercises = [...workoutData.exercises];
    // updatedExercises[exerciseIndex].sets.push({
    //   weight: 0,
    //   reps: 0,
    //   duration: 0,
    //   restAfter: 0,
    // });
    
    // setWorkoutData({ ...workoutData, exercises: updatedExercises });
    const updatedExercises = [...workoutData.exercises];
  updatedExercises[exerciseIndex].sets.push({
    weight: 0,
    reps: 0,
    duration: 0,
    restAfter: 0,
  });

  // Recalculate the total duration after adding a set
  const totalDuration = updatedExercises.reduce((total, exercise) => {
    return total + exercise.sets.reduce((setTotal, set) => setTotal + (set.duration || 0), 0);
  }, 0);

  // Update workoutData with new total duration
  setWorkoutData({ ...workoutData, exercises: updatedExercises, duration: totalDuration });
  };

  const handleRemoveSet = (exerciseIndex, setIndex) => {
    // const updatedExercises = [...workoutData.exercises];
    // updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    // setWorkoutData({ ...workoutData, exercises: updatedExercises });
    const updatedExercises = [...workoutData.exercises];
  updatedExercises[exerciseIndex].sets.splice(setIndex, 1);

  // Recalculate the total duration after removing a set
  const totalDuration = updatedExercises.reduce((total, exercise) => {
    return total + exercise.sets.reduce((setTotal, set) => setTotal + (set.duration || 0), 0);
  }, 0);

  // Update workoutData with new total duration
  setWorkoutData({ ...workoutData, exercises: updatedExercises, duration: totalDuration });
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    // const updatedExercises = [...workoutData.exercises];
    // updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    // setWorkoutData({ ...workoutData, exercises: updatedExercises });
    const updatedExercises = [...workoutData.exercises];
  updatedExercises[exerciseIndex].sets[setIndex][field] = value;

  // Recalculate the total duration after a change in any set
  const totalDuration = updatedExercises.reduce((total, exercise) => {
    return total + exercise.sets.reduce((setTotal, set) => setTotal + (set.duration || 0), 0);
  }, 0);

  // Update workoutData with new total duration
  setWorkoutData({ ...workoutData, exercises: updatedExercises, duration: totalDuration });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleSubmit = async () => {
    let validationErrors = {};

  // Validate Exercises
  workoutData.exercises.forEach((exercise, exerciseIndex) => {
    exercise.sets.forEach((set, setIndex) => {
      if (!set.weight || set.weight <= 0) {
        validationErrors[`weight-${exerciseIndex}-${setIndex}`] = "Weight is required and must be greater than 0.";
      }
      if (!set.reps || set.reps <= 0) {
        validationErrors[`reps-${exerciseIndex}-${setIndex}`] = "Reps are required and must be greater than 0.";
      }
      if (!set.duration || set.duration <= 0) {
        validationErrors[`duration-${exerciseIndex}-${setIndex}`] = "Duration is required and must be greater than 0.";
      }
    });
  });

  // Validate Feeling Rating
  if (!workoutData.feelingRating || workoutData.feelingRating < 1 || workoutData.feelingRating > 5) {
    validationErrors.feelingRating = "Feeling Rating is required (1-5).";
  }

  // Stop submission if there are validation errors
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    alert("Please correct the errors before submitting.");
    return;
  }

  // Clear errors if validation passes
  setErrors({});
    try {
      const payload = {
        routine: routineId,
        duration: Number(workoutData.duration),
        exercises: workoutData.exercises.map((exercise) => ({
          exercise: exercise.exercise,
          sets: exercise.sets.map((set) => ({
            weight: Number(set.weight),
            reps: Number(set.reps),
            duration: set.duration ? Number(set.duration) : undefined,
            restAfter: set.restAfter ? Number(set.restAfter) : undefined,
          })),
        })),
        notes: workoutData.notes || undefined,
        feelingRating: Number(workoutData.feelingRating),
        location: workoutData.location || undefined,
        weather: workoutData.weather || undefined,
        photoUrl: workoutData.photoUrl || undefined,
      };
      console.log(payload)

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/workouts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log workout.");
      }

      const result = await response.json();
      alert("Workout logged successfully!");
      const updateWorkoutStreak = () => {
        const today = new Date().toDateString();
        let streakData = JSON.parse(localStorage.getItem("workoutStreak")) || { streak: 0, total: 0, lastDate: "" };
      
        if (streakData.lastDate !== today) {
          streakData.streak += 1;
          streakData.total += 1;
          streakData.lastDate = today;
          localStorage.setItem("workoutStreak", JSON.stringify(streakData));
        }
      };
      
      updateWorkoutStreak(); // Call this when a workout is completed
      
      console.log("Workout logged:", result);
    } catch (error) {
      console.error("Error logging workout:", error);
      alert(error.message || "Failed to log workout.");
    }
  };

  const fetchExerciseDetails = async (exercises) => {
    setExerciseDetails(exercises)
    // console.log(exercises)
  };


  useEffect(() => {
    fetchExerciseOptions();
    fetchRoutineDetails();
  }, [routineId]);
  useEffect(() => {
    if (routine) {
      fetchExerciseDetails(routine.exercises); // Fetch details for each exercise
    }
  }, [routine]);
  console.log(workoutData.exercises)
  console.log()
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Log Workout for Routine: {routine?.name}</h2>
      <form>
        Total Duration : 
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {workoutData.exercises.map((exercise, exerciseIndex) => {
          console.log(exercise.exerciseall, exerciseIndex)
          const { name, description, difficulty, instructions, tips, youtubeLink, workoutType, equipment } = exercise.exerciseall.exercise;
          // fetch from backend and show data ...
          // console.log("Exercise Name ", exercise.exerciseall.exercise.name)
          // console.log("Exercise Description ", exercise.exerciseall.exercise.description)
          // console.log("Exercise Difficulty ", exercise.exerciseall.exercise.difficulty)
          console.log("Exercise Instructions array ", exercise.exerciseall.exercise.instructions, instructions)
          // console.log("Exercise Tips array ", exercise.exerciseall.exercise.tips)
          console.log("Exercise YT Link ", exercise.exerciseall.exercise.youtubeLink)
          // console.log("Exercise Workout Type ", exercise.exerciseall.exercise.workoutType)
          // console.log("Exercise Equipment ", exercise.exerciseall.exercise.equipment)
          return (
            <div key={exerciseIndex} className="border p-4 rounded-lg bg-gray-50 shadow-md space-y-4" >
              {/* <p className="inline">{exerciseIndex + 1}. </p>
              <p className="inline">{exercise.exerciseall.exercise.name}</p>
              <p>{exercise.exerciseall.exercise.description}</p>
              <p>{exercise.exerciseall.exercise.difficulty}</p>
               */}

              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">{exerciseIndex + 1}. {name}</p>
                {/* You can later add an icon here */}
                <p className="text-sm text-gray-500">{difficulty}</p>
              </div>
              <p className="text-gray-700">{description}</p>

              {instructions.length > 0 && <div>
                <p className="font-semibold">Instructions:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  {instructions?.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              </div>}

              {tips.length > 0 && <div>
                <p className="font-semibold">Tips:</p>
                <ul className="list-disc pl-6 text-gray-600">
                  {tips?.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>}

              <div>
                {workoutType && <p className="font-semibold">Workout Type: {workoutType}</p>}
                {equipment && <p className="font-semibold">Equipment: {equipment}</p>}
                {youtubeLink && youtubeLink != "none" && (
                  <p className="text-blue-500 underline">
                    <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                      Watch Demo Video
                    </a>
                  </p>
                )}
              </div>


              {exercise.sets.map((set, setIndex) => {
                console.log(set)
                return (
                  <div key={setIndex} className="space-y-4 border p-4 rounded-lg bg-white shadow-md">
                    {/* Weight : 
                    <input
                      type="number"
                      placeholder="Weight"
                      value={set.weight}
                      onChange={(e) =>
                        handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)
                      }
                    />
                    <br />
                    Reps : 
                    <input
                      type="number"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(e) =>
                        handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)
                      }
                    />
                    <br />
                    Duration : 
                    <input
                      type="number"
                      placeholder="Duration (seconds)"
                      value={set.duration}
                      onChange={(e) =>
                        handleSetChange(exerciseIndex, setIndex, "duration", e.target.value)
                      }
                    />
                    <br />
                    Rest time : 
                    <input
                      type="number"
                      placeholder="Rest After (seconds)"
                      value={set.restAfter}
                      onChange={(e) =>
                        handleSetChange(exerciseIndex, setIndex, "restAfter", e.target.value)
                      }
                    />
                    <br />
                    <button type="button" onClick={() => handleRemoveSet(exerciseIndex, setIndex)}>
                      Remove Set
                    </button> */}

                    {/* <div className="flex justify-between items-center">
                      <label className="font-semibold text-gray-700">Weight (kg)</label>
                      <input
                        type="number"
                        placeholder="Weight"
                        value={set.weight}
                        onChange={(e) =>
                          handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)
                        }
                        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <label className="font-semibold text-gray-700">Reps</label>
                      <input
                        type="number"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)
                        }
                        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <label className="font-semibold text-gray-700">Duration (seconds)</label>
                      <input
                        type="number"
                        placeholder="Duration"
                        value={set.duration}
                        onChange={(e) =>
                          handleSetChange(exerciseIndex, setIndex, "duration", e.target.value)
                        }
                        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <label className="font-semibold text-gray-700">Rest After (seconds)</label>
                      <input
                        type="number"
                        placeholder="Rest After"
                        value={set.restAfter}
                        onChange={(e) =>
                          handleSetChange(exerciseIndex, setIndex, "restAfter", e.target.value)
                        }
                        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                        className="text-red-500 hover:text-red-700 text-sm mt-2 focus:outline-none"
                      >
                        Remove Set
                      </button>
                    </div> */}
                    <div className="flex justify-between items-center">
      <label className="font-semibold text-gray-700">Weight (kg)</label>
      <input
        type="number"
        placeholder="Weight"
        value={set.weight}
        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)}
        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {errors[`weight-${exerciseIndex}-${setIndex}`] && (
      <p className="text-red-500 text-sm">{errors[`weight-${exerciseIndex}-${setIndex}`]}</p>
    )}

    <div className="flex justify-between items-center">
      <label className="font-semibold text-gray-700">Reps</label>
      <input
        type="number"
        placeholder="Reps"
        value={set.reps}
        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)}
        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {errors[`reps-${exerciseIndex}-${setIndex}`] && (
      <p className="text-red-500 text-sm">{errors[`reps-${exerciseIndex}-${setIndex}`]}</p>
    )}

    <div className="flex justify-between items-center">
      <label className="font-semibold text-gray-700">Duration (seconds)</label>
      <input
        type="number"
        placeholder="Duration"
        value={set.duration}
        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "duration", e.target.value)}
        className="p-3 w-1/3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {errors[`duration-${exerciseIndex}-${setIndex}`] && (
      <p className="text-red-500 text-sm">{errors[`duration-${exerciseIndex}-${setIndex}`]}</p>
    )}


                  </div>
                )
              })}
              <button
            type="button"
            onClick={() => handleAddSet(exerciseIndex)}
            className="bg-blue-500 text-white p-2 rounded-lg w-full mt-4 hover:bg-blue-600"
          >
            Add Set
          </button>
            </div>
          )
        })}
        {/* Notes Input */}
    <div>
      <textarea
        name="notes"
        placeholder="Notes"
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
        {/* Feeling Rating Input */}
    <div>
      <input
        type="number"
        name="feelingRating"
        placeholder="Feeling Rating (1-5)"
        onChange={handleInputChange} required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.feelingRating && <p className="text-red-500 text-sm">{errors.feelingRating}</p>}
    </div>
         {/* Location Input */}
    <div>
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
        {/* Weather Input */}
    {/* <div>
      <input
        type="text"
        name="weather"
        placeholder="Weather"
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div> */}
        {/* Photo URL Input */}
    <div>
      <input
        type="url"
        name="photoUrl"
        placeholder="Photo URL"
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Submit Button */}
        <div className="mt-6" >
        <button type="button" onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
          Submit Workout
        </button>
          </div>
      </form>
    </div>
  );
};

export default LogWorkout;
