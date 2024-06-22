import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuiz } from "../api/getQuiz";
import Backbtn from "../components/Backbtn";

const QuizDashboard = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Fetch quiz data from the server
    getQuiz(quizId)
      .then((response) => {
        if (response.success) {
          setQuiz(response.data.quiz);
          setQuestions(response.data.questions);
        }
      })
      .catch((error) => console.error("Error fetching quiz:", error));
  }, [quizId]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!questions.length) {
    return <div>There is no question in this quiz</div>;
  }

  const resultHandler = () => {
    let correctAnswers = 0;
    console.log(questions);
    questions.forEach((question, index) => {
      let correctOption = question.options.findIndex(
        (option) => option.isCorrect
      );
      if (correctOption === selectedAnswers[index]) {
        correctAnswers++;
      }
    });
    setResult(correctAnswers);
    setShowResult(true);
  };

  const homepageHandler = () => {
    // Redirect to homepage
    const student = JSON.parse(localStorage.getItem("student"));
    navigate(`/student/${student._id}`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return showResult ? (
    <div className="w-full h-100 flex align-center justify-center">
      <div>
        <div className="mt-12 text-5xl ">Quiz result</div>
        <div className="mt-2 text-3xl text-center text-blue-500">
          You got{" "}
          <span>
            {result}/{questions.length}
          </span>
        </div>
        <div className="text-center mt-8">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={homepageHandler}
          >
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between align-center mb-8 border-b border-gray-500 p-4">
          <Backbtn />
          <h2 className="text-3xl font-bold">{quiz?.name}</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => resultHandler()}
          >
            Submit
          </button>
        </div>

        <div className="mb-4">
          <div className="bg-white p-8 rounded-xl">
            <div>
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="text-2xl mb-4">{currentQuestion.question}</div>
            <div className="">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="mb-2 text-2xl">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="options"
                    checked={selectedAnswers[currentQuestionIndex] === index}
                    onChange={() => handleOptionSelect(index)}
                    className="mr-2"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <label htmlFor={`option${index}`}>{option.option}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-blue-500 text-white px-4 text-xl py-2 rounded-md mr-2"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-blue-500 text-white text-xl px-4 py-2 rounded-md mr-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizDashboard;
