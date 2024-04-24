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

userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const _user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
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
