import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ===== FACULTY LOGIN =====
    let result = await pool.query(
      "SELECT * FROM faculty WHERE email = $1 AND is_active = true",
      [email]
    );

    if (result.rows.length > 0) {
      const faculty = result.rows[0];

      const valid = await bcrypt.compare(password, faculty.password);

      if (!valid) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          id: faculty.faculty_id,
          role: "faculty",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        token,
        role: "faculty",
        user: {
          id: faculty.id,
          faculty_id: faculty.faculty_id,
          faculty_name: faculty.faculty_name,
          email: faculty.email,
        },
      });
    }

    // ===== STUDENT LOGIN =====
    result = await pool.query(
      "SELECT * FROM students WHERE email = $1 AND is_active = true",
      [email]
    );

    if (result.rows.length > 0) {
      const student = result.rows[0];

      const valid = await bcrypt.compare(password, student.password);

      if (!valid) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          id: student.student_id,
          role: "student",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        token,
        role: "student",
        user: {
          id: student.id,
          student_id: student.student_id,
          student_name: student.student_name,
          email: student.email,
          section: student.section,
          class_id: student.class_id,
        },
      });
    }

    return res.status(404).json({
      message: "User not found",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};