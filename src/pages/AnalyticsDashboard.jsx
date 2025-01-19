// import React, { useEffect, useState } from "react";
// import { getDailyStats, getWorkoutStreak, getExerciseFrequency, getProgressOverTime } from "../api/analytics";
// import Chart from "react-apexcharts"; // Install: npm install react-apexcharts apexcharts
// import Workouts from "./Dashboard/Workouts";

// const AnalyticsDashboard = () => {
//   const [dailyStats, setDailyStats] = useState(null);
//   const [workoutStreak, setWorkoutStreak] = useState(0);
//   const [exerciseFrequency, setExerciseFrequency] = useState([]);
//   const [progressData, setProgressData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       setDailyStats(await getDailyStats());
//       setWorkoutStreak((await getWorkoutStreak())?.streak || 0);
//       setExerciseFrequency(await getExerciseFrequency());
//     }
//     fetchData();
//   }, []);

//   const handleExerciseSelect = async (exerciseId) => {
//     setProgressData(await getProgressOverTime(exerciseId));
//   };

//   return (
//     <div className="analytics-container">
//       <h2 className="text-2xl ">Workout Analytics Dashboard</h2>
//       <br />
//       {/* Daily Statistics */}
//       {dailyStats && (
//         <div className="stat-card">
//           <h3>Today's Stats</h3>
//           <p>Total Workouts: {dailyStats.totalWorkouts}</p>
//           <p>Total Duration: {dailyStats.totalDuration} minutes</p>
//           <p>Avg Feeling Rating: {dailyStats.averageFeelingRating.toFixed(1)}</p>
//         </div>
//       )}

//       {/* Workout Streak */}
//       <div className="stat-card">
//         <h3>Current Workout Streak</h3>
//         <p>{workoutStreak} days</p>
//       </div>

//       {/* Exercise Frequency Chart */}
//       <div className="chart-container">
//         <h3>Most Frequent Exercises (Last Month)</h3>
//         {/* <Chart
//           type="bar"
//           options={{
//             chart: { id: "exercise-frequency" },
//             xaxis: { categories: exerciseFrequency.map((ex) => ex.name) },
//           }}
//           series={[{ name: "Count", data: exerciseFrequency.map((ex) => ex.count) }]}
//           height={300}
//         /> */}
//         {progressData.length > 0 && (
//           <Chart
//             type="line"
//             options={{
//               chart: { id: "progress-over-time" },
//               xaxis: { categories: progressData?.map((data) => data._id) || [] },
//             }}
//             series={[
//               {
//                 name: "Max Weight",
//                 data: progressData?.map((data) => data.maxWeight) || [],
//               },
//               {
//                 name: "Total Reps",
//                 data: progressData?.map((data) => data.totalReps) || [],
//               },
//             ]}
//             height={300}
//           />
//         )}


//       </div>

//       {/* Progress Over Time */}
//       {/* <div className="chart-container">
//         <h3>Progress Over Time</h3>
//         <select onChange={(e) => handleExerciseSelect(e.target.value)}>
//           <option value="">Select Exercise</option>
//           {exerciseFrequency.map((ex) => {
//             console.log(ex)
//             return (
//               <option key={ex._id} value={ex._id}>
//                 {ex.name} {ex._id}
//               </option>
//             )
//           })}
//         </select>

//         {progressData.length > 0 && (
//           <Chart
//             type="line"
//             options={{
//               chart: { id: "progress-over-time" },
//               xaxis: { categories: progressData.map((data) => data._id) },
//             }}
//             series={[
//               { name: "Max Weight", data: progressData.map((data) => data.maxWeight) },
//               { name: "Total Reps", data: progressData.map((data) => data.totalReps) },
//             ]}
//             height={300}
//           />
//         )}
//       </div> */}
//       {/* <Workouts /> */}
//     </div>
//   );
// };

// export default AnalyticsDashboard;








import React, { useEffect, useState } from "react";
import { getDailyStats, getWorkoutStreak, getExerciseFrequency, getProgressOverTime } from "../api/analytics";
import Chart from "react-apexcharts"; // Install: npm install react-apexcharts apexcharts
import Workouts from "./Dashboard/Workouts";

const AnalyticsDashboard = () => {
  const [dailyStats, setDailyStats] = useState(null);
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const [exerciseFrequency, setExerciseFrequency] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setDailyStats(await getDailyStats()|| { totalWorkouts: 0, totalDuration: 0, averageFeelingRating: 0 });
        console.log(dailyStats , " is daily stats")
        setWorkoutStreak((await getWorkoutStreak())?.streak || 0);
        console.log(workoutStreak , " is workout steak ")
        setExerciseFrequency(await getExerciseFrequency() || []);
        console.log(exerciseFrequency , " is exercise freq")
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    }
    fetchData();
  }, []);

  const handleExerciseSelect = async (exerciseId) => {
    if (!exerciseId) {
      setProgressData([]); // Reset if no exercise is selected
      return;
    }
  
    try {
      const progress = await getProgressOverTime(exerciseId);
      setProgressData(progress || []);
    } catch (error) {
      console.error("Error fetching progress data:", error);
      setProgressData([]);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Workout Analytics Dashboard</h2>

      {/* 🏋️ Daily Stats */}
      {dailyStats && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Today's Stats</h3>
          <p>Total Workouts: <strong>{dailyStats.totalWorkouts} times</strong></p>
          <p>Total Duration: <strong>{dailyStats.totalDuration} minutes</strong></p>
          <p>Avg Feeling Rating: <strong>{dailyStats && dailyStats.averageFeelingRating && dailyStats.averageFeelingRating.toFixed(2)}</strong></p>
        </div>
      )}

      {/* 🔥 Workout Streak */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Current Workout Streak</h3>
        <p className="text-4xl font-bold text-blue-600">{workoutStreak} days</p>
      </div>

      {/* 📊 Exercise Frequency Chart */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Most Frequent Exercises (Last Month)</h3>
        {exerciseFrequency.length > 0 ? (
  <Chart
    type="bar"
    options={{
      chart: { id: "exercise-frequency" },
      xaxis: { categories: exerciseFrequency.map((ex) => ex.name) },
    }}
    series={[{ name: "Count", data: exerciseFrequency.map((ex) => ex.count) }]}
    height={300}
  />
) : (
  <p>No data available for exercise frequency.</p>
)}
      </div> */}

      {/* 📈 Progress Over Time */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Progress Over Time</h3>
        <select 
          className="border border-gray-300 rounded px-3 py-2 mb-4" 
          onChange={(e) => handleExerciseSelect(e.target.value)}
          value={selectedExercise}
        >
          <option value="">Select an Exercise</option>
          {exerciseFrequency.map((ex) => (
            <option key={ex._id} value={ex._id}>
              {ex.name}
            </option>
          ))}
        </select>

        {progressData.length > 0 ? (
  <Chart
    type="line"
    options={{
      chart: { id: "progress-over-time" },
      xaxis: { categories: progressData.map((data) => data._id) },
    }}
    series={[
      { name: "Max Weight", data: progressData.map((data) => data.maxWeight || 0) },
      { name: "Total Reps", data: progressData.map((data) => data.totalReps || 0) },
    ]}
    height={300}
  />
) : (
  <p>No progress data available. Select an exercise.</p>
)}

      </div> */}

      {/* 🏆 Additional Workouts Section (Optional) */}
      {/* <Workouts /> */}
    </div>
  );
};

export default AnalyticsDashboard;
