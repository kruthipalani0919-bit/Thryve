import { extractTextFromPDF } from "../services/pdfService.js";
import { generateQuizFromText } from "../services/huggingfaceService.js";
import pool from "../config/database.js";
export const generateAIQuiz = async (req, res) => {

    console.log("========== AI CONTROLLER ==========");
    console.log(req.file);
    console.log(req.body);

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,
                message: "No file uploaded."

            });

        }

        const {
            questionCount,
            difficulty
        } = req.body;

        // Extract text from uploaded PDF
        const extractedText = await extractTextFromPDF(
            req.file.buffer
        );

        console.log("========== PDF TEXT ==========");
        console.log(extractedText.substring(0, 500));

        // Generate quiz using HuggingFace
        const quiz = await generateQuizFromText(
            extractedText,
            questionCount,
            difficulty
        );
console.log("========== RAW AI RESPONSE ==========");
console.log(quiz);

// Extract JSON array from AI response
const start = quiz.indexOf("[");
const end = quiz.lastIndexOf("]");

if (start === -1 || end === -1) {

    return res.status(500).json({

        success: false,
        message: "AI returned invalid JSON."

    });

}

const parsedQuiz = JSON.parse(

    quiz.substring(start, end + 1)

);

console.log("========== PARSED QUIZ ==========");
console.log(parsedQuiz);

return res.json({

    success: true,

    quiz: parsedQuiz

}); 
    }

    catch (err) {

        console.log(err);

        return res.status(500).json({

            success: false,

            message: "AI Quiz Generation Failed"

        });

    }

};



// ======================================
// Save AI Quiz
// ======================================

export const saveAIQuiz = async (req, res) => {

    try {

        const {

            title,

            questions

        } = req.body;

        // Insert AI Quiz
        const quizResult = await pool.query(

            `
            INSERT INTO ai_quizzes
            (
                title,
                difficulty,
                question_count
            )

            VALUES($1,$2,$3)

            RETURNING *
            `,

            [

                title,

                "Medium",

                questions.length

            ]

        );

        const aiQuizId = quizResult.rows[0].id;

        // Insert Questions

        for (const q of questions) {

            await pool.query(

                `
            INSERT INTO ai_questions
(
    ai_quiz_id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    explanation
)

VALUES
($1,$2,$3,$4,$5,$6,$7,$8)
                `,

                [

                    aiQuizId,

                    q.question,

                    q.option_a,

                    q.option_b,

                    q.option_c,

                    q.option_d,

                    q.correct_answer,

                     q.explanation || "No explanation available."

                ]

            );

        }

        res.json({

            success: true,

            message: "AI Quiz Saved Successfully",

            quizId: aiQuizId

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Failed to save AI Quiz"

        });

    }

};


// ======================================
// Get All AI Quizzes
// ======================================

export const getAllAIQuizzes = async (req, res) => {

    try {

        const result = await pool.query(

            `
            SELECT *
            FROM ai_quizzes
            ORDER BY created_at DESC
            `

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Failed to fetch AI Quizzes"

        });

    }

};


// ======================================
// Assign AI Quiz to Session
// ======================================

export const assignAIQuiz = async (req, res) => {

    try {

        const {

            aiQuizId,
            sessionId

        } = req.body;

        await pool.query(

            `
            INSERT INTO ai_quiz_assignments
            (
                ai_quiz_id,
                session_id
            )

            VALUES($1,$2)

            ON CONFLICT
            DO NOTHING
            `,

            [

                aiQuizId,
                sessionId

            ]

        );

        res.json({

            success: true,

            message: "AI Quiz Assigned Successfully"

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Assignment Failed"

        });

    }

};



// ======================================
// Get Assigned AI Quizzes for Session
// ======================================

export const getAssignedAIQuizzes = async (req, res) => {

    try {

        const { sessionId } = req.params;

        const result = await pool.query(
            `
            SELECT
                aq.id,
                aq.title,
                aq.difficulty,
                aq.question_count,
                aqa.assigned_at
            FROM ai_quiz_assignments aqa
            JOIN ai_quizzes aq
                ON aq.id = aqa.ai_quiz_id
            WHERE aqa.session_id = $1
            ORDER BY aqa.assigned_at DESC
            `,
            [sessionId]
        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Failed to fetch assigned AI quizzes"

        });

    }

};


// ======================================
// Start AI Quiz
// ======================================

// ======================================
// Start AI Quiz
// ======================================

export const startAIQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        // -------------------------------
        // Get AI Quiz
        // -------------------------------

        const aiQuizResult = await pool.query(

            `
            SELECT *
            FROM ai_quizzes
            WHERE id = $1
            `,

            [quizId]

        );

        if (aiQuizResult.rows.length === 0) {

            return res.status(404).json({

                success: false,

                message: "AI Quiz not found"

            });

        }

        // -------------------------------
        // Find Assigned Session
        // -------------------------------

        const assignmentResult = await pool.query(

            `
            SELECT
                aqa.session_id,
                s.session_code
            FROM ai_quiz_assignments aqa

            JOIN sessions s
            ON s.id = aqa.session_id

            WHERE aqa.ai_quiz_id = $1

            LIMIT 1
            `,

            [quizId]

        );

        if (assignmentResult.rows.length === 0) {

            return res.status(400).json({

                success:false,

                message:"Quiz is not assigned to any session"

            });

        }

        const sessionId = assignmentResult.rows[0].session_id;

        const sessionCode = assignmentResult.rows[0].session_code;

        // -------------------------------
        // Create Normal Quiz
        // -------------------------------

        const quizResult = await pool.query(

            `
            INSERT INTO quizzes
            (
                session_id,
                title,
                duration,
                status
            )

            VALUES($1,$2,$3,'draft')

            RETURNING *
            `,

            [

                sessionId,

                aiQuizResult.rows[0].title,

                60

            ]

        );

        const normalQuizId = quizResult.rows[0].id;

        // -------------------------------
        // Fetch AI Questions
        // -------------------------------

        const questionsResult = await pool.query(

            `
            SELECT *

            FROM ai_questions

            WHERE ai_quiz_id = $1
            `,

            [quizId]

        );

        // -------------------------------
        // Copy Questions
        // -------------------------------

        for(const q of questionsResult.rows){

            await pool.query(

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
                `,
[
    normalQuizId,
    q.question,
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d,
    q.correct_answer,
    q.explanation
]

            );

        }

        // -------------------------------
        // Complete any previously live quizzes and polls
        // -------------------------------

        await pool.query(
            `
            UPDATE quizzes
            SET status = 'completed'
            WHERE session_id = $1 AND status = 'live'
            `,
            [sessionId]
        );

        await pool.query(
            `
            UPDATE polls
            SET status = 'completed'
            WHERE session_id = $1 AND status = 'live'
            `,
            [sessionId]
        );

        // -------------------------------
        // Make Quiz Live
        // -------------------------------

        await pool.query(

            `
            UPDATE quizzes

            SET
                status='live',
                started_at=NOW()

            WHERE id=$1
            `,

            [normalQuizId]

        );

        // -------------------------------
        // Socket
        // -------------------------------

        const io = req.app.get("io");

        io.to(sessionCode).emit(

            "quiz-started",

            {

                quizId: normalQuizId,

                title: aiQuizResult.rows[0].title,

                duration:60

            }

        );

        res.json({

            success:true,

            message:"AI Quiz Started",

            quizId:normalQuizId

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            success:false,

            message:"Failed to start AI Quiz"

        });

    }

};