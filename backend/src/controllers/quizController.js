import pool from "../config/database.js";

// ======================================
// Create Quiz
// ======================================
export const createQuiz = async (req, res) => {
  try {
    const {
      session_id,
      title,
      duration,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO quizzes
      (
        session_id,
        title,
        duration
      )
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [
        session_id,
        title,
        duration,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to create quiz",
    });
  }
};


// ======================================
// Get Session Quizzes
// ======================================
export const getSessionQuizzes = async (req, res) => {

  try {

    const { sessionId } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM quizzes
      WHERE session_id=$1
      ORDER BY created_at DESC
      `,
      [sessionId]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
export const startQuiz = async (req, res) => {

    try {

        const { quizId } = req.params;

        // Get quiz details
        const quiz = await pool.query(
            `
            SELECT
                q.*,
                s.session_code
            FROM quizzes q
            JOIN sessions s
            ON q.session_id = s.id
            WHERE q.id = $1
            `,
            [quizId]
        );

        if (quiz.rows.length === 0) {

            return res.status(404).json({
                message: "Quiz not found",
            });

        }

        // Mark quiz as live and store start time
        await pool.query(
            `
            UPDATE quizzes
            SET
                status = 'live',
                started_at = NOW()
            WHERE id = $1
            `,
            [quizId]
        );

        // Socket.IO instance
        const io = req.app.get("io");

        // Notify all students in this classroom
        io.to(quiz.rows[0].session_code).emit("quiz-started", {

            quizId,

            title: quiz.rows[0].title,

            duration: quiz.rows[0].duration,

        });

        // Auto complete quiz after duration
        setTimeout(async () => {

            try {

                await pool.query(
                    `
                    UPDATE quizzes
                    SET status = 'completed'
                    WHERE id = $1
                    `,
                    [quizId]
                );

                io.to(quiz.rows[0].session_code).emit("quiz-ended", {

                    quizId,

                });

                console.log("Quiz auto completed");

            } catch (err) {

                console.log("Quiz auto complete error:", err);

            }

        }, quiz.rows[0].duration * 1000);

        res.json({

            message: "Quiz Started Successfully",

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Server Error",

        });

    }

};
export const getQuizById = async (req, res) => {

    try {

        const { quizId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM quizzes
            WHERE id = $1
            `,
            [quizId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Quiz not found"
            });

        }

        res.json(result.rows[0]);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};