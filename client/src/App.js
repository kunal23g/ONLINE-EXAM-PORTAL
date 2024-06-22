import logo from "./logo.svg";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Teacher from "./pages/Teacher";
import Quiz from "./pages/Quiz";
import Student from "./pages/Student";
import QuizDashboard from "./pages/QuizDashboard";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import CreateQuiz from "./pages/CreateQuiz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <div className="app">
      <Router>
        <ToastContainer />
        <Routes>
          <Route index path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/createQuiz/:teacherId" element={<CreateQuiz />} />
          <Route path="login" element={<Login />} />
          <Route path="admin/:adminId" element={<Admin />} />
          <Route path="/teacher/:id" element={<Teacher />} />
          <Route path="/student/:studentId" element={<Student />} />
          <Route path="/quiz/:quizId" element={<QuizDashboard />} />
          <Route path="/edit-quiz/:teacherId/:quizId" element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
