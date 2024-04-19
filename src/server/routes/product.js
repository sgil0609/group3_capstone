const express = require('express');
const { getProducts, createProduct } = require('../api/product');

const router = express.Router();

router.get('/', getProducts);
router.post('/product/id:', create )

module.exports = router;