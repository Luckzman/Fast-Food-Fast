import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import responseMsg from './utils/helpers';

import router from './route/index';

/**
 * @description Create server using express framework
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', router);
app.use('*', (req, res) => responseMsg(res, 404, 'fail', 'wrong url entered'));

export default app;
