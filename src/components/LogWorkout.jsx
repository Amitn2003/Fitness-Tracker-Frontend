// import React, { useState } from "react";
// import axios from "axios";

// const LogWorkout = () => {
//   const [workoutData, setWorkoutData] = useState({
//     routine: "",
//     duration: 0,
//     exercises: [],
//     notes: "",
//     feelingRating: 0,
//     location: "",
//     weather: "",
//     photoUrl: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setWorkoutData({ ...workoutData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post("/workouts", workoutData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("Workout logged successfully!");
//     } catch (error) {
//       console.error("Error logging workout:", error);
//       alert("Failed to log workout.");
//     }
//   };

//   return (
//     <div>
//       <h2>Log Workout</h2>
//       <form>
//         <input
//           type="text"
//           name="routine"
//           placeholder="Routine ID"
//           onChange={handleInputChange}
//         />
//         <input
//           type="number"
//           name="duration"
//           placeholder="Duration (in minutes)"
//           onChange={handleInputChange}
//         />
//         <textarea
//           name="notes"
//           placeholder="Notes"
//           onChange={handleInputChange}
//         ></textarea>
//         <input
//           type="number"
//           name="feelingRating"
//           placeholder="Feeling Rating (1-5)"
//           onChange={handleInputChange}
//         />
//         <button type="button" onClick={handleSubmit}>
//           Submit Workout
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LogWorkout;









































// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const LogWorkout = () => {
//   const { routineId } = useParams();
//   const [routine, setRoutine] = useState(null);
//   const [workoutData, setWorkoutData] = useState({
//     duration: 0,
//     exercises: [],
//     notes: "",
//     feelingRating: 0,
//     location: "",
//     weather: "",
//     photoUrl: "",
//   });

//   const [exerciseOptions, setExerciseOptions] = useState([]);

//   // Fetching exercise options (this could be an API call to get all exercises available)
//   const fetchExerciseOptions = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/exercises`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       console.log(response.data.exercises)
//       setExerciseOptions(response.data.exercises);
//     } catch (error) {
//       console.error("Error fetching exercises:", error);
//     }
//   };

//   const fetchRoutineDetails = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/routines/${routineId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setRoutine(response.data);
//       setWorkoutData((prev) => ({
//         ...prev,
//         exercises: response.data.exercises.map((exercise) => ({
//           exercise: exercise._id,
//           sets: [],
//         })),
//       }));
//     } catch (error) {
//       console.error("Error fetching routine:", error);
//     }
//   };


//   function handleAddSet(exercise, exerciseIndex) {
//   const updatedExercises = [...workoutData.exercises];
//   updatedExercises[exerciseIndex][exercise] = exercise
//   updatedExercises[exerciseIndex].sets.push({ weight: "", reps: "", duration: "", restAfter: "" });
//   setWorkoutData({ ...workoutData, exercises: updatedExercises });
// }

// function handleRemoveSet(exerciseIndex, setIndex) {
//   const updatedExercises = [...workoutData.exercises];
//   updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
//   setWorkoutData({ ...workoutData, exercises: updatedExercises });
// }

// function handleSetChange(exercise, exerciseIndex, setIndex, field, value) {
//   console.log(exerciseIndex, setIndex, field, value)
//   const updatedExercises = [...workoutData.exercises];
//   updatedExercises[exerciseIndex][exercise] = exercise
//   updatedExercises[exerciseIndex].sets[setIndex][field] = value;
//   setWorkoutData({ ...workoutData, exercises: updatedExercises });
// }


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setWorkoutData({ ...workoutData, [name]: value });
//   };

//   const handleExerciseChange = (exercise, exerciseIndex, field, value) => {
//     const updatedExercises = [...workoutData.exercises];
//     updatedExercises[exerciseIndex][exercise] = exercise;
//     updatedExercises[exerciseIndex][field] = value;
//     setWorkoutData({ ...workoutData, exercises: updatedExercises });
//   };

