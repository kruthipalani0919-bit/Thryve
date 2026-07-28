import pool from "../config/database.js";
import { io } from "../server.js";

export const createPoll = async (req, res) => {
    try {
const {
    session_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    duration
} = req.body;

        const result = await pool.query(
            `
           INSERT INTO polls
(
    session_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    duration
)

VALUES($1,$2,$3,$4,$5,$6,$7)

            RETURNING *
            `,
           [
    session_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    duration
]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error creating poll"
        });

    }
};

export const getSessionPolls = async (req, res) => {

    try{

        const { sessionId } = req.params;

        const result = await pool.query(

            `
            SELECT *
            FROM polls
            WHERE session_id=$1
            ORDER BY created_at DESC
            `,

            [sessionId]

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            message:"Error fetching polls"
        });

    }

};

export const getPollById = async (req,res)=>{

    try{

        const { pollId }=req.params;

        const result=await pool.query(

            `
            SELECT *
            FROM polls
            WHERE id=$1
            `,

            [pollId]

        );

        res.json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            message:"Error"
        });

    }

};

export const startPoll = async (req, res) => {

    try {

        const { pollId } = req.params;

        // Make poll live
        const pollResult = await pool.query(
            `
            UPDATE polls
            SET
                status = 'live',
                started_at = NOW()
            WHERE id = $1
            RETURNING *
            `,
            [pollId]
        );

        const poll = pollResult.rows[0];

        // Get session code
        const sessionResult = await pool.query(
            `
            SELECT session_code
            FROM sessions
            WHERE id = $1
            `,
            [poll.session_id]
        );

        const sessionCode = sessionResult.rows[0].session_code;

        // Notify all students that poll has started
        io.to(sessionCode).emit("poll-started", {
            pollId: poll.id,
        });

        // Auto-complete poll after duration
        setTimeout(async () => {

            try {

                await pool.query(
                    `
                    UPDATE polls
                    SET status = 'completed'
                    WHERE id = $1
                    `,
                    [poll.id]
                );

                io.to(sessionCode).emit("poll-ended", {
                    pollId: poll.id,
                });

                console.log("Poll auto completed");

            } catch (err) {

                console.log("Auto complete error:", err);

            }

        }, poll.duration * 1000);

        res.json({
            message: "Poll Started Successfully",
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error",
        });

    }

};  


export const submitVote = async (req, res) => {

    try {

        const { pollId } = req.params;



        const { option } = req.body;

const existingVote = await pool.query(
    `
    SELECT *
    FROM poll_answers
    WHERE poll_id = $1
    AND selected_option = $2
    `,
    [
        pollId,
        option
    ]
);

if (existingVote.rows.length > 0) {

    return res.status(400).json({
        message: "Vote already submitted."
    });

}

       

        await pool.query(

            
            `
            INSERT INTO poll_answers
            (
                poll_id,
                selected_option
            )

            VALUES($1,$2)
            `,
            [
                pollId,
                option
            ]
        );

const io = req.app.get("io");

io.to(pollId).emit("poll-updated");


        res.json({
            message: "Vote Submitted"
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error submitting vote"
        });

    }

};


export const getPollResults = async (req, res) => {

    try {

        const { pollId } = req.params;

        const result = await pool.query(
            `
            SELECT
                selected_option,
                COUNT(*) AS votes
            FROM poll_answers
            WHERE poll_id=$1
            GROUP BY selected_option
            `,
            [pollId]
        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching results"
        });

    }

};