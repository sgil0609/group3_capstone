const express = require("express");
const userRouter = express.Router();
const prisma = require("../db/client");

const { createUser, getUser, getUserByEmail } = require("../db");

const jwt = require("jsonwebtoken");

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

    const user = await createUser({
      name,
      email,
      password,
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

module.exports = userRouter;
