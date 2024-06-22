import express from "express";
import {
  enrollStudent,
  forgotPassword,
  getEnrolledStudents,
  getUser,
  signin,
  signup,
  updateUser,
} from "../controllers/auth.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/updateUser", updateUser);
router.post("/forgotPassword", forgotPassword);
router.post("/enrollStudent", enrollStudent);
router.get("/getUser/:userId", getUser);
router.get("/getEnrolledStudents", getEnrolledStudents);

export default router;
