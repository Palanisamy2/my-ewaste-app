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

module.exports = {
  query: (text, params) => pool.query(text, params),
};
