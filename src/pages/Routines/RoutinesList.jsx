import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const fetchRoutines = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/routines`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response)
      setRoutines(response.data.routines || []);
    } catch (error) {
      console.error("Error fetching routines:", error);
    }finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const SkeletonLoader = () => (
    <div className="space-y-6">
      {/* Skeleton for each routine */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-4 border-b border-gray-200 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div> {/* Title Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div> {/* Description Skeleton */}
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-3 bg-gray-300 rounded w-full"></div> // Exercise Skeleton
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  

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
  // <div className="py-8 bg-gray-100">
  //   <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
  //     <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select a Routine</h2>
      
  //     {/* Routine List */}
  //     {routines.length > 0 ? (
  //       <ul className="space-y-6">
  //         {routines.map((routine) => (
  //           <li key={routine._id} className="p-4 border-b border-gray-200">
  //             {/* Routine Details */}
  //             <h3 className="text-xl font-semibold text-gray-700">{routine.name}</h3>
  //             <p className="text-gray-600">{routine.description}</p>

  //             {/* Exercise List (if any exercises) */}
  //             {routine.exercises && routine.exercises.length > 0 && (
  //               <div className="mt-4">
  //                 <h4 className="text-lg font-medium text-gray-700">Exercises:</h4>
  //                 <ul className="list-disc pl-6 space-y-3">
  //                   {routine.exercises.map((exercise, index) => (
  //                     <li key={index} className="text-gray-600">
  //                       <strong className="font-semibold">{exercise.exercise?.name || "Unknown Exercise"}</strong> - 
  //                       {exercise.sets} sets, {exercise.reps} reps, {exercise.restBetweenSets} sec rest
  //                     </li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             )}

  //             {/* View Details Button */}
  //             <div className="mt-4 text-center">
  //               <Link
  //                 to={`/routine-details/${routine._id}`}
  //                 className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-500 transition-all"
  //               >
  //                 View Details
  //               </Link>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p className="text-center text-gray-600">No routines found. Create a new one!</p>
  //     )}
      
  //     {/* Create New Routine Link */}
  //     <div className="mt-6 text-center">
  //       <Link
  //         to="/create-routine"
  //         className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-green-500 transition-all"
  //       >
  //         Create New Routine
  //       </Link>
  //     </div>
  //   </div>
  // </div>
  return (
    <div className="py-8 bg-gray-100">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Select a Routine</h2>

      {/* Show skeleton loader while loading */}
      {loading ? (
        <SkeletonLoader />
      ) : (
        // Routine List
        <ul className="space-y-6">
          {routines.length > 0 ? (
            routines.map((routine) => (
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
            ))
          ) : (
            <p className="text-center text-gray-600">No routines found. Create a new one!</p>
          )}
        </ul>
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
