import pool from "../config/database.js";
import { nanoid } from "nanoid";

// =======================================
// Create Session
// =======================================
export const createSession = async (req, res) => {
  try {

    console.log("========== CREATE SESSION ==========");
    console.log("Request Body:");
    console.log(req.body);
    console.log("====================================");

    const {
      title,
      subject,
      section,
      faculty_id,
      start_time,
      end_time,
    } = req.body;

    console.log("Faculty ID Received:", faculty_id);

    const session_code = nanoid(6).toUpperCase();

    const result = await pool.query(
      `
      INSERT INTO sessions
      (
        session_code,
        title,
        subject,
        section,
        faculty_id,
        start_time,
        end_time
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        session_code,
        title,
        subject,
        section,
        faculty_id,
        start_time,
        end_time,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    console.log("CREATE SESSION ERROR");
    console.log(err);

    res.status(500).json({
      message: "Failed to create session",
    });
  }
};

// =======================================
// Get Faculty Sessions
// =======================================
export const getFacultySessions = async (req, res) => {
  try {

    const { faculty_id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM sessions
      WHERE faculty_id = $1
      ORDER BY created_at DESC
      `,
      [faculty_id]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// ============================
// Update Session
// ============================
export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      subject,
      section,
      start_time,
    } = req.body;

    const result = await pool.query(
      `UPDATE sessions
       SET
         title=$1,
         subject=$2,
         section=$3,
         start_time=$4
       WHERE id=$5
       RETURNING *`,
      [
        title,
        subject,
        section,
        start_time,
        id,
      ]
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
      message: "Failed to update session",
    });
  }
};


// ============================
// Delete Session
// ============================
export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM attendance WHERE session_id=$1",
      [id]
    );

    const result = await pool.query(
      "DELETE FROM sessions WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.json({
      message: "Session Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to delete session",
    });
  }
};