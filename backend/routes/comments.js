import express from "express";
import {
  createComment, updateComment, deleteComment, getComments, addLike
} from "../controllers/comment.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/:videoId", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);
router.put("/like/:id", verifyToken, addLike);
// router.post("/answer/:id", verifyToken, answerComment);



export default router;