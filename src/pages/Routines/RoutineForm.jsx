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
    const { name, value } = e.target;
    setRoutineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle exercise selection and update fields
  const handleExerciseChange = (index, exerciseId) => {
    const selectedExercise = exercisesList.find((ex) => ex._id === exerciseId);

    const updatedExercises = [...routineData.exercises];
    updatedExercises[index] = {
      exercise: exerciseId,
      sets: 1,
      reps: 1,
      restBetweenSets: 30,
      ...(selectedExercise ? { description: selectedExercise.description } : {}),
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
    console.log(routineData)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/routines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routineData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error)
        throw new Error(error.message || "Failed to create routine");
      }

      const data = await response.json();
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

  // <form onSubmit={handleSubmit}>
  //   <div>
  //     <label>Name</label>
  //     <input
  //       type="text"
  //       name="name"
  //       value={routineData.name}
  //       onChange={handleChange}
  //       required
  //     />
  //   </div>

  //   <div>
  //     <label>Description</label>
  //     <textarea
  //       name="description"
  //       value={routineData.description}
  //       onChange={handleChange}
  //       required
  //     />
  //   </div>

  //   <div>
  //     <label>Difficulty</label>
  //     <select name="difficulty" value={routineData.difficulty} onChange={handleChange}>
  //       <option value="Beginner">Beginner</option>
  //       <option value="Intermediate">Intermediate</option>
  //       <option value="Advanced">Advanced</option>
  //     </select>
  //   </div>

  //   <div>
  //     <label>Exercises</label>
  //     {routineData.exercises.map((exercise, index) => (
  //       <div key={index}>
  //         <select
  //           value={exercise.exercise}
  //           onChange={(e) => handleExerciseChange(index, e.target.value)}
  //           required
  //         >
  //           <option value="">Select Exercise</option>
  //           {exercisesList.map((ex) => (
  //             <option key={ex._id} value={ex._id}>
  //               {ex.name}
  //             </option>
  //           ))}
  //         </select>
  //         <input
  //           type="number"
  //           name="sets"
  //           placeholder="Sets"
  //           value={exercise.sets}
  //           onChange={(e) => handleExerciseChange(index, e.target.value)}
  //           min={1}
  //           required
  //         />
  //         <input
  //           type="number"
  //           name="reps"
  //           placeholder="Reps"
  //           value={exercise.reps}
  //           onChange={(e) => handleExerciseChange(index, e.target.value)}
  //           min={1}
  //           required
  //         />
  //         <button type="button" onClick={() => removeExercise(index)}>
  //           Remove
  //         </button>
  //       </div>
  //     ))}
  //     <button type="button" onClick={addExercise}>
  //       Add Exercise
  //     </button>
  //   </div>

  //   <div>
  //     <button type="submit" disabled={loading}>
  //       {loading ? "Loading..." : "Create Routine"}
  //     </button>
  //   </div>
  // </form>
  return (
    <form onSubmit={handleSubmit}>
  {/* Name */}
  <div>
    <label>Name</label>
    <input
      type="text"
      name="name"
      value={routineData.name}
      onChange={handleChange}
      required
    />
  </div>

  {/* Description */}
  <div>
    <label>Description</label>
    <textarea
      name="description"
      value={routineData.description}
      onChange={handleChange}
      required
    />
  </div>

  {/* Difficulty */}
  <div>
    <label>Difficulty</label>
    <select name="difficulty" value={routineData.difficulty} onChange={handleChange}>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  </div>

  {/* Estimated Duration */}
  <div>
    <label>Estimated Duration (minutes)</label>
    <input
      type="number"
      name="estimatedDuration"
      value={routineData.estimatedDuration}
      onChange={handleChange}
      min={1}
      required
    />
  </div>

  {/* Target Muscle Groups */}
  <div>
    <label>Target Muscle Groups</label>
    <select
      name="targetMuscleGroups"
      value={routineData.targetMuscleGroups}
      onChange={(e) =>
        setRoutineData((prevData) => ({
          ...prevData,
          targetMuscleGroups: Array.from(e.target.selectedOptions, (option) => option.value),
        }))
      }
      multiple
    >
      <option value="Legs">Legs</option>
      <option value="Chest">Chest</option>
      <option value="Back">Back</option>
      <option value="Arms">Arms</option>
      <option value="Shoulders">Shoulders</option>
      <option value="Core">Core</option>
    </select>
  </div>

  {/* Workout Type */}
  <div>
    <label>Workout Type</label>
    <select name="workoutType" value={routineData.workoutType} onChange={handleChange}>
      <option value="Strength">Strength</option>
      <option value="Cardio">Cardio</option>
      <option value="Flexibility">Flexibility</option>
      <option value="Balance">Balance</option>
    </select>
  </div>

  {/* Equipment */}
  <div>
    <label>Equipment</label>
    <select
      name="equipment"
      value={routineData.equipment}
      onChange={(e) =>
        setRoutineData((prevData) => ({
          ...prevData,
          equipment: Array.from(e.target.selectedOptions, (option) => option.value),
        }))
      }
      multiple
    >
      <option value="Barbell">Barbell</option>
      <option value="Dumbbells">Dumbbells</option>
      <option value="Bench">Bench</option>
      <option value="Kettlebells">Kettlebells</option>
      <option value="Bodyweight">Bodyweight</option>
    </select>
  </div>

  {/* Tags */}
  <div>
    <label>Tags</label>
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
      placeholder="Comma-separated tags (e.g., Full Body, Strength Training)"
    />
  </div>

  {/* Exercises */}
  <div>
    <label>Exercises</label>
    {routineData.exercises.map((exercise, index) => (
      <div key={index}>
        <select
          value={exercise.exercise}
          onChange={(e) => handleExerciseChange(index, e.target.value)}
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
          name="sets"
          placeholder="Sets"
          value={exercise.sets}
          onChange={(e) => handleExerciseChange(index, e.target.value)}
          min={1}
          required
        />
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={exercise.reps}
          onChange={(e) => handleExerciseChange(index, e.target.value)}
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
  </div>

  {/* Submit Button */}
  <div>
    <button type="submit" disabled={loading}>
      {loading ? "Loading..." : "Create Routine"}
    </button>
  </div>
</form>

  );
};

export default CreateRoutine;
