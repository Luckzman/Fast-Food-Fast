import express from 'express';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import logger from 'morgan';

import router from './routes/index';

/**
 * steps:
 * Create server using express
 * use body parser to parse request body object and
 * logger to logger messages to the console
 * handle error when users reach route that are unreachable.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(logger('dev'));
app.use('/', router);
app.use('*', (req, res, next) => {
  const error = new Error('Wrong Url Entered');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message,
  });
  next();
});
export default app;
