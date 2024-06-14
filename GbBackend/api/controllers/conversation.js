import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// add conv
export const postConversation = (req, res) => {
  const { senderId, receiverId } = req.body;
  const token = req.cookies.accesToken;
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const insertConversationQuery =
      "INSERT INTO Conversations (createdAt, updatedAt) VALUES (?, ?)";

    db.beginTransaction((err) => {
      if (err) return res.status(500).send(err);

      db.query(
        insertConversationQuery,
        [createdAt, updatedAt],
        (err, result) => {
          if (err) {
            db.rollback(() => {
              res.status(500).send(err);
            });
          }

          const conversationId = result.insertId;

          const insertMemberQueries = [
            "INSERT INTO ConversationMembers (conversationId, userId) VALUES (?, ?)",
            "INSERT INTO ConversationMembers (conversationId, userId) VALUES (?, ?)",
          ];

          const memberValues = [
            [conversationId, senderId],
            [conversationId, receiverId],
          ];

          db.query(insertMemberQueries[0], memberValues[0], (err) => {
            if (err) {
              db.rollback(() => {
                res.status(500).send(err);
              });
            }

            db.query(insertMemberQueries[1], memberValues[1], (err) => {
              if (err) {
                db.rollback(() => {
                  res.status(500).send(err);
                });
              }

              db.commit((err) => {
                if (err) {
                  db.rollback(() => {
                    res.status(500).send(err);
                  });
                }

                res.status(201).json({ conversationId });
              });
            });
          });
        }
      );
    });
  });
};

export const findUserConversation = (req, res) => {
  const token = req.cookies.accesToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json("Token is not valid!");
    }

    const userId = req.params.userId;

    const query = `
      SELECT c.id AS conversationId, c.createdAt, c.updatedAt, GROUP_CONCAT(cm.userId) AS memberIds
      FROM Conversations c
      JOIN ConversationMembers cm ON c.id = cm.conversationId
      WHERE c.id IN (
        SELECT c.id
        FROM Conversations c
        JOIN ConversationMembers cm ON c.id = cm.conversationId
        WHERE cm.userId = ?
      )
      GROUP BY c.id, c.createdAt, c.updatedAt
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching conversations:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Sonuçları işle ve cevap olarak gönder
      const formattedResults = results.map((result) => ({
        id: result.conversationId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        memberIds: result.memberIds.split(",").map(Number),
      }));

      res.status(200).json(formattedResults);
    });
  });
};

export const getTwoUserConversation = (req, res) => {
  const { firstUserId, secondUserId } = req.params;

  const query = `
    SELECT c.id AS conversationId, c.createdAt, c.updatedAt, GROUP_CONCAT(cm.userId) AS memberIds
    FROM Conversations c
    JOIN ConversationMembers cm ON c.id = cm.conversationId
    WHERE c.id IN (
      SELECT c.id
      FROM Conversations c
      JOIN ConversationMembers cm ON c.id = cm.conversationId
      WHERE cm.userId = ?
    ) AND c.id IN (
      SELECT c.id
      FROM Conversations c
      JOIN ConversationMembers cm ON c.id = cm.conversationId
      WHERE cm.userId = ?
    )
    GROUP BY c.id, c.createdAt, c.updatedAt
  `;

  db.query(query, [firstUserId, secondUserId], (err, results) => {
    if (err) {
      console.error("Error fetching conversations:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Sonuçları işle ve cevap olarak gönder
    const formattedResults = results.map((result) => ({
      id: result.conversationId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      memberIds: result.memberIds.split(",").map(Number),
    }));

    res.status(200).json(formattedResults);
  });
};
