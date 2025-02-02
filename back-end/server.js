const express = require('express');
const pool = require('./src/utils/db');
const categoriesRoutes  = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const app = express();

app.use(express.json()); // Parse JSON bodies

// Example route
app.get('/pokemons', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemons');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Category routes
app.use('/api', categoriesRoutes);
// Products routes
app.use('/api', productRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} -> http://localhost:${PORT}/`);
});
