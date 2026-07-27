import express from "express";

import { submitQuiz } from "../controllers/questionController.js";

import {
    addQuestion,
    getQuestions
}
from "../controllers/questionController.js";

const router = express.Router();

router.post("/",addQuestion);

router.get("/:quizId",getQuestions);

router.post("/submit", submitQuiz);
export default router;