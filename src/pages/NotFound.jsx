import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Oops! The page you're looking for doesn't exist.
        </h2>
        <p className="text-gray-500 mb-6">
          It seems we can't find the page you're looking for. Try going back to the homepage.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
