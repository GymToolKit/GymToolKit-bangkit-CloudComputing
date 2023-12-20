const { Pool } = require('pg');
require('dotenv').config();

class Database {
  constructor() {
    this._pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
    });

    this._pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  query(query, params) {
    return this._pool.query(query, params);
  }

  getClient() {
    return this._pool.connect();
  }
}

module.exports = new Database();
