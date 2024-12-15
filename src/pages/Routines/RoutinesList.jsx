// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../hooks/useAuth';

// const RoutinesList = () => {
//   const { token } = useAuth();
//   const [routines, setRoutines] = useState([]);
//   const [filters, setFilters] = useState({ page: 1, limit: 10 });

//   useEffect(() => {
//     const fetchRoutines = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/routines?page=${filters.page}&limit=${filters.limit}`,
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         setRoutines(data.routines);
//       } catch (error) {
//         console.error('Error fetching routines:', error);
//       }
//     };
//     fetchRoutines();
//   }, [filters]);

//   return (
//     <div>
//       <h1>All Routines</h1>
//       {routines.map((routine) => (
//         <div key={routine._id}>
//           <h2>{routine.name}</h2>
//           <p>{routine.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RoutinesList;








import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/routines`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response)
      setRoutines(response.data.routines || []);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  // <div>
  //   <h2>Select a Routine</h2>
  //   <ul>
  //     {routines.map((routine) => (
  //       <li key={routine._id}>
  //         <Link to={`/routine-details/${routine._id}`}>{routine.name}</Link>
  //       </li>
  //     ))}
  //   </ul>
  //   <div><Link to="/create-routine"> Create new Routine</Link></div>
  // </div>
  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select a Routine</h2>
        
        {/* Routine List */}
        {routines.length > 0 ? (
          <ul className="space-y-6">
            {routines.map((routine) => (
              <li key={routine._id} className="p-4 border-b border-gray-200">
                {/* Routine Details */}
                <h3 className="text-xl font-semibold text-gray-700">{routine.name}</h3>
                <p className="text-gray-600">{routine.description}</p>

                {/* Exercise List (if any exercises) */}
                {routine.exercises && routine.exercises.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-gray-700">Exercises:</h4>
                    <ul className="list-disc pl-6 space-y-3">
                      {routine.exercises.map((exercise, index) => (
                        <li key={index} className="text-gray-600">
                          <strong className="font-semibold">{exercise.exercise?.name || "Unknown Exercise"}</strong> - 
                          {exercise.sets} sets, {exercise.reps} reps, {exercise.restBetweenSets} sec rest
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* View Details Button */}
                <div className="mt-4 text-center">
                  <Link
                    to={`/routine-details/${routine._id}`}
                    className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-500 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No routines found. Create a new one!</p>
        )}
        
        {/* Create New Routine Link */}
        <div className="mt-6 text-center">
          <Link
            to="/create-routine"
            className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-green-500 transition-all"
          >
            Create New Routine
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Routines;