//   //   try {
//   //     // Validate and prepare the data
//   //     const payload = {
//   //       routine: routineId,
//   //       duration: Number(workoutData.duration), // Ensure it's a number
//   //       exercises: workoutData.exercises.map((exercise) => ({
//   //         ...exercise,
//   //         sets: Array.isArray(exercise.sets) ? exercise.sets : JSON.parse(exercise.sets), // Parse sets into array
//   //       })),
//   //       notes: workoutData.notes,
//   //       feelingRating: Number(workoutData.feelingRating), // Ensure it's a number
//   //       location: workoutData.location,
//   //       weather: workoutData.weather,
//   //       // photoUrl: workoutData.photoUrl, // Ensure it's a valid URL
//   //     };
  
//   //     // Validate URL format
//   //     const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
//   //     // if (!urlPattern.test(payload.photoUrl)) {
//   //     //   throw new Error("Invalid photo URL format.");
//   //     // }
  
//   //     // Send to the backend
//   //     console.log(payload)
//   //     await axios.post(`${import.meta.env.VITE_BACKEND_URL}/workouts`, payload, {
//   //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//   //     });
  
//   //     alert("Workout logged successfully!");
//   //   } catch (error) {
//   //     console.error("Error logging workout:", error);
//   //     console.error("Error response:", error.response);
//   //     alert(error.message || "Failed to log workout.");
//   //   }
//   // };
//   const handleSubmit = async () => {
//     try {
//       // Validate and prepare the data
//       const payload = {
//         routine: routineId,
//         duration: workoutData.duration ? Number(workoutData.duration) : 0, // Ensure duration is a number
//         exercises: workoutData.exercises.map((exercise) => ({
//           exercise: exercise.exerciseId,
//           sets: exercise.sets.map((set) => ({
//             weight: set.weight ? Number(set.weight) : 0, // Ensure weight is a number
//             reps: set.reps ? Number(set.reps) : 0, // Ensure reps are numbers
//             duration: set.duration ? Number(set.duration) : 0, // Optional field
//             restAfter: set.restAfter ? Number(set.restAfter) : 0, // Ensure restAfter is a number
//           })),
//         })),
//         notes: workoutData.notes || undefined, // Optional field
//         feelingRating: workoutData.feelingRating ? Number(workoutData.feelingRating) : undefined, // Optional field
//         location: workoutData.location || undefined, // Optional field
//         weather: workoutData.weather || undefined, // Optional field
//         photoUrl: workoutData.photoUrl || undefined, // Optional field
//       };
  
//       console.log("Payload:", payload);
  
//       // Send the payload to the backend
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/workouts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(payload),
//       });
//       console.log(response)
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log(errorData)
//         throw new Error(errorData.message || "Failed to log workout.");
//       }
  
//       const result = await response.json();
//       alert("Workout logged successfully!");
//       console.log("Workout logged:", result);
//     } catch (error) {
//       console.error("Error logging workout:", error);
//       alert(error.message || "Failed to log workout.");
//     }
//   };

//   useEffect(() => {
//     fetchExerciseOptions(); // Fetch the list of exercises when the component mounts
//     fetchRoutineDetails(); // Fetch routine details
//   }, [routineId]);

//   // if (!routine) return <div>Loading...</div>;
//   if (!routine || !exerciseOptions.length) return <div>Loading...</div>;
//   //     <div>
//   //       <h2>Log Workout for Routine: {routine.name}</h2>
//   //       <form>
//   //   <input
//   //     type="number"
//   //     name="duration"
//   //     placeholder="Duration (minutes)"
//   //     onChange={handleInputChange}
//   //   />
//   //   {routine.exercises.map((exercise, index) => (
//   //     <div key={exercise._id}>
//   //       <h4>{exercise.name}</h4>
//   //       <textarea
//   //         placeholder='Sets (e.g., [{"weight":100,"reps":10,"restAfter":90}])'
//   //         onChange={(e) =>
//   //           handleExerciseChange(index, "sets", e.target.value)
//   //         }
//   //       ></textarea>
//   //     </div>
//   //   ))}
//   //   <textarea
//   //     name="notes"
//   //     placeholder="Notes"
//   //     onChange={handleInputChange}
//   //   ></textarea>
//   //   <input
//   //     type="number"
//   //     name="feelingRating"
//   //     placeholder="Feeling Rating (1-5)"
//   //     onChange={handleInputChange}
//   //   />
//   //   <input
//   //     type="url"
//   //     name="photoUrl"
//   //     placeholder="Photo URL"
//   //     onChange={handleInputChange}
//   //   />
//   //   <button type="button" onClick={handleSubmit}>
//   //     Submit Workout
//   //   </button>
//   // </form>
  
