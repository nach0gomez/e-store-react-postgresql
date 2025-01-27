const pool = require('./src/utils/db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    pool.end(); // Close the connection pool
  }
})();
