import express from "express";
import { getUser, updateUser, getUserFriends } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/find/friends/:userId", getUserFriends);

export default router;
