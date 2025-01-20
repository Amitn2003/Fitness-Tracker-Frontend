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
      {/* <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6">
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
      </section> */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6">
  <h1 className="text-5xl md:text-7xl font-extrabold text-center leading-tight">
    Your Fitness Journey Starts <span className="text-yellow-400">Now!</span>
  </h1>
  <p className="mt-4 text-lg md:text-2xl text-center max-w-3xl">
    Track your progress, stay consistent, and achieve your fitness goals with ease.
  </p>
  <div className="mt-6 flex gap-4">
    <a href="/register" className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition">
      Get Started
    </a>
    <a href="/routines" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition">
      Explore Workouts
    </a>
  </div>
</section>


      {/* Features Section */}
      {/* <section className="py-16 px-6 text-center">
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
      </section> */}
      <section className="py-16 bg-gray-100 text-gray-900">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">Why Choose <span className="text-blue-600">Fitz?</span></h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Personalized Plans", icon: "📊", desc: "Get customized workout plans based on your fitness level and goals." },
        { title: "Live Progress Tracking", icon: "📈", desc: "Analyze your progress with real-time analytics and streak tracking." },
        { title: "Smart Notifications", icon: "🔔", desc: "Receive daily reminders to stay consistent with your workouts." },
        { title: "Expert Guidance", icon: "💡", desc: "Access tips, video tutorials, and professional training advice." },
        { title: "PWA Ready", icon: "📱", desc: "Use our app anywhere, anytime—install it like a mobile app!" },
        { title: "Community Support", icon: "🤝", desc: "Join a like-minded fitness community and stay motivated!" },
      ].map(({ title, icon, desc }) => (
        <div key={title} className="p-6 bg-white rounded-xl shadow-md text-center">
          <div className="text-5xl">{icon}</div>
          <h3 className="text-xl font-bold mt-4">{title}</h3>
          <p className="text-gray-600 mt-2">{desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-10">Explore Workout Categories</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Strength Training", img: "strength-training.jpg" },
        { title: "Yoga & Flexibility", img: "yoga-meditation.jpg" },
        { title: "Cardio & Endurance", img: "running.jpg" },
      ].map(({ title, img }) => (
        <div key={title} className="relative group overflow-hidden rounded-lg shadow-lg">
          <img src={img} alt={title} className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-300" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


<section className="py-16 bg-gray-100 text-gray-900">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-8">Track Your Progress</h2>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="p-6 bg-white rounded-xl shadow-lg text-center">
        <h3 className="text-3xl font-bold">🔥 Your Streak: <span className="text-blue-600">15 Days</span></h3>
        <p className="text-gray-600 mt-2">Stay consistent and keep pushing your limits!</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-lg text-center">
        <h3 className="text-3xl font-bold">🏆 Total Workouts: <span className="text-blue-600">120</span></h3>
        <p className="text-gray-600 mt-2">Every workout counts towards your fitness journey.</p>
      </div>
    </div>
  </div>
</section>


<section className="py-16 bg-gradient-to-r from-green-500 to-teal-500 text-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-10">Success Stories</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: "Sayan", text: "From beginner to pro, Fitz has been my perfect fitness partner!" },
        { name: "Jit", text: "Best fitness app! Love the workout tracking and analytics." },
        { name: "Amit", text: "Fitz helped me stay consistent. I lost 10kg in 3 months!" },
      ].map(({ name, text }) => (
        <div key={name} className="p-6 bg-white text-gray-900 rounded-lg shadow-md">
          <p className="text-lg italic">“{text}”</p>
          <h3 className="text-xl font-bold mt-4">{name}</h3>
        </div>
      ))}
    </div>
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
            "Exercise boosts brain function and improves memory by 30%.",
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
            "Strengthens Immune System & Increases Longevity",
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
