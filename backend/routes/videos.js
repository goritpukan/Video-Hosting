import express from "express";
import {
  createVideo, updateVideo, deleteVideo, getVideo,
  addView, addLike, addDislike, getTrendVideos, getHomepageVideos,
  getRandomVideos, getSubVideos
} from "../controllers/video.js";

import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/random", getRandomVideos);
router.get("/trend", getTrendVideos);
router.get("/homepage", verifyToken, getHomepageVideos);
router.get("/sub", verifyToken, getSubVideos);
router.put("/view/:id", verifyToken, addView);
router.put("/like/:id", verifyToken, addLike);
router.put("/dislike/:id", verifyToken, addDislike);

export default router;