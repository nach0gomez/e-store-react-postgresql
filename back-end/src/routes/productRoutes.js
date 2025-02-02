const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/products', getAllProducts);

// Get a product by ID
router.get('/products/:id', getProductById);

module.exports = router;
