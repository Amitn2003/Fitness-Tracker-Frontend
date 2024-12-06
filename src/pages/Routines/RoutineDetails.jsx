import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RoutineDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/routines/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setRoutine(data);
      } catch (error) {
        console.error('Error fetching routine:', error);
      }
    };
    fetchRoutine();
  }, [id]);

  return (
    routine && (
      <div>
        <h1>{routine.name}</h1>
        <p>{routine.description}</p>
        {/* List exercises */}
      </div>
    )
  );
};

export default RoutineDetails;
