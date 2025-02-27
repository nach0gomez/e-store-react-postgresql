const express = require('express');
const { getProducts, getProductById, getProductsByCategory, getProductsByQuery } = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Get a product by ID
router.get('/products/:id', getProductById);

// Get products by category
router.get('/categories/:id/products', getProductsByCategory);

// Get products by query
router.get('/products/search/:query', getProductsByQuery);

module.exports = router;
