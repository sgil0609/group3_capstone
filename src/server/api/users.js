const express = require("express");
const userRouter = express.Router();
const prisma = require("../db/client");
const verify = require("../middleware/util.js");

const { createUser, getUser } = require("../db");

const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middleware/util.js");

userRouter.get("/", verify, async (req, res, next) => {
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
userRouter.get("/:id", verify, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.put("/:id", (req, res) => {
  userRouter.put("/:id", async (req, res) => {
    try {
      const userId = req.params.id; // Extract user ID from the URL
      const updatedUserData = req.body; // Assuming the updated data is sent in the request body
  
      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updatedUserData,
      });
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userRouter;
