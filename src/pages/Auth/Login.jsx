import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast("Welcome back!");
      window.location.href = "/";
    } catch (err) {
      toast("Invalid email or password!");
      console.error(err);
    }
    // try {
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   console.log(response)

    //   if (response.ok) {
    //     const result = await response.json();
    //     console.log(result)
    //     localStorage.setItem("user", JSON.stringify(result.user));
    //     localStorage.setItem("token", result.token);
    //     alert("Login successful!");
    //   } else {
    //     const error = await response.json();
    //     alert(error.message || "Login failed.");
    //   }
    // } catch (err) {
    //   console.error("Login error:", err);
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
