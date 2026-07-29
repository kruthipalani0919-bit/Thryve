import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
    generateAIQuiz,
    saveAIQuiz,
    getAllAIQuizzes,
    assignAIQuiz,
    getAssignedAIQuizzes,
    startAIQuiz
} from "../controllers/aiQuizController.js";

const router = express.Router();

// ======================================
// Generate AI Quiz
// ======================================

router.post(
    "/generate",
    upload.single("file"),
    generateAIQuiz
);

// ======================================
// Save AI Quiz
// ======================================

router.post(
    "/save",
    saveAIQuiz
);

// ======================================
// Get All AI Quizzes
// ======================================

router.get(
    "/all",
    getAllAIQuizzes
);

// ======================================
// Assign AI Quiz
// ======================================

router.post(
    "/assign",
    assignAIQuiz
);

// ======================================
// Get Assigned AI Quizzes of a Session
// ======================================

router.get(
    "/assigned/:sessionId",
    getAssignedAIQuizzes
);

// ======================================
// Start AI Quiz
// ======================================

router.post(
    "/start/:quizId",
    startAIQuiz
);

export default router;