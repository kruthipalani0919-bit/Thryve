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
            correct_option,
            explanation
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
                correct_option,
                explanation
            )

            VALUES($1,$2,$3,$4,$5,$6,$7,$8)

            RETURNING *
            `,
            [
                quiz_id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                explanation
            ]

        );

        res.status(201).json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to add question"

        });

    }

};
// ===============================
// Get Questions
// ===============================

export const getQuestions = async (req, res) => {

    try {

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

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error"

        });

    }

};


export const submitQuiz = async (req, res) => {
    try {

        const { answers } = req.body;

        let score = 0;
        const report = [];

        for (const questionId in answers) {

            const result = await pool.query(
                `
                SELECT
                    question,
                    option_a,
                    option_b,
                    option_c,
                    option_d,
                    correct_option,
                    explanation
                FROM questions
                WHERE id = $1
                `,
                [questionId]
            );

            if (result.rows.length === 0) continue;

            const q = result.rows[0];

            const studentAnswer = answers[questionId];
            const isCorrect = q.correct_option === studentAnswer;

            if (isCorrect) score++;

            report.push({
                questionId,
                question: q.question,
                options: {
                    A: q.option_a,
                    B: q.option_b,
                    C: q.option_c,
                    D: q.option_d,
                },
                student_answer: studentAnswer,
                correct_answer: q.correct_option,
                isCorrect,
                explanation:
                    q.explanation || "No explanation available."
            });
        }

        res.json({
            score,
            total: report.length,
            report
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
};