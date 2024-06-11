import express from "express";
import { getCheckOut } from "../controllers/checkout.js";

const router = express.Router();

router.post("/create-checkout-session", getCheckOut);

export default router;
