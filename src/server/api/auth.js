const express = require("express");
const authRouter = express.Router();
const prisma = require("../db/client");
const bcrypt = require("bcrypt");
const { createUser } = require("../db/users");
const jwt = require("jsonwebtoken");
// const saltRounds = 10;

authRouter.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing information!" });
  }
  try {
    const user = await createUser(first_name, last_name, email, password);
    return res.status(200).json({ msg: "User created", data: user });
  } catch (error) {
    return res.status(400).json({ msg: "User Already exists!" });
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Account not found." });
    }
    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Incorrect password!" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.send({
      message: "Login successful!",
      token,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = authRouter;
