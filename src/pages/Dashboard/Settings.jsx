import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

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
    </div>
  );
};

export default Settings;
