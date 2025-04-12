const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mood',
  password: '2002',
  port: 5432,
});

pool.connect()
  .then(() => console.log('🟢 Connected to PostgreSQL database.'))
  .catch(err => console.error('🔴 Error connecting to the database:', err));

module.exports = pool;
