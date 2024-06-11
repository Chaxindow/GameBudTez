import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

const stripe = new Stripe(
  "sk_test_51OTiP7JqZiK5gb9S4OPgCR5fdP7VBl8rm0Qv7aXMhkkdxJhPZtFHbDDw3w4y93zuuiyr2wnwxV6FA3xMGIIs4iWH00eIxdGkr3"
);

export const getCheckOut = async (req, res) => {
  const { lineItems } = req.body;

  try {
    // Stripe checkout session oluşturma
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id }); // Session ID'yi client'a gönder
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Errorx" });
  }
};
