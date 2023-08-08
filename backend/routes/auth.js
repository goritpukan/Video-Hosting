import express from "express";
import { signup, signin, google } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/singin", signin);

router.post("/google", google);

export default router;