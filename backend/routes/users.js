import express from "express";

import { updateUser, deleteUser, getUser, subscribe, unsubscribe } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/subscribe/:id", verifyToken, subscribe);
router.put("/unsubscribe/:id", verifyToken, unsubscribe);

export default router;