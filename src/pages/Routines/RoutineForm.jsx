import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const CreateRoutine = () => {
  const { token } = useAuth();
  const [routineData, setRoutineData] = useState({
    name: "",
    description: "",
    exercises: [{ exercise: "", sets: 1, reps: 1, restBetweenSets: 30 }],
    difficulty: "Intermediate",
    estimatedDuration: 60,
    targetMuscleGroups: [],
    workoutType: "Strength",
    equipment: [],
    tags: [],
    isPublic: true,
  });

  const [exercisesList, setExercisesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch exercises on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exercises`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await response.json();
        console.log(data)
        setExercisesList(data.exercises || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [token]);

  // Handle change for fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle multiple selection for checkboxes
      setRoutineData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setRoutineData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle exercise selection and update fields
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...routineData.exercises];
    
    // Convert value to a number if it's a set or rep field
    if (field === 'sets' || field === 'reps') {
      value = parseInt(value, 10);
    }
  
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };
  
    setRoutineData((prevData) => ({
      ...prevData,
      exercises: updatedExercises,
    }));
  };
  

  // Add a new exercise
  const addExercise = () => {
    setRoutineData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, { exercise: "", sets: 1, reps: 1, restBetweenSets: 30 }],
    }));
  };

  // Remove an exercise
  const removeExercise = (index) => {
    const updatedExercises = routineData.exercises.filter((_, i) => i !== index);
    setRoutineData((prevData) => ({
      ...prevData,
      exercises: updatedExercises,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert sets and reps to numbers before sending the data
    const updatedExercises = routineData.exercises.map((exercise) => ({
      ...exercise,
      sets: parseInt(exercise.sets, 10),
      reps: parseInt(exercise.reps, 10),
    }));
  
    const updatedRoutineData = {
      ...routineData,
      exercises: updatedExercises,
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/routines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRoutineData),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create routine");
      }
  
      toast.success("Routine created successfully!");
      // Reset form
      setRoutineData({
        name: "",
        description: "",
        exercises: [{ exercise: "", sets: 1, reps: 1, restBetweenSets: 30 }],
        difficulty: "Intermediate",
        estimatedDuration: 60,
        targetMuscleGroups: [],
        workoutType: "Strength",
        equipment: [],
        tags: [],
        isPublic: true,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  

 



  return (
    <form onSubmit={handleSubmit}  className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center">Create Your Routine</h2>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={routineData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

       {/* Description */}
       <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={routineData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          name="difficulty"
          value={routineData.difficulty}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Estimated Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Estimated Duration (minutes)</label>
        <input
          type="number"
          name="estimatedDuration"
          value={routineData.estimatedDuration}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          min={1}
          required
        />
      </div>

      {/* Target Muscle Groups (Checkboxes) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Target Muscle Groups</label>
        <div className="space-x-3">
          {[ "Legs", "Chest", "Back", "Arms", "Shoulders", "Core", "Glutes", "Traps", "Calves",
  "Forearms", "Abs", "Hip Flexors", "Lats", "Upper Back", "Lower Back", "Obliques",
  "Neck", "Adductors", "Abductors", "Biceps", "Triceps", "Quadriceps"].map((muscle) => (
            <label key={muscle} className="inline-flex items-center">
              <input
                type="checkbox"
                name="targetMuscleGroups"
                value={muscle}
                checked={routineData.targetMuscleGroups.includes(muscle)}
                onChange={handleChange}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">{muscle}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Workout Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Workout Type</label>
        <select
          name="workoutType"
          value={routineData.workoutType}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Balance">Balance</option>
        </select>
      </div>

      {/* Equipment (Checkboxes) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Equipment</label>
        <div className="space-x-3">
          {["Barbell", "Dumbbells", "Bench", "Kettlebells", "Bodyweight", "Resistance Bands", 
  "TRX", "Pull-Up Bar", "Medicine Ball", "Leg Press", "Cable Machine", "Jump Rope", 
  "Exercise Ball", "Smith Machine", "Battle Ropes", "Bosu Ball", "Rowing Machine", 
  "Stationary Bike", "Treadmill", "Suspension Trainer", "Ab Wheel", "Parallel Bars", 
  "Vibration Plate", "Exercise Mat", "Foam Roller"].map((equipment) => (
            <label key={equipment} className="inline-flex items-center">
              <input
                type="checkbox"
                name="equipment"
                value={equipment}
                checked={routineData.equipment.includes(equipment)}
                onChange={handleChange}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">{equipment}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          name="tags"
          value={routineData.tags}
          onChange={(e) =>
            setRoutineData((prevData) => ({
              ...prevData,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            }))
          }
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Comma-separated tags (e.g., Full Body, Strength Training)"
        />
      </div>

      {/* Exercises */}
      {/* <div>
        <label>Exercises</label>
        {routineData.exercises.map((exercise, index) => (
          <div key={index}>
            <select
              value={exercise.exercise}
              onChange={(e) => handleExerciseChange(index, "exercise", e.target.value)}
              required
            >
              <option value="">Select Exercise</option>
              {exercisesList.map((ex) => (
                <option key={ex._id} value={ex._id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
              min={1}
              required
            />
            <input
              type="number"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
              min={1}
              required
            />
            <button type="button" onClick={() => removeExercise(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addExercise}>
          Add Exercise
        </button>
      </div> */}


{/* Exercises */}
<div>
        <label className="block text-sm font-medium text-gray-700">Exercises</label>
        {routineData.exercises.map((exercise, index) => (
          <div key={index} className="flex items-center space-x-3 mb-3">
            <select
              value={exercise.exercise}
              onChange={(e) => handleExerciseChange(index, "exercise", e.target.value)}
              className="p-2 w-1/2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Exercise</option>
              {exercisesList.map((ex) => (
                <option key={ex._id} value={ex._id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
              className="p-2 w-1/6 border border-gray-300 rounded-md"
              min={1}
              required
            />
            <input
              type="number"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
              className="p-2 w-1/6 border border-gray-300 rounded-md"
              min={1}
              required
            />
            <button
              type="button"
              onClick={() => removeExercise(index)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExercise}
          className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Add Exercise
        </button>
      </div>


      {/* Submit Button */}
     <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
        >
          {loading ? "Loading..." : "Create Routine"}
        </button>
      </div>
    </form>
  );
};

export default CreateRoutine;
