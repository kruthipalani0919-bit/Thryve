import pool from "../config/database.js";

// ===================================
// Student joins session
// ===================================
export const joinSession = async (req, res) => {
  try {
    const { session_code, student_id } = req.body;

    const session = await pool.query(
      "SELECT * FROM sessions WHERE session_code=$1",
      [session_code]
    );

    if (session.rows.length === 0) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    const existing = await pool.query(
      "SELECT * FROM attendance WHERE session_id=$1 AND student_id=$2",
      [session.rows[0].id, student_id]
    );

    if (existing.rows.length > 0) {

  const io = req.app.get("io");

  const student = await pool.query(
    `
    SELECT name
    FROM students
    WHERE student_id=$1
    `,
    [student_id]
  );

  io.to(session_code).emit("student-joined", {
    student_id,
    student_name: student.rows[0].name,
  });

  return res.json({
    message: "Already Joined",
    session: session.rows[0],
  });
}

    await pool.query(
      `INSERT INTO attendance
      (session_id, student_id, status)
      VALUES ($1,$2,'Present')`,
      [session.rows[0].id, student_id]
    );

    const io = req.app.get("io");

const student = await pool.query(
  `SELECT name
   FROM students
   WHERE student_id = $1`,
  [student_id]
);

console.log("Student Query:", student.rows);

if (student.rows.length > 0) {
  io.to(session_code).emit("student-joined", {
    student_id,
    student_name: student.rows[0].name,
  });
}
    res.json({
      message: "Joined Successfully",
      session: session.rows[0],
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===================================
// Get Session Details
// ===================================
export const getSessionDetails = async (req, res) => {
  try {
    const { sessionCode } = req.params;

    const result = await pool.query(
      `
      SELECT
        s.session_code,
        s.title,
        s.subject,
        s.section,
        s.start_time,
        s.faculty_id,
        f.faculty_name
      FROM sessions s
      LEFT JOIN faculty f
      ON s.faculty_id = f.faculty_id
      WHERE s.session_code = $1
      `,
      [sessionCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};