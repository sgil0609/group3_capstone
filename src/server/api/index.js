// server/api/index.js
const express = require('express');
const productsRouter = require('../routes/product');

const router = express.Router();

router.use('/products', productsRouter);

module.exports = router;
