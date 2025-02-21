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

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id_product = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg:'Server Error Fetching Product', error: err.message });
  }
}


// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id_category = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error Fetching Products', error: err.message });
  }
}


const getFilteredProducts = async (req, res) => {
  try {
    const { id, category, price } = req.query;  // Ahora usamos query params (?id=1&category=food)
    
    let query = 'SELECT * FROM products WHERE 1=1';  // 1=1 permite agregar condiciones dinámicamente
    let values = [];
    let index = 1;

    if (id) {
      query += ` AND id_product = $${index}`;
      values.push(id);
      index++;
    }

    if (category) {
      query += ` AND category = $${index}`;
      values.push(category);
      index++;
    }

    if (price) {
      query += ` AND price <= $${index}`;
      values.push(price);
      index++;
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error Fetching Products', error: err.message });
  }
};


module.exports = { getProducts, getProductById, getProductsByCategory };