// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';

// const RoutineDetails = () => {
//   const { id } = useParams();
//   const { token } = useAuth();
//   const [routine, setRoutine] = useState(null);

//   useEffect(() => {
//     const fetchRoutine = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/routines/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log(response)
//         const data = await response.json();
//         console.log(data)
//         setRoutine(data);
//       } catch (error) {
//         console.error('Error fetching routine:', error);
//       }
//     };
//     fetchRoutine();
//   }, [id]);

//   return (
//     routine && (
//       <div>
//         <h1>{routine.name}</h1>
//         <p>{routine.description}</p>
//         {/* List exercises */}
//       </div>
//     )
//   );
// };

// export default RoutineDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const RoutineDetails = () => {
  const { id } = useParams();
  const [routine, setRoutine] = useState(null);

  const fetchRoutineDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/routines/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data)
      setRoutine(response.data);
    } catch (error) {
      console.error("Error fetching routine details:", error);
    }
  };

  useEffect(() => {
    fetchRoutineDetails();
  }, [id]);

  if (!routine) return <div>Loading...</div>;

  // <div>
  //   <h2>Routine Details</h2>
  //   <p>Name: {routine.name}</p>
  //   <p>Description: {routine.description}</p>
  //   <h3>Exercises</h3>
  //   <ul>
  //     {routine.exercises.map((exercise) => {
  //       console.log(exercise.exercise.name)
  //       return (
  //       <li key={exercise._id}> {exercise.exercise.name}
  //         {exercise.name} - {exercise.reps || "N/A"} reps, {exercise.sets || "N/A"} sets
  //       </li>
  //     )})}
  //   </ul>
  //   <Link to={`/log-workout/${routine._id}`}>
  //     <button>Start Logging Workout</button>
  //   </Link>
  // </div>
  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Routine Title and Description */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">{routine.name}</h2>
        <p className="text-lg text-gray-600 mb-6">{routine.description}</p>

        {/* Exercises Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Exercises</h3>
          <ul className="space-y-4 mt-4">
            {routine.exercises.map((exercise) => {
              console.log(exercise)
              return(
              <li key={exercise._id} className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-700">{exercise.exercise.name}</h4>
                    <p className="text-gray-600">{exercise.exercise.description}</p>
                  </div>
                  <div className="text-gray-500 min-w-24 p-1 m-1">
                    <p>Reps: {exercise.reps || "N/A"}</p>
                    <p>Sets: {exercise.sets || "N/A"}</p>
                    <p>Rest: {exercise.restBetweenSets} sec</p>
                  </div>
                </div>
              </li>
            )})}
          </ul>
        </div>

        {/* Log Workout Button */}
        <div className="mt-8 text-center">
          <Link
            to={`/log-workout/${routine._id}`}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-500 transition-all"
          >
            Start Logging Workout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetails;
