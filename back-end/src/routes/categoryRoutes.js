const { getCategories } = require('../controllers/categoryController');
const express = require('express');

const router = express.Router();

router.get('/categories', getCategories); // Get all categories
// router.get('/:id', getUser); // Get a single user by ID
// router.post('/', validateUser, createUser); // Create a user
// router.put('/:id', validateUser, updateUser); // Update a user
// router.delete('/:id', deleteUser); // Delete a user

module.exports = router;
