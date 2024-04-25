const express = require("express");
const userRouter = express.Router();
const prisma = require("../db/client");

const { createUser, getUser } = require("../db");

const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middleware/authMiddleware.js");

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Protected route: Requires valid JWT token
userRouter.get("/:id", async (req, res) => {
  try {
    // Access user ID from req.user
    const userId = req.user.id;

    // Find a user by their ID using Prisma's findUnique method
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      // Respond with user profile details
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.get("/users/:id", (req, res) => {
  // get a user by id
});

userRouter.put("/users/:id", (req, res) => {
  // update a user by id
});

userRouter.delete("/users/:id", (req, res) => {
  // delete a user by id
});

module.exports = userRouter;
