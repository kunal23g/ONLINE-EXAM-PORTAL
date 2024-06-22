import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addQuiz } from "../api/addQuiz";

import Backbtn from "../components/Backbtn";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();

  const [quizName, setQuizName] = useState("");
  const handleAddQuiz = async () => {
    addQuiz({ name: quizName, teacherId }).then((response) => {
      console.log(response);
      if (response.success) {
        setQuizName("");
        navigate(`/edit-quiz/${teacherId}/${response.data._id}`);
      }
    });
  };
  return (
    <>
      <div>
        <Backbtn />
      </div>
      <div className="flex justify-center">
        <div className="mb-8 mt-24 p-8 bg-white rounded-xl border border-color-gray-200">
          <h2 className="text-3xl font-bold mb-4">Add a New Quiz</h2>
          <div className="">
            <input
              type="text"
              placeholder="Enter your quiz name"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-500 rounded-lg focus:outline-none w-[420px] text-xl"
            />
            <br />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddQuiz}
                className="mt-2 bg-blue-500 text-xl font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Add Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
