import React from "react";
import { Link } from "react-router-dom";
import quizimg from "../images/quizimg.png";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white py-4 lg:block hidden">
        <div className="container mx-auto flex gap-4 justify-between items-center">
          <h1 className="text-2xl px-3 font-semibold">Quizify</h1>

          <nav className="flex flex-row gap-4">
            <Link
              to="/signup?type=teacher"
              className="px-4 py-2 text-indigo-700 text-lg hover:text-white border border-indigo-700 rounded-lg hover:bg-indigo-700  transition duration-300"
            >
              Get Started as Teacher
            </Link>
            <Link
              to="/signup?type=student"
              className="px-4 py-2 text-indigo-700 text-lg hover:text-white border border-indigo-700 rounded-lg hover:bg-indigo-700  transition duration-300"
            >
              Get Started as Student
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-lg text-gray-700 hover:text-blue-500 font-bold border border-gray-700 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={quizimg}
              alt="Quizify"
              className="h-auto w-3/4 lg:w-3/5"
            />
          </div>
          {/* Welcome and Description Section */}
          <div>
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-4">Welcome to Quizify!</h2>
              <p className="text-lg mb-8">
                Quizify is a platform designed to simplify the process of
                creating and managing quizzes for teachers and providing easy
                access for students to learn and track their progress.
              </p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Teacher Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">For Teachers</h3>
            <p className="text-lg mb-6">
              Create quizzes, manage questions, and track student performance
              effortlessly.
            </p>
            <Link
              to="/signup?type=teacher"
              className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block hover:bg-blue-600"
            >
              Get Started as a Teacher
            </Link>
          </div>
          {/* Student Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">For Students</h3>
            <p className="text-lg mb-6">
              Access quizzes, attempt tests, and monitor your progress with
              ease.
            </p>
            <Link
              to="/signup?type=student"
              className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block hover:bg-blue-600"
            >
              Get Started as a Student
            </Link>
          </div>
          {/* Admin Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">For Admins</h3>
            <p className="text-lg mb-6">
              Manage users, oversee system operations, and ensure smooth
              functionality.
            </p>
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded-md inline-block hover:bg-blue-600"
            >
              Login as an Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
