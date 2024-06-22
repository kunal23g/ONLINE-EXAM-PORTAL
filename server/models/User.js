import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      ref: "Interview",
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    sharedQuiz: {
      type: Array,
      items: {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: mongoose.Types.ObjectId,
          ref: "Quiz",
          required: true,
          unique: true,
        },
      },
      default: [],
    },
    profileImg: {
      type: String,
      default: "",
    },
    streams: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
