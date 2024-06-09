import express from "express";
import {
  getUserCart,
  addToCart,
  deleteCart,
  updateCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/:userId", getUserCart);
router.post("/add", addToCart);
router.delete("/delete/:productId", deleteCart);
router.put("/update/:productId", updateCart);

export default router;
