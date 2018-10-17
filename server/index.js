import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { responseMsg } from './utils/helpers';
import router from './route/index';

const swaggerDoc = require('../swagger.json');
/**
 * @description Create server using express framework
 */
const app = express();
app.use('/image/menu', express.static(path.join(__dirname, '../image/menu/')));
console.log(path.join(__dirname, '../image/menu'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/', router);
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('*', (req, res) => responseMsg(res, 404, 'fail', 'wrong url entered'));
app.use((error, req, res, next) => {
  res.status(error.status).json({
    success: 'fail',
    message: error.message,
  });
  next();
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

export default app;
