import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Gets all products
export const getProducts = (req, res) => {
  const token = req.cookies.accesToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT * FROM products;`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

// Get find product
export const getProduct = (req, res) => {
  const token = req.cookies.accesToken;
  const productId = req.params.productId;
  if (!token) return res.status(401).json("Not logged in!");

  console.log(productId);

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT * FROM products WHERE id = ?;`;

    db.query(q, [productId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0)
        return res.status(404).json({ message: "Product not found!" });
      return res.status(200).json(data);
    });
  });
};
