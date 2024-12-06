// src/components/Chart.jsx
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Exercise Difficulty Chart',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Exercises',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Difficulty Level',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
