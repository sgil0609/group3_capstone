const express = require("express");
const authRouter = express.Router();
const prisma = require("../db/client");
const bcrypt = require("bcrypt");
const { createUser, getUserByEmail } = require("../db/users");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing Email or Password!" });
  }
  try {
    const user = await createUser(first_name, last_name, email, password);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    return res.status(201).send({ msg: "user created Successfully!", token });
  } catch (error) {
    console.error(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!email || !password) {
      return res.status(400).json({ msg: "Incorrect username or password!" });
    }
    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log("password: ", user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ msg: "Incorrect password!", error: isPasswordValid });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
  }
});

module.exports = authRouter;
