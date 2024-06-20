import express from "express";
import {
  getUser,
  updateUser,
  getUserFriends,
  getUserByName,
} from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);
router.get("/find/friends/:userId", getUserFriends);
router.get("/find/name/:username", getUserByName);

export default router;
