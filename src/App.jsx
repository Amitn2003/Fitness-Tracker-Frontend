import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Workouts';
import Profile from "./pages/Dashboard/Profile";
// import Workouts from "./pages/Workouts";
import RoutinesList from "./pages/Routines/RoutinesList";
import RoutineDetails from "./pages/Routines/RoutineDetails";
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import LogWorkout from './components/LogWorkout';
import WorkoutHistory from "./components/WorkoutHistory";
import WorkoutDetails from "./components/WorkoutDetails";
import UpdateWorkout from "./components/UpdateWorkout";
import RoutineForm from "./pages/Routines/RoutineForm"
import Settings from './pages/Dashboard/Settings';
import AdminExercises from './pages/AdminExercises';
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <div className=" ">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<AnalyticsDashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* <Route path="/workouts" element={<Workouts />} />
            <Route path="/routines" element={<Routines />} /> */}
             <Route path="/log-workout/:routineId" element={<LogWorkout />} />
          <Route path="/workout-history" element={<WorkoutHistory />} />
          <Route path="/workout-details/:id" element={<WorkoutDetails />}/>
          <Route path="/update-workout/:id" element={<UpdateWorkout />} />
            <Route path="/create-routine" element={<RoutineForm />} />
            <Route path="/routines" element={<RoutinesList />} />

          <Route path="/routine-details/:id" element={<RoutineDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/exercises" element={<AdminExercises />} />
          </Routes>
        </div>
            <ToastContainer />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
