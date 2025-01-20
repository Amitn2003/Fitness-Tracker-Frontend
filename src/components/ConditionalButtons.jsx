import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useAuth } from "../hooks/useAuth"; // Ensure you have the hook to check user authentication

const ConditionalButtons = () => {
  const { user } = useAuth();  // Assuming `user` is the logged-in user object (or use another method to check login status)

  return (
    <div className="mt-6 flex gap-4">
      {!user ? (
        <>
          <Link
            to="/register"
            className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Log In
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/routines"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Start Workout
          </Link>
          <Link
            to="/workout-history"
            className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Workout History
          </Link>
        </>
      )}
    </div>
  );
};

export default ConditionalButtons;
