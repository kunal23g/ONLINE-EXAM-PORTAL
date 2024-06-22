import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("hey reached at register User", name, email, password);
    const existingAccount = await User.findOne({ email });
    console.log(existingAccount, "aa");
    if (existingAccount) {
      return res.status(200).json({
        success: false,
        error: {
          message: "User already exists",
          code: 400,
        },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });
    const savedAccount = await newAccount.save();
    console.log(savedAccount);
    delete savedAccount.password;
    return res.status(200).json({
      success: true,
      data: { ...savedAccount?._doc },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("hey reached at register User", email, password);
    const existingAccount = await User.findOne({ email });
    console.log(existingAccount, "aa");
    if (existingAccount) {
      const pass = existingAccount.password;
      const validate = await bcrypt.compare(password, pass);
      console.log("valid", validate);
      delete existingAccount.password;
      if (validate) {
        return res.status(200).json({
          success: true,
          data: existingAccount,
        });
      } else {
        return res.status(200).json({
          success: false,
          error: {
            message: "Incorrect Credentials",
            code: 400,
          },
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        error: {
          message: "User does not exist",
          code: 400,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        message: "Something went wrong",
        code: 400,
      },
    });
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  console.log("updateUser");
  const { userId, name, email, role } = req.body;
  // Checking if user exists
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      success: false,
      error: {
        message: "User does not exist",
        code: 400,
      },
    });
  }
  // Updating user
  user.name = name;
  user.email = email;
  user.role = role;
  await user.save();
  return res.status(200).json({ success: true, data: user });
};

export const getUser = async (req, res) => {
  console.log("getUser");

  const { userId } = req.params;
  // Checking if user exists
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      success: false,
      error: {
        message: "User does not exist",
        code: 400,
      },
    });
  }
  delete user.password;
  return res.status(200).json({ success: true, data: user });
};
export const forgotPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      error: {
        message: "User does not exist",
        code: 400,
      },
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  return res.status(200).json({ success: true, data: user });
};

export const enrollStudent = async (req, res) => {
  const { email } = req.body;
  const student = await User.findOne({ email: email });
  if (!student) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Student does not exist",
        code: 400,
      },
    });
  }
  student.isEnrolled = true;
  await student.save();
  return res.status(200).json({ success: true, data: student });
};

export const getEnrolledStudents = async (req, res) => {
  const students = await User.find({ isEnrolled: true });
  return res.status(200).json({ success: true, data: students });
};
