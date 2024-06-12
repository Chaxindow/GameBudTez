import express from "express";
import {
  postConversation,
  findUserConversation,
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/", postConversation);
router.get("/:userId", findUserConversation);

export default router;
