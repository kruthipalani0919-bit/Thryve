import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import joinRoutes from "./routes/joinRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions",questionRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    company: "Thryve",
    project: "ClassPulse",
    message: "Backend Running Successfully 🚀",
  });
});

export default app;