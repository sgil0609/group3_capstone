// server/api/index.js
const express = require("express");
const router = express.Router();

const productRouter = require("./product");
const usersRouter = require("./users");
const authRouter = require("./auth");
const productCategory = require("./category");


router.use("/product", productRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/category", productCategory);
// cart router

module.exports = router;
