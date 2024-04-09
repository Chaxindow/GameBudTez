import { db } from "../connect.js";
import bcrypt from "bcryptjs";
<<<<<<< HEAD
=======

>>>>>>> 0d32800f5f5a779204d013809d43e9f5aabdb6f7

export const register = (req, res) => {
  //CHECK USER IF EXISTS

<<<<<<< HEAD
  const q = "SELECT *  FROM users WHERE username = ?";
=======
  const q = "SELECT * FROM users WHERE username = ?";
>>>>>>> 0d32800f5f5a779204d013809d43e9f5aabdb6f7

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
<<<<<<< HEAD
      "INSERT INTO users (`username`,`email`,` password`,` name`) VALUES (?)";
=======
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
>>>>>>> 0d32800f5f5a779204d013809d43e9f5aabdb6f7

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
