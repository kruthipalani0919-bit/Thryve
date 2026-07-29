import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";

import {
    getAllAIQuizzes,
    assignAIQuiz
} from "../services/aiQuizApi";

import { getAllSessions } from "../services/sessionApi";

const AIQuizLibrary = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        loadQuizzes();
        loadSessions();

    }, []);

    const loadQuizzes = async () => {

        try {

            const data = await getAllAIQuizzes();

            setQuizzes(data);

        }

        catch (err) {

            console.log(err);

            alert("Failed to load AI Quizzes");

        }

    };

    const loadSessions = async () => {

        try {

            const data = await getAllSessions();

            console.log("========== SESSIONS ==========");
            console.log(data);

            setSessions(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const openAssignModal = (quiz) => {

        setSelectedQuiz(quiz);

        setShowModal(true);

    };

    const assignToSession = async (sessionId) => {

        try {

            await assignAIQuiz({

                aiQuizId: selectedQuiz.id,

                sessionId

            });

            alert("Quiz Assigned Successfully");

            setShowModal(false);

        }

        catch (err) {

            console.log(err);

            alert("Assignment Failed");

        }

    };

    return (

        <div className="flex min-h-screen bg-slate-100">

            <FacultySidebar />

            <div className="flex-1">

                <FacultyTopbar />

                <main className="p-8">

                    <div className="rounded-2xl bg-white p-8 shadow">

                        <h1 className="text-4xl font-bold">
                            AI Quiz Library
                        </h1>

                        <p className="mt-2 text-gray-500">
                            All AI-generated quizzes are stored here.
                        </p>

                        <div className="mt-8 space-y-5">

                            {quizzes.length === 0 ? (

                                <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">

                                    No AI Quizzes Found

                                </div>

                            ) : (

                                quizzes.map((quiz) => (

                                    <div
                                        key={quiz.id}
                                        className="flex items-center justify-between rounded-xl border p-6"
                                    >

                                        <div>

                                            <h2 className="text-xl font-bold">
                                                {quiz.title}
                                            </h2>

                                            <p className="mt-2 text-gray-500">

                                                Difficulty :

                                                <strong className="ml-2">

                                                    {quiz.difficulty}

                                                </strong>

                                            </p>

                                            <p>

                                                Questions :

                                                <strong className="ml-2">

                                                    {quiz.question_count}

                                                </strong>

                                            </p>

                                        </div>

                                        <button
                                            onClick={() => openAssignModal(quiz)}
                                            className="rounded-lg bg-orange-500 px-6 py-3 text-white"
                                        >
                                            Use in Session
                                        </button>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                </main>

                <button
                    onClick={() => navigate("/ai-quiz")}
                    className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transition hover:scale-110 hover:bg-orange-600"
                >
                    <Plus size={32} />
                </button>

                {

                    showModal && (

                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                            <div className="w-[600px] rounded-2xl bg-white p-8 shadow-2xl">

                                <h2 className="text-2xl font-bold">

                                    Select Session

                                </h2>

                                <p className="mt-2 text-gray-500">

                                    Choose a session to assign this AI Quiz.

                                </p>


                                {/* SESSION BUTTONS */}

                                <div className="mt-6 space-y-3">

                                    {sessions.map((session) => (

                                        <button
                                            key={session.id}
                                            onClick={() => assignToSession(session.id)}
                                            className="flex w-full items-center justify-between rounded-lg border p-4 transition hover:bg-orange-50"
                                        >

                                            <div>

                                                <p className="font-semibold">

                                                    {session.title}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {session.session_code}

                                                </p>

                                            </div>

                                            <span className="font-semibold text-orange-500">

                                                Select

                                            </span>

                                        </button>

                                    ))}

                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-6 w-full rounded-lg bg-gray-200 py-3"
                                >

                                    Cancel

                                </button>

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

};

export default AIQuizLibrary;