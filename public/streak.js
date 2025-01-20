export const updateWorkoutStreak = () => {
    const today = new Date().toDateString();
    let streakData = JSON.parse(localStorage.getItem("workoutStreak")) || { streak: 0, total: 0, lastDate: "" };
  
    if (streakData.lastDate !== today) {
      streakData.streak += 1;
      streakData.total += 1;
      streakData.lastDate = today;
      localStorage.setItem("workoutStreak", JSON.stringify(streakData));
    }
  };
  
  export const getWorkoutStreak = () => {
    return JSON.parse(localStorage.getItem("workoutStreak")) || { streak: 0, total: 0 };
  };
  