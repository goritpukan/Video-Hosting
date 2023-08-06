import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = 8800;

try {
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
