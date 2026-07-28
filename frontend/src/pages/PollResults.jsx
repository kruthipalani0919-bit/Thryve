import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPollResults, getPollById } from "../services/pollApi";
import { io } from "socket.io-client";


const socket = io("http://localhost:5000");

const optionMap = {
    A: "Option A",
    B: "Option B",
    C: "Option C",
    D: "Option D",
};

const PollResults = () => {

    const { pollId } = useParams();

    const [poll, setPoll] = useState(null);
    const [results, setResults] = useState([]);
useEffect(() => {

    loadData();

    socket.emit("join-room", pollId);

    socket.on("poll-updated", () => {

        loadData();

    });

    return () => {

        socket.off("poll-updated");

    };

}, [pollId]);
    const loadData = async () => {

        const pollData = await getPollById(pollId);
        setPoll(pollData);

        const resultData = await getPollResults(pollId);
        setResults(resultData);

    };

    if (!poll)
        return <h2 className="p-10">Loading...</h2>;

    return (

        <div className="min-h-screen bg-slate-100 p-10">

            <div className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-6">
                    Live Poll Results
                </h1>

                <h2 className="text-2xl font-semibold mb-8">
                    {poll.question}
                </h2>

                {results.map((item) => (

                    <div
                        key={item.selected_option}
                        className="mb-6"
                    >

                        <div className="flex justify-between mb-2">

                            <span>
                                {optionMap[item.selected_option]}
                            </span>

                            <span>
                                {item.votes} Votes
                            </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-5">

                            <div
                                className="bg-orange-500 h-5 rounded-full"
                                style={{
                                    width: `${Number(item.votes) * 20}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default PollResults;