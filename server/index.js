import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { responseMsg } from './utils/helpers';

import router from './route/index';


/**
 * @description Create server using express framework
 */
const app = express();
app.use('/image/menu/', express.static('image/menu/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', router);
app.use('/', (req, res) => res.redirect('/api-doc'));
app.use('*', (req, res) => responseMsg(res, 404, 'fail', 'wrong url entered'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

export default app;
