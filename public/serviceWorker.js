const CACHE_NAME = "fitz-cache-v1";
const urlsToCache = ["/", "/offline.html", "/workout-history", "/routines"];

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
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});


self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker Installed");
});

self.addEventListener("activate", (event) => {
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
