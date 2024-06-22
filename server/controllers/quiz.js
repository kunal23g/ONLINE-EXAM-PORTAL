import Quiz from "../models/Quiz.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
export const addQuiz = async (req, res) => {
  // Extracting quiz data from request body
  try {
    const { name, teacherId } = req.body;
    const newQuiz = new Quiz({
      name,
      teacherId,
    });

    const savedQuiz = await newQuiz.save();
    res.status(200).json({
      success: true,
      data: savedQuiz?._doc,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
  }
};
export const addQuestion = async (req, res) => {
  // Extracting question data from request body
  try {
    const { quizId, question, options } = req.body;
    const newQuestion = new Question({
      quizId,
      question,
      options,
    });
    const savedQuestion = await newQuestion.save();
    res.status(200).json({
      success: true,
      data: savedQuestion?._doc,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
  }
};
export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findOne({ _id: quizId });
    const questions = await Question.find({ quizId });
    if (!quiz) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Quiz does not exist",
          code: 400,
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: { quiz: quiz, questions: questions },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
  }
};
export const removeQuestion = async (req, res) => {
  try {
    const { questionId } = req.body;
    const question = await Question.findOneAndDelete({ _id: questionId });
    if (!question) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Question does not exist",
          code: 400,
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
  }
};
export const shareQuiz = async (req, res) => {
  try {
    const { quizId, studentId, studentEmail } = req.body;
    console.log(quizId, studentId);
    const quiz = await Quiz.findOne({ _id: quizId });
    if (!quiz) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Quiz does not exist",
          code: 400,
        },
      });
    }

    quiz.studentList.push(studentId);
    const updatedQuiz = await quiz.save();
    console.log(updatedQuiz);

    // const student = await User.findOne({ _id: studentId });
    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Student does not exist",
          code: 400,
        },
      });
    }
    console.log(student);
    student.sharedQuiz.push({ name: quiz.name, id: quiz._id });
    const updatedStudent = await student.save();
    console.log(updatedStudent);
    return res.status(200).json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
        error: error,
      },
    });
  }
};

export const getAllQuizByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const quizzes = await Quiz.find({ teacherId });
    if (!quizzes) {
      return res.status(400).json({
        success: false,
        error: {
          message: "No quizzes found",
          code: 400,
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
  }
};

export const getQuizList = async (req, res) => {};

export const getQuestion = async (req, res) => {};
