// server/api/products/productsRoutes.js
const express = require('express');
const { getProducts } = require('../api/product');

const router = express.Router();

router.get('/', getProducts);

module.exports = router;
