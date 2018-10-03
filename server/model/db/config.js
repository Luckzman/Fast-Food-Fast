import pg from 'pg';

require('dotenv').config();

let conString;

let ssl;
if (process.env === 'production') {
  ssl = true;
} else {
  ssl = false;
}

const devConString = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// const devTestConString = process.env.DATABASE_URL;

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

const dbConnection = new pg.Pool(conString, ssl);

dbConnection.on('connect', () => {
  console.log('database connected successfully');
});

export default dbConnection;
