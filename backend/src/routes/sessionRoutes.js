import express from "express";

import {
  createSession,
  getFacultySessions,
  getAllSessions,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", createSession);

// IMPORTANT: Keep this BEFORE "/:faculty_id"
router.get("/all", getAllSessions);

router.get("/:faculty_id", getFacultySessions);

router.put("/:id", updateSession);

router.delete("/:id", deleteSession);

export default router;