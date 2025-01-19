import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getAnalyticsData } from '../api/analytics';

const AnalyticsChart = () => {
  const [analytics, setAnalytics] = useState({
    dailyStats: { totalWorkouts: 0, totalDuration: 0, averageFeelingRating: 0 },
    workoutStreak: 0,
    exerciseFrequency: [],
    progress: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnalyticsData();
      setAnalytics(data);
    };
    fetchData();
  }, []);

  // Extract values for charts
  const { dailyStats, workoutStreak, exerciseFrequency, progress } = analytics;

  const categories = progress.map((p) => p._id) || [];

  // Chart options
  const options = {
    chart: {
      id: 'combined-chart',
      toolbar: { show: false },
    },
    xaxis: {
      categories,
      title: { text: 'Date' },
    },
    yaxis: [
      { title: { text: 'Workout Metrics' } },
      { opposite: true, title: { text: 'Frequency & Streak' } },
    ],
  };

  // Chart series
  const series = [
    { name: 'Total Workouts', type: 'bar', data: [dailyStats.totalWorkouts] },
    { name: 'Total Duration', type: 'bar', data: [dailyStats.totalDuration] },
    { name: 'Workout Streak', type: 'line', data: [workoutStreak] },
    {
      name: 'Exercise Frequency',
      type: 'scatter',
      data: exerciseFrequency.map((ex) => ex.count),
    },
    {
      name: 'Max Weight',
      type: 'line',
      data: progress.map((p) => p.maxWeight),
    },
    {
      name: 'Total Reps',
      type: 'line',
      data: progress.map((p) => p.totalReps),
    },
  ];

  return (
    <div>
      <h2>Analytics Overview</h2>
      <Chart options={options} series={series} type="line" height={400} />
    </div>
  );
};

export default AnalyticsChart;
