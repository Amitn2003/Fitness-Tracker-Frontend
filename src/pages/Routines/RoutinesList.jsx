import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const RoutinesList = () => {
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/routines?page=${filters.page}&limit=${filters.limit}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setRoutines(data.routines);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };
    fetchRoutines();
  }, [filters]);

  return (
    <div>
      <h1>All Routines</h1>
      {routines.map((routine) => (
        <div key={routine._id}>
          <h2>{routine.name}</h2>
          <p>{routine.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RoutinesList;
