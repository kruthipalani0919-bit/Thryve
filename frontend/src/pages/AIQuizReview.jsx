import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAIQuiz } from "../services/aiQuizApi";

const AIQuizReview = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(
        location.state?.quiz || []
    );

    const updateQuestion = (index, field, value) => {

        const updated = [...quiz];

        updated[index][field] = value;

        setQuiz(updated);

    };

    const handleSaveQuiz = async () => {

        try {

            await saveAIQuiz({

                title: "AI Generated Quiz",

                questions: quiz

            });

            alert("Quiz Saved Successfully!");

            navigate("/ai-quiz-library");

        }

        catch (err) {

            console.log(err);

            alert("Failed to Save Quiz");

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold">
                    Review AI Generated Quiz
                </h1>

                <p className="mt-2 text-gray-500">
                    Review every question before publishing.
                </p>

                <hr className="my-6" />

                <div className="space-y-6">

                    {Array.isArray(quiz) && quiz.map((q, index) => (

                        <div
                            key={index}
                            className="rounded-xl border p-6 shadow-sm"
                        >

                            <h2 className="text-xl font-bold text-orange-600">
                                Question {index + 1}
                            </h2>

                            <input
                                className="mt-4 w-full rounded border p-3"
                                value={q.question}
                                onChange={(e) =>
                                    updateQuestion(
                                        index,
                                        "question",
                                        e.target.value
                                    )
                                }
                            />

                            <div className="mt-5 grid gap-3">

                                <input
                                    className="rounded border p-3"
                                    value={q.option_a}
                                    onChange={(e) =>
                                        updateQuestion(
                                            index,
                                            "option_a",
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    className="rounded border p-3"
                                    value={q.option_b}
                                    onChange={(e) =>
                                        updateQuestion(
                                            index,
                                            "option_b",
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    className="rounded border p-3"
                                    value={q.option_c}
                                    onChange={(e) =>
                                        updateQuestion(
                                            index,
                                            "option_c",
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    className="rounded border p-3"
                                    value={q.option_d}
                                    onChange={(e) =>
                                        updateQuestion(
                                            index,
                                            "option_d",
                                            e.target.value
                                        )
                                    }
                                />

                                <div className="mt-3">

                                    <label className="font-semibold">
                                        Correct Answer
                                    </label>

                                    <select
                                        className="ml-4 rounded border p-2"
                                        value={q.correct_answer}
                                        onChange={(e) =>
                                            updateQuestion(
                                                index,
                                                "correct_answer",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>

                                </div>

                                <div className="mt-4">

                                    <label className="font-semibold block mb-2">
                                        Explanation
                                    </label>

                                    <textarea
                                        className="w-full rounded border p-3"
                                        rows={4}
                                        value={q.explanation || ""}
                                        onChange={(e) =>
                                            updateQuestion(
                                                index,
                                                "explanation",
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="mt-10 flex justify-end">

                    <button

                        onClick={handleSaveQuiz}

                        className="rounded-xl bg-orange-500 px-8 py-3 text-white hover:bg-orange-600"

                    >

                        Save AI Quiz

                    </button>

                </div>

            </div>

        </div>

    );

};

export default AIQuizReview;