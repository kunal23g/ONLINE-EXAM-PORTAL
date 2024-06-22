import React, { useState } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // State variables to store form data
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showAlert = (message) => {
    console.log(message);
    toast.error(message);
  };
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset form fields
    login({ email, password }).then((response) => {
      console.log(response);
      if (response.success) {
        setEmail("");
        setPassword("");
        if (response.success && response.data.role === "student") {
          localStorage.setItem("student", JSON.stringify(response.data));
          // Redirect to student dashboard
          navigate(`/student/${response.data._id}`);
        } else if (response.success && response.data.role === "teacher") {
          // Redirect to teacher dashboard
          localStorage.setItem("teacher", JSON.stringify(response.data));
          navigate(`/teacher/${response.data._id}`);
        } else if (response.success && response.data.role === "admin") {
          // Redirect to admin dashboard
          localStorage.setItem("admin", JSON.stringify(response.data));
          navigate(`/admin/${response.data._id}`);
        } else {
          alert("Invalid credentials");
        }
      }
      if (!response.success) {
        console.log(response.error.message);
        showAlert(response.error.message);
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password:</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login Now
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create Account
          </a>
        </p>
        <p className="mt-4 text-center">
          Forgot password?{" "}
          <a href="/forgotPassword" className="text-blue-500 hover:underline">
            Reset Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
