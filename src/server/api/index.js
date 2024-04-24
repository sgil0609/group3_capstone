// server/api/index.js
const express = require("express");
const router = express.Router();

const productRouter = require("./product");
const usersRouter = require("./users");
const authRouter = require("./auth");


router.use("/product", productRouter);
router.use("/users", usersRouter);
//router.use("/cart", cartRouter);
router.use('/auth', authRouter);


module.exports = router;
