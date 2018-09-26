import pg from 'pg';

require('dotenv').config();

let connString;

const devConnString = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const devConnStringTest = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_TEST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

if (process.env.NODE_ENV === 'test') {
  connString = devConnStringTest;
}
if (process.env.NODE_ENV === 'production') {
  connString = process.env.DATABASE_URL;
}
connString = devConnString;


const dbConnection = new pg.Pool(connString);

dbConnection.on('connect', () => {
  console.log('database connected successfully');
});

export default dbConnection;
