import { responseMsg } from './helpers';

const isValidEmail = input => /\S+@\S+\.\S/.test(input);

const isValidInt = input => /^\+?\d+$/.test(input);

const lowerCaseChecker = input => /[a-z]/.test(input);

const upperCaseChecker = input => /[A-Z]/.test(input);

const numChecker = input => /[0-9]/.test(input);

const specCharChecker = input => /[$@#&!]/.test(input);

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const uuidChecker = input => uuidRegex.test(input);

const updateInputRegex = /\b(new|processing|cancelled|complete)\b/;

const isValidUpdateInput = input => updateInputRegex.test(input);

/**
 * @description This function validate user signup field
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const signupValidator = (req, res, next) => {
  const {
    firstname, lastname, phone, email, password, location,
  } = req.body;

  if (typeof firstname !== 'string') {
    return responseMsg(res, 400, 'fail', 'First name must be string');
  }
  if (!firstname || !firstname.trim()) {
    return responseMsg(res, 400, 'fail', 'First name is missing');
  }
  if (typeof lastname !== 'string') {
    return responseMsg(res, 400, 'fail', 'Last name must be string');
  }
  if (!lastname || !lastname.trim()) {
    return responseMsg(res, 400, 'fail', 'Last name is missing');
  }
  if (!phone) {
    return responseMsg(res, 400, 'fail', 'Phone number is missing');
  }
  if (!isValidInt(phone)) {
    return responseMsg(res, 400, 'fail', 'Phone number must be valid');
  }
  if (!email) {
    return responseMsg(res, 400, 'fail', 'Email is missing');
  }
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, 'fail', 'Email is invalid');
  }
  if (!password) {
    return responseMsg(res, 400, 'fail', 'Password is missing');
  }
  if (password.length < 8) {
    return responseMsg(res, 400, 'fail', 'Password must not be less than 8 characters');
  }
  if (!lowerCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at lease one lowercase character');
  }
  if (!upperCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at lease one uppercase character');
  }
  if (!numChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at lease one number');
  }
  if (!specCharChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain lease one \'$\', \'@\', \'#\', \'&\', or \'!\'');
  }
  if (typeof location !== 'string') {
    return responseMsg(res, 400, 'fail', 'location must be string');
  }
  if (!location || !location.trim()) {
    return responseMsg(res, 400, 'fail', 'location is missing');
  }

  next();
};

/**
 * @description This function validate user signup input field
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const loginValidator = (req, res, next) => {
  let {
    email, password,
  } = req.body;

  email = email.trim();
  password = password.trim();

  if (!email) {
    return responseMsg(res, 400, 'fail', 'Email is missing');
  }
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, 'fail', 'Email is invalid');
  }
  if (!password) {
    return responseMsg(res, 400, 'fail', 'Password is missing');
  }
  if (password.length < 8) {
    return responseMsg(res, 400, 'fail', 'Password must not be less than 8 characters');
  }
  if (!lowerCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at lease one lowercase character');
  }
  if (!upperCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at lease one uppercase character');
  }
  if (!numChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at lease one number');
  }
  if (!specCharChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain lease one \'$\', \'@\', \'#\', \'&\', or \'!\'');
  }

  next();
};


/**
 * @description This function validate menu input fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const menuValidator = (req, res, next) => {
  const {
    food_name, description, category, price,
  } = req.body;
  // const image = `${req.file.destination}${req.file.filename}`;
  // const { image } = req.file;

  // food_name = food_name.trim();
  // description = description.trim();
  // category = category.trim();

  if (typeof food_name !== 'string') {
    return responseMsg(res, 400, 'fail', 'Food menu name must be string');
  }
  if (!food_name || !food_name.trim()) {
    return responseMsg(res, 400, 'fail', 'Food menu name is missing');
  }
  if (typeof description !== 'string') {
    return responseMsg(res, 400, 'fail', 'Menu description must be string');
  }
  if (!description || !description.trim()) {
    return responseMsg(res, 400, 'fail', 'Menu description is missing');
  }
  if (typeof category !== 'string') {
    return responseMsg(res, 400, 'fail', 'Menu category must be string');
  }
  if (!category || !category.trim()) {
    return responseMsg(res, 400, 'fail', 'Menu category is not selected');
  }
  if (!price) {
    return responseMsg(res, 400, 'fail', 'price is missing');
  }
  if (!isValidInt(price)) {
    return responseMsg(res, 400, 'fail', 'price must be a number');
  }
  // if (!image) {
  //   return responseMsg(res, 400, 'fail', 'image is missing');
  // }

  next();
};

/**
 *@description This function validate order input fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const placeOrderValidator = (req, res, next) => {
  const {
    quantity_ordered,
  } = req.body;

  if (!quantity_ordered) {
    return responseMsg(res, 400, 'fail', 'quantity ordered is missing');
  }
  if (!isValidInt(quantity_ordered)) {
    return responseMsg(res, 400, 'fail', 'quantity ordered must be a positive integer');
  }

  next();
};

/**
 *@description This function validate order input fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const updateOrderValidator = (req, res, next) => {
  const {
    order_status,
  } = req.body;

  if (!order_status) {
    return responseMsg(res, 400, 'fail', 'order_status is missing');
  }
  if (!isValidUpdateInput(order_status)) {
    return responseMsg(res, 400, 'fail', 'order_status must be either new, processing, cancelled or complete');
  }

  next();
};

/**
 * @description This function ensures params id is a UUID type
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const urlParamsChecker = (req, res, next) => {
  const { id } = req.params;

  if (!uuidChecker(id)) {
    return responseMsg(res, 400, 'fail', 'url params id is not valid');
  }

  next();
};