//   //     </div>

//   // <div>
//   //   <h2>Log Workout for Routine: {routine.name}</h2>
//   //   <form>
//   //     <input
//   //       type="number"
//   //       name="duration"
//   //       placeholder="Duration (minutes)"
//   //       onChange={handleInputChange}
//   //     />
//   //     {routine.exercises.map((exercise, exerciseIndex) => (
//   //       <div key={exercise._id}>
//   //         <h4>{exercise.name}</h4>
//   //         {/* Render sets dynamically for each exercise */}
//   //         {workoutData.exercises[exerciseIndex]?.sets?.map((set, setIndex) => (
//   //           <div key={setIndex}>
//   //             <input
//   //               type="number"
//   //               placeholder="Weight"
//   //               value={set.weight}
//   //               onChange={(e) =>
//   //                 handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)
//   //               }
//   //             />
//   //             <input
//   //               type="number"
//   //               placeholder="Reps"
//   //               value={set.reps}
//   //               onChange={(e) =>
//   //                 handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)
//   //               }
//   //             />
//   //             <input
//   //               type="number"
//   //               placeholder="Rest After (seconds)"
//   //               value={set.restAfter}
//   //               onChange={(e) =>
//   //                 handleSetChange(exerciseIndex, setIndex, "restAfter", e.target.value)
//   //               }
//   //             />
//   //             <button
//   //               type="button"
//   //               onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
//   //             >
//   //               Remove Set
//   //             </button>
//   //           </div>
//   //         ))}
//   //         <button type="button" onClick={() => handleAddSet(exerciseIndex)}>
//   //           Add Set
//   //         </button>
//   //       </div>
//   //     ))}
//   //     <textarea
//   //       name="notes"
//   //       placeholder="Notes"
//   //       onChange={handleInputChange}
//   //     ></textarea>
//   //     <input
//   //       type="number"
//   //       name="feelingRating"
//   //       placeholder="Feeling Rating (1-5)"
//   //       onChange={handleInputChange}
//   //     />
//   //     <input
//   //       type="url"
//   //       name="photoUrl"
//   //       placeholder="Photo URL"
//   //       onChange={handleInputChange}
//   //     />
//   //     <button type="button" onClick={handleSubmit}>
//   //       Submit Workout
//   //     </button>
//   //   </form>
//   // </div>
//   return (
//     <div>
//     <h2>Log Workout for Routine: {routine.name}</h2>
//     <form>
//       <input
//         type="number"
//         name="duration"
//         placeholder="Duration (minutes)"
//         onChange={handleInputChange}
//       />
      
//       {routine.exercises.map((exercise, exerciseIndex) => {
        
//         // console.log(exercise.exercise.name)
//         return (
//         <div key={exercise._id}>
//           <h4>{exercise.exercise.name} : </h4>


