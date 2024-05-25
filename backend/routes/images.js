import express from "express";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./img/")
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E8)
    cb(null, filename + ".png")
  }
})

const upload = multer({ storage: storage });

import { verifyToken } from "../verifyToken.js";

import { getImage, changeAvatar } from "../controllers/image.js";
const router = express.Router();

router.get("/:filename", getImage);
router.post("/avatar/:id", verifyToken, upload.single("image"), changeAvatar);

export default router;