import express from "express";
import {
  postConvMessage,
  getMessagesByConvId,
} from "../controllers/message.js";

const router = express.Router();

router.post("/", postConvMessage);
router.get("/:conversationId", getMessagesByConvId);

export default router;