//           {/* Render sets dynamically for each exercise */}
//           {workoutData.exercises[exerciseIndex]?.sets?.map(
//             (set, setIndex) => (
//             <div key={setIndex}>
//               <input
//                 type="number"
//                 placeholder="Weight"
//                 value={set.weight}
//                 onChange={(e) =>
//                   handleSetChange(exercise.exercise.name,exerciseIndex, setIndex, "weight", e.target.value)
//                 }
//               />
//               <input
//                 type="number"
//                 placeholder="Reps"
//                 value={set.reps}
//                 onChange={(e) =>
//                   handleSetChange(exercise.exercise.name, exerciseIndex, setIndex, "reps", e.target.value)
//                 }
//               />
//               <input
//                 type="number"
//                 placeholder="Rest After (seconds)"
//                 value={set.restAfter}
//                 onChange={(e) =>
//                   handleSetChange(exercise.exercise.name, exerciseIndex, setIndex, "restAfter", e.target.value)
//                 }
//               />
//               <button
//                 type="button"
//                 onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
//               >
//                 Remove Set
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={() => handleAddSet(exercise.exercise.name, exerciseIndex)}>
//             Add Set
//           </button>
//         </div>
//       )})}
//       <textarea
//         name="notes"
//         placeholder="Notes"
//         onChange={handleInputChange}
//       ></textarea>
//       <input
//         type="number"
//         name="feelingRating"
//         placeholder="Feeling Rating (1-5)"
//         onChange={handleInputChange}
//       />
//       <input
//         type="url"
//         name="photoUrl"
//         placeholder="Photo URL"
//         onChange={handleInputChange}
//       />
//       <button type="button" onClick={handleSubmit}>
//         Submit Workout
//       </button>
//     </form>
//   </div>
//   );
// };

// export default LogWorkout;




































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

  const [exerciseOptions, setExerciseOptions] = useState([]);

  const fetchExerciseOptions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/exercises`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
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
      setRoutine(response.data);
      setWorkoutData((prev) => ({
        ...prev,
        exercises: response.data.exercises.map((exercise) => ({
          exercise: exercise._id,
          sets: [],
        })),
      }));
    } catch (error) {
      console.error("Error fetching routine:", error);
    }
  };

  const handleAddSet = (exerciseIndex) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises[exerciseIndex].sets.push({
      weight: 0,
      reps: 0,
      duration: 0,
      restAfter: 0,
    });
    setWorkoutData({ ...workoutData, exercises: updatedExercises });
  };

  const handleRemoveSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises[exerciseIndex].sets.splice(setIndex, 1);
    setWorkoutData({ ...workoutData, exercises: updatedExercises });
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...workoutData.exercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setWorkoutData({ ...workoutData, exercises: updatedExercises });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({ ...workoutData, [name]: value });
  };

  const handleSubmit = async () => {
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
      console.log("Workout logged:", result);
    } catch (error) {
      console.error("Error logging workout:", error);
      alert(error.message || "Failed to log workout.");
    }
  };

  useEffect(() => {
    fetchExerciseOptions();
    fetchRoutineDetails();
  }, [routineId]);

  return (
    <div>
      <h2>Log Workout for Routine: {routine?.name}</h2>
      <form>
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          onChange={handleInputChange}
        />
        {workoutData.exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex}>
            <h4>Exercise {exerciseIndex + 1}</h4>
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex}>
                <input
                  type="number"
                  placeholder="Weight"
                  value={set.weight}
                  onChange={(e) =>
                    handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) =>
                    handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Duration (seconds)"
                  value={set.duration}
                  onChange={(e) =>
                    handleSetChange(exerciseIndex, setIndex, "duration", e.target.value)
                  }
                />
                <input
                  type="number"
                  placeholder="Rest After (seconds)"
                  value={set.restAfter}
                  onChange={(e) =>
                    handleSetChange(exerciseIndex, setIndex, "restAfter", e.target.value)
                  }
                />
                <button type="button" onClick={() => handleRemoveSet(exerciseIndex, setIndex)}>
                  Remove Set
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddSet(exerciseIndex)}>
              Add Set
            </button>
          </div>
        ))}
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
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="weather"
          placeholder="Weather"
          onChange={handleInputChange}
        />
        <input
          type="url"
          name="photoUrl"
          placeholder="Photo URL"
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





