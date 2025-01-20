export const scheduleDailyNotification = () => {
    navigator.serviceWorker.ready.then((registration) => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(8, 0, 0, 0);
  
      let timeUntilNext8AM = targetTime - now;
      if (timeUntilNext8AM < 0) {
        timeUntilNext8AM += 24 * 60 * 60 * 1000; // Add 24 hours if already passed
      }
  
      setTimeout(() => {
        registration.showNotification("Good Morning! 🌞", {
          body: "Time to check your fitness streak!",
          icon: "/android-chrome-512x512.png",
        });
  
        // Repeat every 1 hours
        setInterval(() => {
          registration.showNotification("Daily Reminder ⏰", {
            body: "Don't forget to log your workout!",
            icon: "/android-chrome-512x512.png",
          });
        }, 1 * 60 * 60 * 1000);
      }, timeUntilNext8AM);
    });
  };
  