const CACHE_NAME = "fitz-cache-v2";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/offline.html",
  "/android-chrome-512x512.png",
  "/logo.png",
  "/routines", 
  "/dashboard", 
  "/profile", 
  "/workout-history", 
  "/settings"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});


self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker Installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  console.log("Service Worker Activated");
});

self.addEventListener("push", async (event) => {
  const streakData = await getWorkoutStreak(); // Fetch streak data
  const message = `Today's Streak: ${streakData.streak}🔥 | Total: ${streakData.total}💪`;

  const options = {
    body: message,
    icon: "/android-chrome-192x192.png", // Add an icon in public/icons/
    badge: "/android-chrome-512x512.png",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification("Morning Workout Reminder", options));
});
// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data.type === "STREAK_RESPONSE") {
    self.streakData = event.data.streak;
  }
})

// Background Sync for Notifications
self.addEventListener("sync", (event) => {
  if (event.tag === "daily-fitness-reminder") {
    event.waitUntil(
      self.registration.showNotification("Daily Fitness Reminder", {
        body: "Don't forget to log your workout today!",
        icon: "/android-chrome-512x512.png",
      })
    );
  }
});


// Background Sync or Alarm API
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "daily-workout-reminder") {
    event.waitUntil(
      self.registration.showNotification("Good Morning!", {
        body: "Start your day with a workout! 🏋️‍♂️",
        icon: "/favicon-16x16.png",
      })
    );
  }
});




const requestPermissions = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted");

    if ("serviceWorker" in navigator && "periodicSync" in navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.periodicSync
          .register("daily-workout-reminder", {
            minInterval: 24 * 60 * 60 * 1000, // 24 hours
          })
          .then(() => console.log("Periodic sync registered"))
          .catch((error) => console.error("Periodic sync registration failed", error));
      });
    }
  }
  else {
    console.error("Notification permission denied");
  }
};

requestPermissions();






const scheduleNotification = () => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(8, 0, 0, 0); // Set time to 8 AM

  let timeUntilNext8AM = targetTime - now;
  if (timeUntilNext8AM < 0) {
    timeUntilNext8AM += 24 * 60 * 60 * 1000; // Add 24 hours if time has passed
  }

  setTimeout(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("Good Morning!", {
        body: "Start your day with a workout! 🏋️‍♂️",
        icon: "/android-chrome-512x512.png",
      });
    });

    setInterval(() => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Good Morning!", {
          body: "Don't forget your morning workout! 🚴",
          icon: "/android-chrome-512x512.png",
        });
      });
    }, 24 * 60 * 60 * 1000); // Repeat every 24 hours
  }, timeUntilNext8AM);
};

scheduleNotification();



// Function to retrieve streak data
const getWorkoutStreak = async () => {
  return new Promise((resolve) => {
    self.clients.matchAll().then((clients) => {
      if (clients.length > 0) {
        clients[0].postMessage({ type: "GET_STREAK" });
        self.addEventListener("message", (event) => {
          if (event.data.type === "STREAK_RESPONSE") {
            resolve(event.data.streak);
          }
        });
      }
    });
  });
};



const scheduleDailyNotification = () => {
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(8, 3, 0, 0);

  let timeUntilNext8AM = targetTime - now;
  if (timeUntilNext8AM < 0) {
    timeUntilNext8AM += 24 * 60 * 60 * 1000; // Add 24 hours if the time has passed
  }

  setTimeout(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("Good Morning!", {
        body: "Checking your streak progress... 🏋️‍♂️",
        icon: "/android-chrome-512x512.png",
      });

      // Fetch updated streak
      navigator.serviceWorker.controller.postMessage({ type: "GET_STREAK" });

      setInterval(() => {
        navigator.serviceWorker.controller.postMessage({ type: "GET_STREAK" });
      }, 24 * 60 * 60 * 1000);
    });
  }, timeUntilNext8AM);
};

scheduleDailyNotification()











// Function to send notifications every 5 minutes (for testing)
const scheduleTestNotifications =  () => {
  const notificationInterval = 5 * 60 * 1000; // 1 second for testing

  setInterval(async () => {
    console.log("Notification 4 test");

    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Reminder", {
          body: "It's time to check your streak progress! 🏋️‍♂️",
          icon: "/android-chrome-512x512.png",
        });
      }).catch((error) => {
        console.error("Error showing notification:", error);
      });
    } else {
      console.log("Service Worker is not ready yet");
    }
  }, notificationInterval);
};

scheduleTestNotifications();  // Call the function to start sending notifications every 5 minutes


const scheduleNotifications = () => {
  const notificationInterval = 30 * 60 * 1000; // 5 minutes in milliseconds
  setInterval(() => {
    self.registration.showNotification('Reminder', {
      body: "It's time to check your streak progress2222! 🏋️‍♂️",
      icon: '/logo.png',
    });
  }, notificationInterval);
};
console.log("From service worker inside")
// Call this function inside the service worker's activate event to start the notification interval
scheduleNotifications();