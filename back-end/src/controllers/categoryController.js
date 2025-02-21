const pool = require('../utils/db');

// Get all categories with all ther info
const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg:'Server Error Fetching Categories', error: err.message });
  }
};

// Get category by id
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id_category = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Get a single user
// const getUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new user
// const createUser = async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
//       [name, email]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update a user
// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
//       [name, email, id]
//     );
//     if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a user
// const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
//     res.json({ message: 'User deleted', user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = { getCategories, getCategoryById };
