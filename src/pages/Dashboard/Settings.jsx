import React,{ useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const Settings = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted PWA installation");
        } else {
          console.log("User dismissed PWA installation");
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
          icon: "/android-chrome-512x512.png",
        });
      }
    }
  };
  

  //     <div className="max-w-md mx-auto mt-10">
  //       <h1 className="text-xl font-bold mb-4">Settings</h1>
  //       <div className="mb-4">
  //         <label className="flex items-center">
  //           <input
  //             type="checkbox"
  //             checked={theme === 'dark'}
  //             onChange={toggleTheme}
  //             className="mr-2"
  //           />
  //           Dark Mode
  //         </label>
  //       </div>
  //       <button
  //         onClick={logout}
  //         className="w-full bg-red-500 text-white py-2 rounded"
  //       >
  //         Logout
  //       </button>
  //       <div>
  //       <h2>Settings</h2>
  //       <button onClick={installPWA} >
  //         Install Fitz App
  //       </button>
  //       <br />
  //       <button onClick={requestNotificationPermission}>
  //   Enable Notifications
  // </button>
  
  //     </div>
  //     </div>
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Settings</h1>

      {/* Dark Mode Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="mr-2"
          />
          Dark Mode
        </label>
      </div>

      {/* Install PWA Button */}
      <div className="mb-6">
        <button
          onClick={installPWA}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Install Fitz App
        </button>
      </div>

      {/* Enable Notifications Button */}
      <div className="mb-6">
        <button
          onClick={requestNotificationPermission}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Enable Notifications
        </button>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
