import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const Navbar = () => {
  const {  logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check if user data and token exist in localStorage on initial render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user state from localStorage
    }
  }, []);


  const handleLogout = () => {
    // Remove user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");

    // Call logout function from custom hook
    logout();

    // Reset the user state
    setUser(null);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Fitz
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/profile" className="hover:text-gray-300">
                Profile
              </Link>
              <Link to="/workout-history" className="hover:text-gray-300">
                Workouts
              </Link>
              <Link to="/routines" className="hover:text-gray-300">
                Routines
              </Link>
              <Link to="/settings" className="hover:text-gray-300">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
