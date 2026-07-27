import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const QuizEditor = () => {

    const { quizId } = useParams();

    const [questions,setQuestions]=useState([]);

    const [form, setForm] = useState({

    question: "",

    option_a: "",

    option_b: "",

    option_c: "",

    option_d: "",

    correct_option: "A",

    optionCount: 2

});

    useEffect(()=>{

        loadQuestions();

    },[]);

    const loadQuestions=async()=>{

        try{

           const res = await api.get(`/quizzes/${quizId}/questions`);

            setQuestions(res.data);

        }

        catch(err){

            console.log(err);

        }

    };

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const addQuestion=async()=>{

        try{

            await api.post("/questions",{

                quiz_id:quizId,

                ...form

            });

            alert("Question Added");

          setForm({

    question: "",

    option_a: "",

    option_b: "",

    option_c: "",

    option_d: "",

    correct_option: "A",

    optionCount: 2

});

            loadQuestions();

        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <div className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-5xl p-10">

                <h1 className="text-4xl font-bold">

                    Quiz Editor

                </h1>

                <div className="mt-8 rounded-3xl bg-white p-8 shadow">

                    <textarea

                        name="question"

                        value={form.question}

                        onChange={handleChange}

                        placeholder="Question"

                        className="w-full rounded-xl border p-4"

                    />

                    <div className="mt-6">

    <label className="mb-3 block text-lg font-semibold">
        Number of Options
    </label>

    <div className="flex gap-4">

        {[2,3,4].map((count)=>(

            <button

                key={count}

                type="button"

                onClick={()=>{

                    setForm({

                        ...form,

                        optionCount:count,

                        correct_option:"A",

                        option_c:"",
                        option_d:""

                    });

                }}

                className={`rounded-xl px-6 py-3 font-semibold transition

                ${
                    form.optionCount===count

                    ? "bg-orange-500 text-white"

                    : "bg-black text-white hover:bg-orange-500"

                }`}

            >

                {count} Options

            </button>

        ))}

    </div>

</div>

                    <input

                        name="option_a"

                        placeholder="Option A"

                        value={form.option_a}

                        onChange={handleChange}

                        className="mt-4 w-full rounded-xl border p-3"

                    />

                    <input

                        name="option_b"

                        placeholder="Option B"

                        value={form.option_b}

                        onChange={handleChange}

                        className="mt-4 w-full rounded-xl border p-3"

                    />

                    {form.optionCount >= 3 && (

    <input
        name="option_c"
        placeholder="Option C"
        value={form.option_c}
        onChange={handleChange}
        className="mt-4 w-full rounded-xl border p-3"
    />

)}

                  {form.optionCount === 4 && (

    <input
        name="option_d"
        placeholder="Option D"
        value={form.option_d}
        onChange={handleChange}
        className="mt-4 w-full rounded-xl border p-3"
    />

)}

                   <select
    name="correct_option"
    value={form.correct_option}
    onChange={handleChange}
    className="mt-4 w-full rounded-xl border p-3"
>

    <option value="A">A</option>

    <option value="B">B</option>

    {form.optionCount >= 3 && (
        <option value="C">C</option>
    )}

    {form.optionCount === 4 && (
        <option value="D">D</option>
    )}

</select>   
                    <button

                        onClick={addQuestion}

                        className="mt-6 rounded-xl bg-orange-500 px-8 py-3 text-white"

                    >

                        Add Question

                    </button>

                </div>

                <div className="mt-8 space-y-5">

                    {

                        questions.map((q,index)=>(

                            <div

                                key={q.id}

                                className="rounded-2xl bg-white p-6 shadow"

                            >

                                <h2 className="font-bold">

                                    Q{index+1}. {q.question}

                                </h2>

                                {q.option_a && <p>A. {q.option_a}</p>}

{q.option_b && <p>B. {q.option_b}</p>}

{q.option_c && <p>C. {q.option_c}</p>}

{q.option_d && <p>D. {q.option_d}</p>}
                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default QuizEditor;