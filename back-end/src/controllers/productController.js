const pool = require('../utils/db');

// Get all products with info
const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg:'Server Error Fetching Products', error: err.message });
  }
};

module.exports = { getCategories };