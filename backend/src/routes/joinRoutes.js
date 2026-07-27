import express from "express";
import {
  joinSession,
  getSessionDetails,
} from "../controllers/joinController.js";

const router = express.Router();

// Student joins a session
router.post("/", joinSession);

// Get session details using session code
router.get("/:sessionCode", getSessionDetails);

export default router;