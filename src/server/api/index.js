// server/api/index.js
const express = require("express");
const productRouter = require("./product");
const usersRouter = require("./users");
const productCategory = require("./category");
const router = express.Router();

router.use("/product", productRouter);
router.use("/users", usersRouter);
router.use("/category", productCategory);
// cart router

module.exports = router;
