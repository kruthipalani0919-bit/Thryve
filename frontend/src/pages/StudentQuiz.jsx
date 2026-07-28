import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { submitQuiz } from "../services/quizApi";

const StudentQuiz = () => {

    const { quizId } = useParams();

    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);

    // Load quiz only once
    useEffect(() => {
        loadQuiz();
    }, []);

    // Countdown Timer
    useEffect(() => {

        if (!timerStarted || submitted) return;

        if (timeLeft <= 0) {

            handleSubmit();

            return;

        }

        console.log("Timer:", timeLeft);

        const timer = setTimeout(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [timeLeft, timerStarted, submitted]);

    const loadQuiz = async () => {

        try {

            const quizRes = await api.get(`/quizzes/${quizId}`);

            setQuiz(quizRes.data);

            console.log("Duration:", quizRes.data.duration);
console.log("Status:", quizRes.data.status);

            if (quizRes.data.status === "live") {

                // Start timer only once
                if (!timerStarted) {

                    setTimeLeft(Number(quizRes.data.duration));

                    setTimerStarted(true);

                }

                const questionRes = await api.get(`/quizzes/${quizId}/questions`);

                setQuestions(questionRes.data);

            } else {

                setQuestions([]);

            }

        } catch (err) {

            console.log(err);

        }

    };

    const handleSubmit = async () => {

        if (submitted) return;

        try {

            const result = await submitQuiz(answers);

            setSubmitted(true);

            alert(
                `Quiz Submitted!\n\nScore: ${result.score}/${result.total}`
            );

        }

        catch (err) {

            console.log(err);

            alert("Submission Failed");

        }

    };

    if (!quiz) {

        return (
            <h2 className="p-10 text-xl">
                Loading Quiz...
            </h2>
        );

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold">
                    {quiz.title}
                </h1>

                <p className="mt-3 text-lg font-semibold text-red-600">
                    Time Left : {timeLeft} Seconds
                </p>

                <hr className="my-6" />

                {questions.length === 0 ? (

                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        Waiting for faculty to start the quiz...
                    </div>

                ) : (

                    questions.map((q, index) => (

                        <div
                            key={q.id}
                            className="mb-10 rounded-lg border p-6"
                        >

                            <h2 className="text-xl font-semibold">
                                Q{index + 1}. {q.question}
                            </h2>

                            <div className="mt-4 space-y-3">

                                <label className="block">

                                    <input
                                        type="radio"
                                        name={q.id}
                                        value="A"
                                        checked={answers[q.id] === "A"}
                                        onChange={(e) =>
                                            setAnswers({
                                                ...answers,
                                                [q.id]: e.target.value
                                            })
                                        }
                                    />

                                    {" "}
                                    {q.option_a}

                                </label>

                                <label className="block">

                                    <input
                                        type="radio"
                                        name={q.id}
                                        value="B"
                                        checked={answers[q.id] === "B"}
                                        onChange={(e) =>
                                            setAnswers({
                                                ...answers,
                                                [q.id]: e.target.value
                                            })
                                        }
                                    />

                                    {" "}
                                    {q.option_b}

                                </label>

                                {q.option_c && (

                                    <label className="block">

                                        <input
                                            type="radio"
                                            name={q.id}
                                            value="C"
                                            checked={answers[q.id] === "C"}
                                            onChange={(e) =>
                                                setAnswers({
                                                    ...answers,
                                                    [q.id]: e.target.value
                                                })
                                            }
                                        />

                                        {" "}
                                        {q.option_c}

                                    </label>

                                )}

                                {q.option_d && (

                                    <label className="block">

                                        <input
                                            type="radio"
                                            name={q.id}
                                            value="D"
                                            checked={answers[q.id] === "D"}
                                            onChange={(e) =>
                                                setAnswers({
                                                    ...answers,
                                                    [q.id]: e.target.value
                                                })
                                            }
                                        />

                                        {" "}
                                        {q.option_d}

                                    </label>

                                )}

                            </div>

                        </div>

                    ))

                )}

                {questions.length > 0 && !submitted && (

                    <button
                        onClick={handleSubmit}
                        className="mt-6 rounded-xl bg-green-600 px-8 py-3 text-white"
                    >
                        Submit Quiz
                    </button>

                )}

            </div>

        </div>

    );

};

export default StudentQuiz;