// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// const API_URL = import.meta.env.VITE_BACKEND_URL;
// const AUTH_HEADERS = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// };

// const AdminExercises = () => {
//   const [exercises, setExercises] = useState([]);
//   const [form, setForm] = useState({ name: "", description: "", category: "", difficulty: "Beginner" });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchExercises();
//   }, []);

//   const fetchExercises = async () => {
//     try {
//       const { data } = await axios.get(API_URL+"/exercises", AUTH_HEADERS);
//       setExercises(data);
//     } catch (error) {
//       toast.error("Error fetching exercises");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(API_URL+`/exercises/${editingId}`, AUTH_HEADERS, form);
//         toast.success("Exercise updated successfully!");
//       } else {
//         await axios.post(API_URL+"/exercises",AUTH_HEADERS, form);
//         toast.success("Exercise added successfully!");
//       }
//       fetchExercises();
//       setForm({ name: "", description: "", category: "", difficulty: "Beginner" });
//       setEditingId(null);
//     } catch (error) {
//       toast.error("Error saving exercise");
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(API_URL+`/api/exercises/${id}/approve`, AUTH_HEADERS);
//       toast.success("Exercise approved!");
//       fetchExercises();
//     } catch (error) {
//       toast.error("Error approving exercise");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this exercise?")) {
//       try {
//         await axios.delete(`/api/exercises/${id}`);
//         toast.success("Exercise deleted successfully!");
//         fetchExercises();
//       } catch (error) {
//         toast.error("Error deleting exercise");
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Exercise Management</h2>

//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Exercise Name" required />
//         <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
//         <button type="submit">{editingId ? "Update" : "Add"} Exercise</button>
//       </form>

//       <h3>Exercise List</h3>
//       <ul>
//         {exercises != [] && exercises.map((exercise) => (
//           <li key={exercise._id}>
//             <strong>{exercise.name}</strong> - {exercise.difficulty}
//             {!exercise.isApproved && <button onClick={() => handleApprove(exercise._id)}>Approve</button>}
//             <button onClick={() => handleDelete(exercise._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminExercises;














import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { useState } from "react";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const AUTH_HEADERS = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};


// 🏋️‍♂️ Zod Schema for Validation
const exerciseSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  muscleGroup: z.array(z.string()).min(1, "At least one muscle group is required"),
  equipment: z.string().min(3, "Equipment must be at least 3 characters"),
  workoutType: z.string().min(3, "Workout type must be at least 3 characters"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  weightType: z.enum(["bodyweight", "external"]),
  youtubeLink: z.string().url("Invalid URL").optional(),

  imageUrl: z.string().url("Invalid URL").optional(),
  instructions: z.array(z.string()).min(1, "At least one instruction is required"),
  variations: z.array(z.string()).optional(),
  tips: z.array(z.string()).optional(),
});
//   caloriesBurnedPerMinute: z.number().positive("Must be a positive number").optional(),

const AdminExerciseForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      muscleGroup: [],
      equipment: "",
      workoutType: "",
      difficulty: "Beginner",
      weightType: "bodyweight",
      youtubeLink: "",
      imageUrl: "",
      caloriesBurnedPerMinute: "",
      instructions: [""],
      variations: [],
      tips: [],
    },
  });

  const [loading, setLoading] = useState(false);

  // 📌 Handle Form Submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
        if (data.caloriesBurnedPerMinute !== "") {
            data.caloriesBurnedPerMinute = Number(data.caloriesBurnedPerMinute);
          }
      const token = localStorage.getItem("token"); // Assume admin is logged in
      await axios.post(API_URL+"/exercises", data,AUTH_HEADERS );
      alert("Exercise created successfully!");
      reset();
      onSuccess();
    } catch (error) {
      alert("Error creating exercise: " + (error.response?.data?.message || error.message));
      console.log(error.response?.data?.message || error.message)
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Dynamic Fields (Instructions, Variations, Tips)
  const addField = (field) => {
    setValue(field, [...watch(field), ""]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="exercise-form">
      <h2>Add New Exercise</h2>

      {/* 🔹 Name */}
      <label>Name:</label>
      <input {...register("name")} placeholder="Exercise Name" />
      {errors.name && <p className="error">{errors.name.message}</p>}

      {/* 🔹 Description */}
      <label>Description:</label>
      <textarea {...register("description")} placeholder="Exercise Description" />
      {errors.description && <p className="error">{errors.description.message}</p>}

      {/* 🔹 Muscle Group */}
      <label>Muscle Groups (comma-separated):</label>
      <input
        type="text"
        placeholder="E.g. Chest, Triceps"
        onBlur={(e) => setValue("muscleGroup", e.target.value.split(",").map((m) => m.trim()))}
      />
      {errors.muscleGroup && <p className="error">{errors.muscleGroup.message}</p>}

      {/* 🔹 Equipment */}
      <label>Equipment:</label>
      <input {...register("equipment")} placeholder="E.g. Dumbbells, Barbell" />
      {errors.equipment && <p className="error">{errors.equipment.message}</p>}

      {/* 🔹 Workout Type */}
      <label>Workout Type:</label>
      <input {...register("workoutType")} placeholder="E.g. Strength, Cardio" />
      {errors.workoutType && <p className="error">{errors.workoutType.message}</p>}

      {/* 🔹 Difficulty */}
      <label>Difficulty:</label>
      <select {...register("difficulty")}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      {/* 🔹 Weight Type */}
      <label>Weight Type:</label>
      <select {...register("weightType")}>
        <option value="bodyweight">Bodyweight</option>
        <option value="external">External</option>
      </select>

      {/* 🔹 YouTube Link */}
      <label>YouTube Link:</label>
      <input {...register("youtubeLink")} placeholder="https://..." />
      {errors.youtubeLink && <p className="error">{errors.youtubeLink.message}</p>}

      {/* 🔹 Image URL */}
      <label>Image URL:</label>
      <input {...register("imageUrl")} placeholder="https://..." />
      {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}

      {/* 🔹 Calories Burned Per Minute */}
      <label>Calories Burned Per Minute:</label>
      <input type="number" {...register("caloriesBurnedPerMinute")} placeholder="e.g. 10" />
      {errors.caloriesBurnedPerMinute && <p className="error">{errors.caloriesBurnedPerMinute.message}</p>}

      {/* 🔹 Instructions */}
      <label>Instructions:</label>
      {watch("instructions").map((_, index) => (
        <input key={index} {...register(`instructions.${index}`)} placeholder={`Step ${index + 1}`} />
      ))}
      <button type="button" onClick={() => addField("instructions")}>+ Add Step</button>

      {/* 🔹 Variations */}
      <label>Variations:</label>
      {watch("variations").map((_, index) => (
        <input key={index} {...register(`variations.${index}`)} placeholder={`Variation ${index + 1}`} />
      ))}
      <button type="button" onClick={() => addField("variations")}>+ Add Variation</button>

      {/* 🔹 Tips */}
      <label>Tips:</label>
      {watch("tips").map((_, index) => (
        <input key={index} {...register(`tips.${index}`)} placeholder={`Tip ${index + 1}`} />
      ))}
      <button type="button" onClick={() => addField("tips")}>+ Add Tip</button>

      {/* 🔹 Submit Button */}
      <button type="submit" disabled={loading} className="bg-green-400">
        {loading ? "Submitting..." : "Add Exercise"}
      </button>
    </form>
  );
};

export default AdminExerciseForm;
