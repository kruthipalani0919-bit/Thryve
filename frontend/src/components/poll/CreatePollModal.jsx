import { useState } from "react";
import { createPoll } from "../../services/pollApi";

const CreatePollModal = ({ sessionId, onClose, onCreated }) => {

const [form, setForm] = useState({

    question: "",

    option_a: "",

    option_b: "",

    option_c: "",

    option_d: "",

    duration: 30,

    optionCount: 2

});

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleCreate = async () => {

        try{

            await createPoll({

                session_id: sessionId,

                question: form.question,

                option_a: form.option_a,

                option_b: form.option_b,

                option_c: form.optionCount >=3 ? form.option_c : "",

               option_d: form.optionCount ===4 ? form.option_d : "",

duration: Number(form.duration)

});

           

            alert("Poll Created");

            onCreated();

            onClose();

        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

            <div className="w-[650px] rounded-2xl bg-white p-8">

                <h1 className="text-3xl font-bold">
                    Create Poll
                </h1>

                <textarea

                    name="question"

                    placeholder="Poll Question"

                    value={form.question}

                    onChange={handleChange}

                    className="mt-6 w-full rounded-xl border p-4"

                />

<div className="mt-6">

    <label className="mb-2 block font-semibold">
        Poll Duration (Seconds)
    </label>

    <input
        type="number"
        name="duration"
        value={form.duration}
        min="5"
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
    />

</div>



                <div className="mt-6">

                    <p className="mb-3 font-semibold">
                        Number of Options
                    </p>

                    <div className="flex gap-3">

                        {[2,3,4].map((count)=>(

                            <button

                                key={count}

                                type="button"

                                onClick={()=>setForm({

                                    ...form,

                                    optionCount:count,

                                    option_c:"",

                                    option_d:""

                                })}

                                className={`rounded-xl px-5 py-3

                                ${form.optionCount===count

                                ? "bg-orange-500 text-white"

                                : "bg-black text-white"

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

                    className="mt-5 w-full rounded-xl border p-3"

                />

                <input

                    name="option_b"

                    placeholder="Option B"

                    value={form.option_b}

                    onChange={handleChange}

                    className="mt-4 w-full rounded-xl border p-3"

                />

                {form.optionCount>=3 && (

                    <input

                        name="option_c"

                        placeholder="Option C"

                        value={form.option_c}

                        onChange={handleChange}

                        className="mt-4 w-full rounded-xl border p-3"

                    />

                )}

                {form.optionCount===4 && (

                    <input

                        name="option_d"

                        placeholder="Option D"

                        value={form.option_d}

                        onChange={handleChange}

                        className="mt-4 w-full rounded-xl border p-3"

                    />

                )}

                <div className="mt-8 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="rounded-xl bg-gray-200 px-6 py-3"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleCreate}

                        className="rounded-xl bg-orange-500 px-6 py-3 text-white"

                    >

                        Create Poll

                    </button>

                </div>

            </div>

        </div>

    );

};

export default CreatePollModal;