import pg from 'pg';

const env = require('dotenv');

env.config();

const dbConnection = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

dbConnection.on('connect', () => {
  console.log('database connected successfully');
});

export default dbConnection;
