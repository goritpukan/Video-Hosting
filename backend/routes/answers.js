import express from "express";

import { verifyToken } from "../verifyToken.js";

import { createAnswer, updateAnswer, deleteAnswer, getAnswers, addLike } from "../controllers/answer.js";

const router = express.Router();

router.post("/:commentId", verifyToken, createAnswer);
router.put("/:id",verifyToken, updateAnswer);
router.delete("/:id", verifyToken, deleteAnswer);
router.get("/:commentId", verifyToken, getAnswers);
router.put("/like/:id", verifyToken, addLike);

export default router;