import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { responseMsg } from './utils/helpers';

import router from './route/index';


const swaggerDocument = require('../swagger.json');

/**
 * @description Create server using express framework
 */
const app = express();
app.use('/image/menu/', express.static('image/menu/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', router);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('*', (req, res) => responseMsg(res, 404, 'fail', 'wrong url entered'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

export default app;
