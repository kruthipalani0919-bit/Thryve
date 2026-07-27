import pool from "../config/database.js";

// ===============================
// Add Question
// ===============================
export const addQuestion = async (req, res) => {

    try {

        const {
            quiz_id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option
        } = req.body;

        const result = await pool.query(

            `
            INSERT INTO questions
            (
                quiz_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option
            )

            VALUES($1,$2,$3,$4,$5,$6,$7)

            RETURNING *
            `,

            [
                quiz_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option
            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Failed to add question"

        });

    }

};

// ===============================
// Get Questions
// ===============================

export const getQuestions = async(req,res)=>{

    try{

        const { quizId } = req.params;

        const result = await pool.query(

            `
            SELECT *

            FROM questions

            WHERE quiz_id=$1
            `,

            [quizId]

        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"

        });

    }

};


export const submitQuiz = async (req, res) => {

    try {

        const { answers } = req.body;

        let score = 0;

        for (const questionId in answers) {

            const result = await pool.query(
                "SELECT correct_option FROM questions WHERE id = $1",
                [questionId]
            );

            if (
                result.rows.length > 0 &&
                result.rows[0].correct_option === answers[questionId]
            ) {
                score++;
            }

        }

        res.json({
            score,
            total: Object.keys(answers).length
        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

};