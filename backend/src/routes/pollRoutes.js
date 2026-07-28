import express from "express";

import {
    createPoll,
    getSessionPolls,
    getPollById,
    startPoll,
   submitVote,
getPollResults
} from "../controllers/pollController.js";

const router = express.Router();

router.post("/", createPoll);

router.get("/session/:sessionId", getSessionPolls);

router.get("/:pollId", getPollById);

router.put("/:pollId/start", startPoll);

router.post("/:pollId/vote", submitVote);

router.get("/:pollId/results", getPollResults);

export default router;