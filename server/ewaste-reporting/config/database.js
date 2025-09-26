const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necessary for Supabase
  },
});

pool.on('connect', () => {
  console.log('Connected to Supabase successfully!');
});

pool.query('SELECT NOW()')
    .then(res => console.log('Database time:', res.rows[0]))
    .catch(err => console.error('DB test failed:', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
