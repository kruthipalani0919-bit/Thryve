import { BrowserRouter, Routes, Route } from "react-router-dom";

import AIQuizGenerator from "./pages/AIQuizGenerator";
import AIQuizSession from "./pages/AIQuizSession";

import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MySessions from "./pages/MySessions";
import LiveSession from "./pages/LiveSession";
import JoinSession from "./pages/JoinSession";
import QuizManagement from "./pages/QuizManagement";
import QuizEditor from "./pages/QuizEditor";
import StudentQuiz from "./pages/StudentQuiz";
import PollManagement from "./pages/PollManagement";
import StudentPoll from "./pages/StudentPoll";
import PollResults from "./pages/PollResults";
import AIQuizReview from "./pages/AIQuizReview";
import AIQuizLibrary from "./pages/AIQuizLibrary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/session/:id" element={<LiveSession />} />
        <Route path="/live/:code" element={<LiveSession />} />
       <Route path="/join/:sessionCode" element={<JoinSession />} />
       <Route path="/quiz/:sessionId" element={<QuizManagement />} />
     <Route
    path="/ai-quiz"
    element={<AIQuizGenerator />}
/>
       <Route path="/quiz-editor/:quizId" element={<QuizEditor/>}/>
       <Route path="/student-quiz/:quizId" element={<StudentQuiz/>} />
       <Route path="/polls/:sessionId" element={<PollManagement/>}/>
       <Route path="/student-poll/:pollId" element={<StudentPoll />} />
       <Route path="/poll-results/:pollId" element={<PollResults />} />
  <Route
    path="/ai-quiz-review"
    element={<AIQuizReview />}
/>

<Route
    path="/ai-quiz-review/:quizId"
    element={<AIQuizReview />}
/>

<Route
    path="/ai-quiz-library"
    element={<AIQuizLibrary />}
/>

<Route
    path="/ai-quizzes/:sessionId"
    element={<AIQuizSession />}
/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;