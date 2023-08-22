import express from "express";

import { verifyToken } from "../verifyToken.js";

import { createAnswer } from "../controllers/answer.js";

const router = express.Router();

router.post("/:commentId", verifyToken, createAnswer);

export default router