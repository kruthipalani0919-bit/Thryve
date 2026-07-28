import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FacultySidebar from "../components/dashboard/FacultySidebar";
import FacultyTopbar from "../components/dashboard/FacultyTopbar";

import CreatePollModal from "../components/poll/CreatePollModal";

import {
    getSessionPolls,
    startPoll
} from "../services/pollApi";

const PollManagement = () => {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const [polls, setPolls] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {

        loadPolls();

    }, []);

    const loadPolls = async () => {

        try{

            const data = await getSessionPolls(sessionId);

            setPolls(data);

        }

        catch(err){

            console.log(err);

        }

    };

    const handleStartPoll = async(pollId)=>{

        try{

            await startPoll(pollId);

            alert("Poll Started Successfully");

            loadPolls();

        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <div className="flex min-h-screen bg-slate-100">

            <FacultySidebar/>

            <div className="flex-1">

                <FacultyTopbar/>

                <main className="p-8">

                    <div className="flex items-center justify-between">

                        <h1 className="text-4xl font-bold">

                            Poll Management

                        </h1>

                        <button

                            onClick={()=>setOpenModal(true)}

                            className="rounded-xl bg-orange-500 px-6 py-3 text-white"

                        >

                            + Create Poll

                        </button>

                    </div>

                    <div className="mt-8 grid gap-5">

                        {

                            polls.map((poll)=>(

                                <div

                                    key={poll.id}

                                    className="rounded-2xl bg-white p-6 shadow"

                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h2 className="text-2xl font-bold">

                                                {poll.question}

                                            </h2>

                                            <p className="mt-2 text-slate-500">

                                                Status : {poll.status}

                                            </p>

                                            <p className="text-slate-500">
    Duration : {poll.duration} Seconds
</p>

                                        </div>

                                        <div className="flex gap-3">

                                        <button

                                            onClick={()=>handleStartPoll(poll.id)}

                                            className="rounded-xl bg-black px-6 py-3 text-white hover:bg-orange-500"

                                        >

                                            Start Poll

                                        </button>



                                        <button
    onClick={() => navigate(`/poll-results/${poll.id}`)}
    className="bg-green-500 text-white px-4 py-2 rounded-lg"
>
    View Results
</button>

</div>
                                        

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </main>

            </div>

            {

                openModal && (

                    <CreatePollModal

                        sessionId={sessionId}

                        onClose={()=>setOpenModal(false)}

                        onCreated={loadPolls}

                    />

                )

            }

        </div>

    );

};

export default PollManagement;