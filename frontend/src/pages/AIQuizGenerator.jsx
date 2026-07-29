import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";
import { generateAIQuiz } from "../services/aiQuizApi";

const AIQuizGenerator = () => {

    const [file, setFile] = useState(null);
    const [questionCount, setQuestionCount] = useState(10);
    const [difficulty, setDifficulty] = useState("Medium");
    const [loading, setLoading] = useState(false);
const [generatedQuiz, setGeneratedQuiz] = useState(null);
const navigate = useNavigate();
const handleGenerateQuiz = async () => {

    if (!file) {

        alert("Please upload a PDF first.");

        return;

    }

    try {

        setLoading(true);

        const formData = new FormData();

        formData.append("file", file);

        formData.append(

            "questionCount",

            questionCount

        );

        formData.append(

            "difficulty",

            difficulty

        );

        const result = await generateAIQuiz(

            formData

        );

        console.log("===== FRONTEND RESULT =====");
console.log(result);
console.log(result.quiz);

        console.log(result);
navigate("/ai-quiz-review", {

    state: {

        quiz: result.quiz

    }

});

    }

    catch (err) {

        console.log(err);

        alert("Generation Failed");

    }

    finally {

        setLoading(false);

    }

};


    return (

        <div className="flex min-h-screen bg-slate-100">

            <FacultySidebar />

            <div className="flex-1">

                <FacultyTopbar />

                <main className="p-8">

                    <div className="rounded-2xl bg-white p-8 shadow">

                        <div>

                            <h1 className="text-4xl font-bold">
                                AI Quiz Generator ✨
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Upload your lecture notes and let AI generate quiz questions automatically.
                            </p>

                        </div>

                        <div className="mt-10 grid gap-10 lg:grid-cols-2">

                            {/* Upload Section */}

                            <div>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    Upload Study Material
                                </h2>

                                <label
                                    htmlFor="fileUpload"
                                    className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 transition hover:bg-orange-100"
                                >

                                    <div className="text-center">

                                        <div className="text-6xl">
                                            📄
                                        </div>

                                        <h3 className="mt-4 text-xl font-semibold">
                                            Drag & Drop PDF / PPT
                                        </h3>

                                        <p className="mt-2 text-gray-500">
                                            or click to browse your files
                                        </p>

                                        <p className="mt-6 text-sm text-gray-400">
                                            Supported formats :
                                            PDF, PPT, PPTX
                                        </p>

                                    </div>

                                </label>

                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept=".pdf,.ppt,.pptx"
                                    className="hidden"
                                    onChange={(e) =>
                                        setFile(e.target.files[0])
                                    }
                                />

                                {file && (

                                    <div className="mt-5 rounded-xl bg-green-100 p-4">

                                        <p className="font-semibold text-green-700">

                                            Selected File

                                        </p>

                                        <p className="mt-1">

                                            {file.name}

                                        </p>

                                    </div>

                                )}

                            </div>

                            {/* Settings Section */}

                            <div>

                                <h2 className="mb-4 text-2xl font-semibold">
                                    Quiz Settings
                                </h2>

                                <div className="space-y-6">

                                    <div>

                                        <label className="mb-2 block font-medium">

                                            Number of Questions

                                        </label>

                                        <select

                                            value={questionCount}

                                            onChange={(e) =>
                                                setQuestionCount(e.target.value)
                                            }

                                            className="w-full rounded-xl border p-4"

                                        >

                                            <option value={5}>5</option>

                                            <option value={10}>10</option>

                                            <option value={15}>15</option>

                                            <option value={20}>20</option>

                                        </select>

                                    </div>

                                    <div>

                                        <label className="mb-2 block font-medium">

                                            Difficulty

                                        </label>

                                        <select

                                            value={difficulty}

                                            onChange={(e) =>
                                                setDifficulty(e.target.value)
                                            }

                                            className="w-full rounded-xl border p-4"

                                        >

                                            <option>Easy</option>

                                            <option>Medium</option>

                                            <option>Hard</option>

                                        </select>

                                    </div>

                                   <button

    onClick={handleGenerateQuiz}

    disabled={loading}

    className="mt-6 w-full rounded-xl bg-orange-500 py-4 text-lg font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"

>

    {

        loading

            ? "Generating..."

            : "✨ Generate Quiz"

    }

</button>
                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

};

export default AIQuizGenerator;