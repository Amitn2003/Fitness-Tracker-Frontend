import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulating user authentication (Replace with real auth logic)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Transform Your Fitness Journey
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Track workouts, build routines, and stay fit effortlessly.
        </p>
        <div className="mt-6 flex gap-4">
          {!isLoggedIn ? (
            <Link to="/register" className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 text-lg">
              Get Started
            </Link>
          ) : (
            <>
              <Link to="/routines" className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 text-lg">
                View Routines
              </Link>
              <Link to="/workout-history" className="px-6 py-3 bg-purple-500 rounded-lg hover:bg-purple-600 text-lg">
                Workout History
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Choose Fitz?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Personalized Workout Routines",
            "Track Progress & Analytics",
            "Exercise Database with Video Guides",
            "Mobile & Desktop Friendly",
            "Easy-to-Use Interface",
            "Community & Challenges",
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Fitness Stats Section */}
      <section className="py-16 px-6 bg-gray-800 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Fitness Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "80% of people who exercise regularly report improved mental health.",
            "Regular exercise reduces the risk of chronic diseases by 40%.",
            "Students who exercise perform 20% better in academics.",
            "Only 23% of adults get the recommended amount of exercise per week.",
            "Lack of exercise increases stress, anxiety, and risk of obesity.",
          ].map((stat, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-md">
              <p className="text-lg">{stat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Importance for Students */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Students Need Fitness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Boosts Concentration & Focus",
            "Reduces Stress & Anxiety",
            "Improves Memory & Learning Abilities",
            "Enhances Physical & Mental Well-being",
            "Encourages Healthy Lifestyle Habits",
          ].map((importance, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{importance}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-green-600">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Start Your Fitness Journey Today!</h2>
        <div className="flex justify-center gap-4">
          {!isLoggedIn ? (
            <Link to="/register" className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200 text-lg">
              Join Now
            </Link>
          ) : (
            <Link to="/workout-history" className="px-6 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-200 text-lg">
              Explore Workouts
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
