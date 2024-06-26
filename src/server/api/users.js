const express = require("express");
const userRouter = express.Router();
const prisma = require("../db/client");

//const { createUser, getUser } = require("../db");

const jwt = require("jsonwebtoken");

const { verify } = require("../middleware/util.js");

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

userRouter.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (deletedUser) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = userRouter;
