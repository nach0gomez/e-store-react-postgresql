const express = require('express');
const { getProducts } = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Get a product by ID
// router.get('/products/:id', getProductById);

module.exports = router;
