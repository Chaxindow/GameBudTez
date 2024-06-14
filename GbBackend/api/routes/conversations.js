import express from "express";
import {
  postConversation,
  findUserConversation,
  getTwoUserConversation,
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/", postConversation);
router.get("/:userId", findUserConversation);
router.get("/find/:firstUserId/:secondUserId", getTwoUserConversation);

export default router;
