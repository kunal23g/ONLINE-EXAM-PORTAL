import React, { useState } from "react";
import { signup } from "../api/signup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  // State variables to store form data
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is 'student'

  const showAlert = (message) => {
    toast.error(message);
  };

  const showSuccess = (message) => {
    toast.success(message);
  };

  const validatePassword = () => {
    const regex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    if (!regex.test(password)) {
      showAlert("Password must contain at least one special character.");
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validatePassword()) return;
    // Send form data to backend or perform validation/authentication
    console.log("Form submitted:", { email, name, password, role });
    // Reset form fields
    signup({ email, name, password, role }).then((response) => {
      console.log(response);
      if (response.success) {
        setEmail("");
        setName("");
        setPassword("");
        setRole("student");
        if (response.success && response.data.role === "teacher") {
          // Redirect to teacher dashboard
          localStorage.setItem("student", JSON.stringify(response.data));
          navigate(`/teacher/${response.data._id}`);
        } else if (response.success && response.data.role === "student") {
          // Redirect to student dashboard
          localStorage.setItem("student", JSON.stringify(response.data));
          navigate(`/student/${response.data._id}`);
        } else if (response.success && response.data.role === "admin") {
          // Redirect to admin dashboard
          localStorage.setItem("admin", JSON.stringify(response.data));
          navigate(`/admin/${response.data._id}`);
        } else {
          showAlert("Invalid credentials");
        }
        showSuccess("Account created successfully!");
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
        <h2 className="text-2xl mb-6 text-center">Create Account</h2>
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
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="mb-4">
            <label className="block mb-1">Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
