import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const postConvMessage = (req, res) => {
  const { conversationId, senderId, text } = req.body;
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;
  const token = req.cookies.accesToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "INSERT INTO messages (conversationId, senderId, text, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";

    db.query(
      query,
      [conversationId, senderId, text, createdAt, updatedAt],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({
          messageId: result.insertId,
          conversationId,
          senderId,
          text,
          createdAt,
          updatedAt,
        });
      }
    );
  });
};

export const getMessagesByConvId = (req, res) => {
  const token = req.cookies.accesToken;
  const { conversationId } = req.params;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = `
    SELECT m.id, m.text, m.createdAt, m.updatedAt, u.username AS senderUsername
    FROM Messages m
    JOIN Users u ON m.senderId = u.id
    WHERE m.conversationId = ?
  `;

    db.query(query, [conversationId], (err, results) => {
      if (err) {
        console.error("Error while fetching messages:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(200).json(results);
    });
  });
};
