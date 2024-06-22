import React, { useState, useEffect } from "react";
import { addQuiz } from "../api/addQuiz";
import { useNavigate, useParams } from "react-router-dom";
import { getAllQuizByTeacher } from "../api/getAllQuizByTeacher";

const Teacher = () => {
  const navigate = useNavigate();
  const { id: teacherId } = useParams();
  const [quizName, setQuizName] = useState("");
  const [quizList, setQuizList] = useState([]);
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  useEffect(() => {
    // Fetch quiz list from the server
    getAllQuizByTeacher(teacherId).then((response) => {
      if (response.success) {
        setQuizList(response.data);
      }
    });
  }, []);

  const handleAddQuiz = () => {
    navigate(`/createQuiz/${teacherId}`);
  };

  const handleEdit = (quizId) => () => {
    // Redirect to edit quiz page
    navigate(`/edit-quiz/${teacherId}/${quizId}`);
  };
  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
    navigate("/login");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between align-center mb-8 border-b border-gray-500 border-solid border-1 pb-2">
        <div className="text-3xl font-bold capital">Welcome</div>
        <button
          className="bg-red-500 px-3 py-1 rounded text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="mb-8 w-full flex  justify-end">
        <button
          onClick={handleAddQuiz}
          className="mt-2 bg-blue-500 text-white px-4 py-3 text-xl font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Create New Quiz
        </button>
      </div>
      <div className="bg-white rounded p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Your Quiz List</h2>
        {quizList.map((quiz) => (
          <div
            key={quiz._id}
            className="mb-4 flex justify-between items-center border border-gray-300 p-2 rounded-xl bg-gray-100"
          >
            <div className="text-xl font-semibold">{quiz.name}</div>
            <button
              onClick={handleEdit(quiz._id)}
              className=" text-xl bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teacher;
