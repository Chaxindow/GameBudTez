import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getUserCart = (req, res) => {
  const token = req.cookies.accesToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT * FROM carts WHERE userId = ?  ;`;

    console.log(userInfo.id);

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addToCart = (req, res) => {
  const token = req.cookies.accesToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { productId, quantity } = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    const q = `INSERT INTO carts (userId, productId, quantity, createdAt)
               VALUES (?, ?, ?, ?)`;

    db.query(
      q,
      [userInfo.id, productId, quantity, createdAt],
      (err, result) => {
        if (err) {
          console.error("Error adding product to cart:", err);
          return res
            .status(500)
            .json("An error occurred while adding product to cart");
        }

        // Başarılı bir şekilde sepete eklendiğini bildir
        return res.status(200).json("Product added to cart successfully");
      }
    );
  });
};

export const deleteCart = (req, res) => {
  const token = req.cookies.accesToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { productId } = req.params;
    const userId = userInfo.id;

    const q = `DELETE FROM carts WHERE userId = ? AND productId = ?`;

    db.query(q, [userId, productId], (err, result) => {
      if (err) {
        console.error("Error deleting product from cart:", err);
        return res
          .status(500)
          .json("An error occurred while deleting product from cart");
      }

      return res.status(200).json("Product deleted from cart successfully");
    });
  });
};

export const updateCart = (req, res) => {
  const token = req.cookies.accesToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { productId } = req.params; // req.params ile productId alınır
    const { quantity } = req.body; // req.body ile quantity alınır
    const userId = userInfo.id;

    const q = `UPDATE carts SET quantity = ? WHERE userId = ? AND productId = ?`;

    db.query(q, [quantity, userId, productId], (err, result) => {
      if (err) {
        console.error("Error updating product quantity in cart:", err);
        return res
          .status(500)
          .json("An error occurred while updating product quantity in cart");
      }

      return res
        .status(200)
        .json("Product quantity updated in cart successfully");
    });
  });
};
