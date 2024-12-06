import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Chart from '../../components/Chart';
import { toast } from 'react-toastify';

const Workouts = () => {
  const { token } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [chartData, setChartData] = useState(null);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/exercises?page=1&limit=10`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.exercises) {
        setExercises(result.exercises);
        prepareChartData(result.exercises);
      } else {
        toast.error('Failed to fetch exercises');
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast.error('Failed to fetch data. Please try again later.');
    }
  };

  const prepareChartData = (data) => {
    if (!data || data.length === 0) {
      toast.warning('No data available to display');
      return;
    }

    const labels = data.map((exercise) => exercise.name);
    const difficulties = data.map((exercise) => {
      switch (exercise.difficulty) {
        case 'Beginner':
          return 1;
        case 'Intermediate':
          return 2;
        case 'Advanced':
          return 3;
        default:
          return 0;
      }
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Exercise Difficulty (1 = Beginner, 3 = Advanced)',
          data: difficulties,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Workout Summary</h1>
      {chartData ? (
        <Chart data={chartData} />
      ) : (
        <p>No data available for chart</p>
      )}
    </div>
  );
};

export default Workouts;
