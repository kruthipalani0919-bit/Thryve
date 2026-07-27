import express from "express";
import {
  createQuiz,
  getSessionQuizzes,
  startQuiz,
  getQuizById,
} from "../controllers/quizController.js";

import {
  addQuestion,
  getQuestions,
} from "../controllers/questionController.js";



const router = express.Router();

router.post("/", createQuiz);

router.get("/session/:sessionId", getSessionQuizzes);

router.post("/questions", addQuestion);

router.get("/:quizId", getQuizById);

router.get("/:quizId/questions", getQuestions);

router.put("/:quizId/start", startQuiz);

export default router;