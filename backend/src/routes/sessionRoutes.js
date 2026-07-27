import express from "express";

import {
  createSession,
  getFacultySessions,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", createSession);

router.get("/:faculty_id", getFacultySessions);

router.put("/:id", updateSession);

router.delete("/:id", deleteSession);

export default router;