import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import { submitPoll } from "../services/pollApi";

const StudentPoll = () => {

    const { pollId } = useParams();

    const [poll, setPoll] = useState(null);

    const [selectedOption, setSelectedOption] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {

        loadPoll();

    }, []);




    useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {

        setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

}, [timeLeft]);







    const loadPoll = async () => {

        try {

            const res = await api.get(`/polls/${pollId}`);

            setPoll(res.data);

            setTimeLeft(res.data.duration);

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleSubmit = async () => {

        if (!selectedOption) {

            alert("Please select an option");

            return;

        }

        try {

            await submitPoll(pollId, selectedOption);

            setSubmitted(true);

        }

        catch (err) {

            console.log(err);

            alert("Failed to submit vote");

        }

    };

    if (!poll) {

        return (
            <h2 className="p-10 text-xl">
                Loading Poll...
            </h2>
        );

    }

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

                <h1 className="text-4xl font-bold">
                    Live Poll
                </h1>

                <hr className="my-6" />



                <div className="mb-6 rounded-xl bg-red-100 p-4 text-center">

    <h2 className="text-2xl font-bold text-red-600">

        Time Left : {timeLeft}s

    </h2>

</div>

                {

                    submitted ? (

                        <div className="rounded-xl bg-green-100 p-8 text-center">

                            <h2 className="text-2xl font-bold text-green-700">

                                ✅ Vote Submitted

                            </h2>

                            <p className="mt-3 text-slate-600">

                                Thank you for participating.

                            </p>

                        </div>

                    ) : (

                        <>

                            <h2 className="text-2xl font-semibold">

                                {poll.question}

                            </h2>

                            <div className="mt-8 space-y-4">

                                <label className="block">

                                    <input
                                        type="radio"
                                        name="poll"
                                        value="A"
                                        checked={selectedOption === "A"}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />

                                    {" "}

                                    {poll.option_a}

                                </label>

                                <label className="block">

                                    <input
                                        type="radio"
                                        name="poll"
                                        value="B"
                                        checked={selectedOption === "B"}
                                        onChange={(e) =>
                                            setSelectedOption(e.target.value)
                                        }
                                    />

                                    {" "}

                                    {poll.option_b}

                                </label>

                                {

                                    poll.option_c && (

                                        <label className="block">

                                            <input
                                                type="radio"
                                                name="poll"
                                                value="C"
                                                checked={selectedOption === "C"}
                                                onChange={(e) =>
                                                    setSelectedOption(e.target.value)
                                                }
                                            />

                                            {" "}

                                            {poll.option_c}

                                        </label>

                                    )

                                }

                                {

                                    poll.option_d && (

                                        <label className="block">

                                            <input
                                                type="radio"
                                                name="poll"
                                                value="D"
                                                checked={selectedOption === "D"}
                                                onChange={(e) =>
                                                    setSelectedOption(e.target.value)
                                                }
                                            />

                                            {" "}

                                            {poll.option_d}

                                        </label>

                                    )

                                }

                            </div>
<button
    onClick={handleSubmit}
    disabled={timeLeft <= 0 || submitted}
    className={`mt-8 rounded-xl px-8 py-3 text-white ${
        timeLeft <= 0 || submitted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
    }`}
>
    {timeLeft <= 0 ? "Poll Ended" : "Submit Vote"}
</button>
                        </>

                    )

                }

            </div>

        </div>

    );

};

export default StudentPoll;