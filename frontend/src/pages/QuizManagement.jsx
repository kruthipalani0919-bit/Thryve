import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CreateQuizModal from "../components/quiz/CreateQuizModal";
import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";
import { startQuiz } from "../services/quizApi";

import api from "../services/api";

const QuizManagement = () => {

  const { sessionId } = useParams();

   const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {

    try {

  const res = await api.get(`/quizzes/session/${sessionId}`);

      setQuizzes(res.data);

    } catch (err) {

      console.log(err);

    }

  };


 const handleStartQuiz = async (quizId) => {

    try {

        await startQuiz(quizId);

        alert("Quiz Started Successfully!");

        loadQuizzes();

    } catch (err) {

        console.log(err);

        alert("Failed to start quiz");

    }

};

  return (

    <div className="flex min-h-screen bg-slate-100">

      <FacultySidebar />

      <div className="flex-1">

        <FacultyTopbar />

        <main className="p-8">

          <div className="flex items-center justify-between">

            <h1 className="text-4xl font-bold">
              Quiz Management
            </h1>

            <button
              onClick={() => setOpenModal(true)}
              className="rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
            >
              + Create Quiz
            </button>

          </div>

          <div className="mt-8 grid gap-5">

            {quizzes.map((quiz) => (

              <div
                key={quiz.id}
                className="rounded-2xl bg-white p-6 shadow"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {quiz.title}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      Duration : {quiz.duration} seconds
                    </p>

                    <p className="text-slate-500">
                      Status : {quiz.status}
                    </p>

                  </div>
<div className="flex gap-3">

    <button
        onClick={() => navigate(`/quiz-editor/${quiz.id}`)}
        className="rounded-xl bg-black px-6 py-3 text-white hover:bg-orange-500 transition"
    >
        Open Quiz
    </button>

    <button
        onClick={() => handleStartQuiz(quiz.id)}
        className="rounded-xl bg-black px-6 py-3 text-white hover:bg-orange-500 transition"
    >
        Start Quiz
    </button>

</div>
                </div>

              </div>

            ))}

          </div>

        </main>

      </div>

      <CreateQuizModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sessionId={sessionId}
        refreshQuizzes={loadQuizzes}
      />

    </div>

  );

};

export default QuizManagement;