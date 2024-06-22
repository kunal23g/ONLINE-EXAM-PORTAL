import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestion } from "../api/addQuestion";
import { inviteStudent } from "../api/inviteStudent";
import { getQuiz } from "../api/getQuiz";
import { removeQuestion } from "../api/removeQuestion";
import { getEnrolledStudents } from "../api/getEnrolledStudents";
import { toast } from "react-toastify";
import Backbtn from "../components/Backbtn";

const Quiz = () => {
  const navigate = useNavigate();
  const { teacherId, quizId } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [optionTexts, setOptionTexts] = useState(["", "", "", ""]); // State to manage the current options being entered
  const [correctOption, setCorrectOption] = useState(""); // State to manage the correct option number
  const [studentEmail, setStudentEmail] = useState(""); // State to manage the student's email for invitation
  const [questionsList, setQuestionsList] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]); // State to manage the list of enrolled students

  useEffect(() => {
    getEnrolledStudents().then((response) => {
      if (response.success) {
        setEnrolledStudents(response.data);
      }
    });
  }, []);
  // Function to handle adding a question
  const handleAddQuestion = async () => {
    if (correctOption.trim() === "") {
      alert("Please enter a valid correct option number (1-4)");
      return;
    }
    const updatedOptions = optionTexts.map((option, index) => ({
      option: optionTexts[index],
      isCorrect: index === correctOption - 1,
    }));
    const newQuestionData = {
      quizId,
      question,
      options: updatedOptions,
    };
    addQuestion(newQuestionData).then((response) => {
      if (response.success) {
        const savedQuestion = response.data;
        setQuestionsList([...questionsList, savedQuestion]);
        // Clear input fields after adding question
        setQuestion("");
        setOptionTexts(["", "", "", ""]);
        setCorrectOption("");
      } else {
        // Handle error
      }
    });
  };

  // Function to handle inviting a student
  const handleInviteStudent = async (studentEmail) => {
    inviteStudent({ quizId, studentEmail }).then((response) => {
      console.log(response);
      if (response.success) {
        // Handle success
        toast.success("Invitation sent successfully");
        setStudentEmail(""); // Clear email input after sending invitation
      } else {
        // Handle error
        toast.error("Error sending invitation");
      }
    });
  };

  useEffect(() => {
    // Fetch questions list for the quiz from the server
    fetchQuestionsList();
  }, []);

  const fetchQuestionsList = () => {
    getQuiz(quizId)
      .then((response) => {
        console.log(response);
        if (response.success) {
          setQuestionsList(response.data.questions);
        } else {
          throw new Error(response.error.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions list:", error);
        // Handle error, for example:
        // setError('Error fetching questions list');
      });
  };

  const deleteQuestion = (questionId) => {
    // Delete the question from the server
    removeQuestion({ questionId }).then((response) => {
      console.log(response);
      if (response.success) {
        // Handle success
        // Remove the question from the questionsList state
        const updatedQuestionsList = questionsList.filter(
          (question) => question._id !== questionId
        );
        setQuestionsList(updatedQuestionsList);
      } else {
        // Handle error
      }
    });
  };
  return (
    <>
      <div>
        <Backbtn />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Edit Quiz</h2>
        <div className="bg-white p-8 rounded-xl">
          {/* Add question form */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-2xl">
              Add Question
            </h3>
            <textarea
              type="text"
              placeholder="Enter your question"
              value={question}
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              className="border text-xl border-gray-300 text-xl rounded-md px-4 py-2 w-full mb-2 focus:outline-none"
            />
            {/* Options input */}
            {optionTexts.map((optionText, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder={`Enter option ${index + 1}`}
                  value={optionText}
                  onChange={(e) => {
                    const newOptionTexts = [...optionTexts];
                    newOptionTexts[index] = e.target.value;
                    setOptionTexts(newOptionTexts);
                  }}
                  className="border text-xl  w-full border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none"
                />
              </div>
            ))}
            <div className="flex items-center mb-2">
              <input
                type="number"
                placeholder="Enter correct option number (1-4)"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                className="border border-gray-300 text-xl rounded-md px-4 py-2  focus:outline-none w-1/2"
              />
            </div>
            {/* Display options */}
            {/* Add question button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddQuestion}
                className="bg-blue-500 text-xl font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
        {/* Invite student form */}
        <div className="mb-8 mt-12 bg-white p-8 rounded-xl">
          <h3 className="text-lg font-semibold mb-2 text-2xl">
            Invite Student
          </h3>
          {/* <input
          type="email"
          placeholder="Enter student email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          className="border border-gray-300 text-xl rounded-md px-4 py-2 w-full mb-2 focus:outline-none"
        /> */}
          <select
            onChange={(e) => handleInviteStudent(e.target.value)}
            className="border border-gray-300 text-xl rounded-md px-4 py-2 w-full mb-2 focus:outline-none"
          >
            {enrolledStudents.map((student) => (
              <option
                key={student._id}
                value={student.email}
                // onClick={() => handleInviteStudent(student.email)}
              >
                {student.email}
              </option>
            ))}
          </select>
          {/* <div className="flex justify-end mt-4">
          <button
            onClick={handleInviteStudent}
            className="bg-blue-500 text-white px-4 text-xl py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Invite Student
          </button>
        </div> */}
        </div>

        {/* Display questions */}
        <div className="bg-white p-8 rounded-xl">
          <h3 className=" font-semibold mb-2 text-3xl">Questions</h3>
          {questionsList.map((questionItem, index) => (
            <div key={questionItem._id} className="mb-4 mt-4">
              <div className="text-xl font-semibold mb-2">
                Q{index + 1}. {questionItem.question}
              </div>
              {/* Check if options exist */}
              {questionItem.options.length > 0 && (
                <ul className="text-xl">
                  {questionItem.options.map((option, idx) => (
                    <li key={idx}>
                      {/* Render option with alphabet prefix */}
                      {String.fromCharCode(97 + idx)}. {option.option}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg"
                  onClick={() => deleteQuestion(questionItem._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Quiz;
