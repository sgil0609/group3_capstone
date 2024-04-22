// server/api/index.js
const express = require("express");
const productRouter = require("./product");
const usersRouter = require("./users");
const router = express.Router();

router.use("/product", productRouter);
router.use("/users", usersRouter);
// cart router

module.exports = router;
