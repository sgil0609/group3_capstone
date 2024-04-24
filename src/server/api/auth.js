const express = require("express");
const authRouter = express.Router();
const prisma = require("../db/client");
const bcrypt = require("bcrypt");
const { createUser } = require("../db/users");

// const saltRounds = 10;

authRouter.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing information!" });
  }
  createUser(email, password, first_name, last_name);
});

module.exports = authRouter;
