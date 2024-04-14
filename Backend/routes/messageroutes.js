import express from "express";
import { sendMessage } from "../controlers/message-controler.js";
import protectRoute from "../middleware/protectRoute.js";
import { getMessage } from "../controlers/message-controler.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
