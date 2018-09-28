import pg from 'pg';

const env = require('dotenv');

env.config();

let conString;

const devConString = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};


const devTestConString = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_TEST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

if (process.env.NODE_ENV === 'test') {
  conString = devTestConString;
} else if (process.env.NODE_ENV === 'production') {
  conString = process.env.DATABASE_URL;
} else {
  conString = devConString;
}

const dbConnection = new pg.Pool(conString);

dbConnection.on('connect', () => {
  console.log('database connected successfully');
});

export default dbConnection;
