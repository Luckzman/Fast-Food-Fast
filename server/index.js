import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './routes/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
