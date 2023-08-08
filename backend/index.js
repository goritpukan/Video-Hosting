import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";



const app = express();
dotenv.config();

const PORT = 8800;

try {
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Error";
    
    return res.staus(status).json({
      success: false,
      status,
      message,
    });

  });

  app.listen(PORT, () => {
    console.log("server is running on port:", PORT);
  });

  mongoose.connect(process.env.DB_URI)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err => { throw err }));

} catch (e) {
  console.log(e);
  process.exit(1);
}