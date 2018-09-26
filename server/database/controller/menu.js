// import db from '../model/config';
import { responseMsg } from '../middleware/helpers';

export const createMenu = (req, res) => {
  responseMsg(res, 201, true, 'menu created');
};

export const getMenu = (req, res) => {
  responseMsg(res, 200, true, 'get request successful');
};
