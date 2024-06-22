import React, { useState } from "react";
import { login } from "../api/login";
import { signup } from "../api/signup";
import { useNavigate } from "react-router-dom";
import { enrollStudent } from "../api/enrollStudent";
import { toast } from "react-toastify";

const Admin = () => {
  const navigate = useNavigate();
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const logout = () => {
    // You can implement logout functionality here
    console.log("Logout clicked");
    localStorage.removeItem("admin");
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    navigate("/login");
  };

  const enrollStudentHandler = () => {
    // You can make an API request here to enroll the new student
    enrollStudent({
      email: studentEmail,
      // password: studentPassword,
      // name: studentName,
      // role: "student",
    }).then((response) => {
      console.log(response);
      if (response.success) {
        toast.success("Student enrolled successfully");
        setStudentEmail("");
        setStudentName("");
        setStudentPassword("");
      } else {
        toast.error(response.error.message);
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8 border-b border-gray-500 pb-2">
        <div className="text-3xl font-bold capitalize">Welcome Admin</div>
        <button
          className="bg-red-500 px-3 py-1 rounded text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="mx-auto w-full md:w-1/2 mt-12 border p-4 rounded border-gray-500">
        <div className="mb-4 text-2xl">Enroll a new student</div>
        <div className="flex flex-col space-y-4">
          {/* <input
            type="text"
            placeholder="Enter student name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          /> */}
          <input
            type="email"
            placeholder="Enter student email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
          />
          {/* <input
            type="password"
            placeholder="Enter student password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
            value={studentPassword}
            onChange={(e) => setStudentPassword(e.target.value)}
          /> */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={enrollStudentHandler}
          >
            Enroll Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
