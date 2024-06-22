import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
    },
    totalMarks: {
      type: Number,
    },
    totalQuestions: {
      type: Number,
    },
    studentList: {
      type: Array,
      items: {
        studentId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          unique: true,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      default: [],
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
