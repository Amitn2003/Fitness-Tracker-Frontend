import React,{ useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const Settings = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted PWA installation");
        }
        setDeferredPrompt(null);
      });
    }
  };
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        new Notification("Notifications Enabled!", {
          body: "You will now receive fitness updates.",
          icon: "/icons/icon-192x192.png",
        });
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="mr-2"
          />
          Dark Mode
        </label>
      </div>
      <button
        onClick={logout}
        className="w-full bg-red-500 text-white py-2 rounded"
      >
        Logout
      </button>
      <div>
      <h2>Settings</h2>
      <button onClick={installPWA} disabled={!deferredPrompt}>
        Install Fitz App
      </button>
      <button onClick={requestNotificationPermission}>
  Enable Notifications
</button>

    </div>
    </div>
  );
};

export default Settings;
