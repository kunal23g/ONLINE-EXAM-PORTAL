import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../api/getUser";
import { updateUser } from "../api/updateUser";

const Student = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));
  const [quizzes, setQuizzes] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [studentName, setStudentName] = useState(student.name);
  const [studentEmail, setStudentEmail] = useState(student.email);

  useEffect(() => {
    // Fetch quiz list from the server
    getUser(studentId).then((response) => {
      if (response.success) {
        setQuizzes(response.data.sharedQuiz);
      }
    });
  }, [studentId]);

  const attemptQuizHandler = (quizId) => () => {
    console.log("Attempting quiz", quizId);
    navigate(`/quiz/${quizId}`);
  };
  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    navigate("/login");
  };

  const updateUserHandler = () => {
    updateUser({
      userId: studentId,
      name: studentName,
      email: studentEmail,
      role: "student",
    }).then((response) => {
      console.log(response);
      if (response.success) {
        setShowUpdateModal(false);
        localStorage.setItem("student", JSON.stringify(response.data));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showUpdateModal && (
        <div>
          <div className=" flex flex-row justify-center  pt-24 fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-5 backdrop-blur-sm z-50">
            <div className="bg-white mt-12 border border-gray-500 rounded p-6 h-[240px] w-1/2 ">
              <div className="flex justify-between">
                <div className="text-2xl mb-4">Update Details</div>
                <div
                  className="text-2xl extra-bold text-red-600 cursor-pointer"
                  onClick={() => setShowUpdateModal(false)}
                >
                  x
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mb-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="mb-4 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none"
                />
              </div>
              <div>
                <button
                  className="bg-green-800 rounded px-4 w-full py-2 text-white"
                  onClick={updateUserHandler}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between align-center border-b border-gray-400 pb-4">
        <div className="text-3xl font-bold capital">Welcome</div>
        <div>
          <button
            className="bg-red-500 px-3 py-1 px-4 text-xl rounded text-white"
            onClick={logout}
          >
            Logout
          </button>
          <button
            className="bg-green-500 px-3 text-xl py-1 px-4 rounded text-white ml-2"
            onClick={() => setShowUpdateModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="text-2xl  mb-4 mt-8 font-semibold">
        Quizzes Shared with You
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-xl font-semibold mb-4">{quiz.name}</div>
            </div>
            <button
              onClick={attemptQuizHandler(quiz.id)}
              className="mt-4 text-xl font-semibold bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Attempt Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
