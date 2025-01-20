import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './hooks/useTheme';
import { AuthProvider } from "./hooks/useAuth"; 
import App from './App.jsx'
import { getWorkoutStreak } from '../public/streak.js';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope, registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
    // Listen for messages from the service worker
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data.type === "GET_STREAK") {
      const streakData = getWorkoutStreak();
      navigator.serviceWorker.controller.postMessage({
        type: "STREAK_RESPONSE",
        streak: streakData,
      });
    }
  });
}

// Schedule a notification every day at 8 AM
// const scheduleDailyNotification = () => {
//   const now = new Date();
//   const targetTime = new Date();
//   targetTime.setHours(8, 11, 0, 0);

//   let timeUntilNext8AM = targetTime - now;
//   if (timeUntilNext8AM < 0) {
//     timeUntilNext8AM += 24 * 60 * 60 * 1000; // Add 24 hours if the time has passed
//   }

//   setTimeout(() => {
//     navigator.serviceWorker.ready.then((registration) => {
//       registration.showNotification("Good Morning! 🌞", {
//         body: "Checking your workout streak...",
//         icon: "/android-chrome-512x512.png",
//       });

//       // Fetch updated streak
//       navigator.serviceWorker.controller.postMessage({ type: "GET_STREAK" });

//       // Repeat every 24 hours
//       setInterval(() => {
//         navigator.serviceWorker.controller.postMessage({ type: "GET_STREAK" });
//       }, 24 * 60 * 60 * 1000);
//     });
//   }, timeUntilNext8AM);
// };
const scheduleNotifications = () => {
  const userTimes = JSON.parse(localStorage.getItem("notificationTimes")) || ["08:00"]; // Default 8 AM

  const scheduleTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);

    let timeUntilNext = targetTime - now;
    if (timeUntilNext < 0) {
      timeUntilNext += 24 * 60 * 60 * 1000; // Move to the next day
    }

    setTimeout(() => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Fitness Reminder 🏋️‍♂️", {
          body: "Stay on track! Check your workout streak now! 💪",
          icon: "/android-chrome-512x512.png",
        });

        // Fetch updated streak
        navigator.serviceWorker.controller.postMessage({ type: "GET_STREAK" });

        // Reschedule this notification every 24 hours
        setInterval(() => {
          navigator.serviceWorker.controller.postMessage({ type: "GET_STREAK" });
        }, 24 * 60 * 60 * 1000);
      });
    }, timeUntilNext);
  };

  // Schedule notifications for all user-defined times
  userTimes.forEach(scheduleTime);
};

scheduleNotifications();



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <ThemeProvider>
        <App />
     </ThemeProvider>
   </AuthProvider>
  </StrictMode>,
)
