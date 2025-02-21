const { getCategories, getCategoryById } = require('../controllers/categoryController');
const express = require('express');

const router = express.Router();

// Get all categories
router.get('/categories', getCategories);

// Get a category by ID
router.get('/categories/:id', getCategoryById);
// router.post('/', validateUser, createUser); // Create a user
// router.put('/:id', validateUser, updateUser); // Update a user
// router.delete('/:id', deleteUser); // Delete a user

module.exports = router;
