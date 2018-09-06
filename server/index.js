import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './routes/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', router);

export default app;
