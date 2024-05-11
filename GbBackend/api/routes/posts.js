import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get("/a", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);
export default router;
