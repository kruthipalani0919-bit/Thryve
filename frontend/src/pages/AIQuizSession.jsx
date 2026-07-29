import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";

import {
    getAssignedAIQuizzes,
    startAIQuiz
} from "../services/aiQuizApi";

const AIQuizSession = () => {

    const { sessionId } = useParams();
    const navigate = useNavigate(); 

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {

        loadAIQuizzes();

    }, []);

    const loadAIQuizzes = async () => {

        try {

            const data = await getAssignedAIQuizzes(sessionId);

            setQuizzes(data);

        }

        catch (err) {

            console.log(err);

            alert("Failed to load AI Quizzes");

        }

    };

    const handleStart = async (quizId) => {

        try {

            await startAIQuiz(quizId);

            alert("AI Quiz Started");

        }

        catch (err) {

            console.log(err);

            alert("Failed to start AI Quiz");

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

                            AI Quizzes

                        </h1>

                        <p className="mt-2 text-gray-500">

                            AI quizzes assigned to this session.

                        </p>

                        <div className="mt-8 space-y-5">

                            {

                                quizzes.length === 0 ?

                                (

                                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">

                                        No AI Quiz Assigned

                                    </div>

                                )

                                :

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

                                       <div className="flex gap-3">

    <button
        onClick={() =>
            navigate(`/ai-quiz-review/${quiz.id}`)
        }
        className="rounded-lg bg-black-600 px-6 py-3 text-white"
    >
        Open Quiz
    </button>

    <button
        onClick={() => handleStart(quiz.id)}
        className="rounded-lg bg-green-600 px-6 py-3 text-white"
    >
        Start Quiz
    </button>

</div>
                                    </div>

                                ))

                            }

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

};

export default AIQuizSession;