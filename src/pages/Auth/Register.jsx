import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";


const registerSchema = z.object({
  
  username: z
  .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must not exceed 30 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.number().positive("Age must be a positive number").int(),
  gender: z.enum(["male", "female", "other"], "Please select your gender"),
  height: z.number().positive("Height must be a positive number"),
  weight: z.number().positive("Weight must be a positive number"),
  weightGoal: z.number().positive("Weight goal must be a positive number"),
  mainGoal: z.enum(
    ["weight gain", "weight loss", "muscle gain", "strength training", "general fitness"],
    "Please select your main goal"
  ),
  fitnessLevel: z.enum(
    ["beginner", "intermediate", "advanced"],
    "Please select your fitness level"
  ),
  preferredWorkoutSplit: z.enum(
    ["full body", "upper/lower", "push/pull/legs", "bro split", "custom"],
    "Please select your workout split"
  ),
});

const Register = () => {
  const { register: authRegister } = useAuth();
  const { setUser } = useAuth(); // Use the hook to store user data 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = async (data) => {
    try {
      await authRegister(data);
      alert("Welcome to Fitz!");
    } catch (err) {
      console.error(err);
    }
    // try {
    //   console.log(data)
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   console.log(response)
    //   if (response.ok) {
    //     const result = await response.json();
    //     const { token, user } = result;
    //     setUser({ user, token });
    //     alert("Registration successful!");
    //     console.log(result);
    //   } else {
    //     const error = await response.json();
    //     alert(error.message || "Registration failed.");
    //   }
    // } catch (err) {
    //   console.error("Registration error:", err);
    // }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium">
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium">
            Gender
          </label>
          <select id="gender" {...register("gender")} className="w-full p-2 border rounded">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="height" className="block text-sm font-medium">
            Height (cm)
          </label>
          <input
            id="height"
            type="number"
            {...register("height", { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            {...register("weight", { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
        </div>

        <div>
          <label htmlFor="weightGoal" className="block text-sm font-medium">
            Weight Goal (kg)
          </label>
          <input
            id="weightGoal"
            type="number"
            {...register("weightGoal", { valueAsNumber: true })}
            className="w-full p-2 border rounded"
          />
          {errors.weightGoal && <p className="text-red-500 text-sm">{errors.weightGoal.message}</p>}
        </div>

        <div>
          <label htmlFor="mainGoal" className="block text-sm font-medium">
            Main Goal
          </label>
          <select id="mainGoal" {...register("mainGoal")} className="w-full p-2 border rounded">
            <option value="">Select goal</option>
            <option value="weight gain">Weight Gain</option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="strength training">Strength Training</option>
            <option value="general fitness">General Fitness</option>
          </select>
          {errors.mainGoal && <p className="text-red-500 text-sm">{errors.mainGoal.message}</p>}
        </div>

        <div>
          <label htmlFor="fitnessLevel" className="block text-sm font-medium">
            Fitness Level
          </label>
          <select
            id="fitnessLevel"
            {...register("fitnessLevel")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.fitnessLevel && <p className="text-red-500 text-sm">{errors.fitnessLevel.message}</p>}
        </div>

        <div>
          <label htmlFor="preferredWorkoutSplit" className="block text-sm font-medium">
            Preferred Workout Split
          </label>
          <select
            id="preferredWorkoutSplit"
            {...register("preferredWorkoutSplit")}
            className="w-full p-2 border rounded"
          >
            <option value="">Select split</option>
            <option value="full body">Full Body</option>
            <option value="upper/lower">Upper/Lower</option>
            <option value="push/pull/legs">Push/Pull/Legs</option>
            <option value="bro split">Bro Split</option>
            <option value="custom">Custom</option>
          </select>
          {errors.preferredWorkoutSplit && (
            <p className="text-red-500 text-sm">{errors.preferredWorkoutSplit.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
