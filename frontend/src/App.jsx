import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MySessions from "./pages/MySessions";
import LiveSession from "./pages/LiveSession";
import JoinSession from "./pages/JoinSession";


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;