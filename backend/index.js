import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import answerRouter from "./routes/answers.js";


const app = express();
dotenv.config();

const {DB_URI, PORT} = process.env;

try {
  app.use(cookieParser());
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/videos", videoRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/comments/answers", answerRouter);

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Error";
    
    return res.status(status).json({
      success: false,
      status,
      message,
    });

  });

  app.listen(PORT, () => {
    console.log("server is running on port:", PORT);
  });

  mongoose.connect(DB_URI)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err => { throw err }));

} catch (err) {
  console.log(err);
  process.exit(1);
}