import express from "express";
import {
  addQuestion,
  addQuiz,
  getAllQuizByTeacher,
  getQuiz,
  removeQuestion,
  shareQuiz,
} from "../controllers/quiz.js";

const router = express.Router();
router.post("/addQuiz", addQuiz);
router.post("/addQuestion", addQuestion);
router.get("/getQuiz/:quizId", getQuiz);
router.get("/getAllQuizByTeacher/:teacherId", getAllQuizByTeacher);
router.post("/removeQuestion", removeQuestion);
router.post("/shareQuiz", shareQuiz);

export default router;
