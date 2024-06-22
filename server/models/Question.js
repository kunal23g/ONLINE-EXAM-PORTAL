import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      items: {
        option: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
      required: true,
    },
    quizId: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
    },
    duration: {
      type: Number,
    },
    marks: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
