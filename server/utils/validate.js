import { responseMsg } from './helpers';

const isValidEmail = input => /\S+@\S+\.\S/.test(input);

const lowerCaseChecker = input => /[a-z]/.test(input);

const upperCaseChecker = input => /[A-Z]/.test(input);

const numChecker = input => /[0-9]/.test(input);

const specCharChecker = input => /[$@#&!]/.test(input);

const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const uuidChecker = input => uuidRegex.test(input);

const updateInputRegex = /\b(new|processing|cancelled|complete)\b/;

const isValidUpdateInput = input => updateInputRegex.test(input);

const emptyInputChecker = (res, input, msg) => {
  if (!input || !input.trim()) {
    return responseMsg(res, 400, 'fail', `${msg} is required`);
  }
};

const emailChecker = (res, input, msg) => {
  if (!isValidEmail(input)) {
    return responseMsg(res, 400, 'fail', msg);
  }
};

const passwordLengthChecker = (res, input, msg) => {
  if (input.length < 8) {
    return responseMsg(res, 400, 'fail', msg);
  }
};

const passwordStrengthChecker = (res, input, msg) => {
  if (!lowerCaseChecker(input)) {
    return responseMsg(res, 400, 'fail', `${msg}`);
  }
};
const passwordStrengthChecker2 = (res, input, msg) => {
  if (!upperCaseChecker(input)) {
    return responseMsg(res, 400, 'fail', `${msg}`);
  }
};
const passwordStrengthChecker3 = (res, input, msg) => {
  if (!numChecker(input)) {
    return responseMsg(res, 400, 'fail', `${msg}`);
  }
};
const passwordStrengthChecker4 = (res, input, msg) => {
  if (!specCharChecker(input)) {
    return responseMsg(res, 400, 'fail', `${msg}`);
  }
};

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

  emptyInputChecker(res, firstname, 'First name');
  emptyInputChecker(res, lastname, 'Last name');
  emptyInputChecker(res, phone, 'phone');
  emptyInputChecker(res, email, 'email');
  emailChecker(res, email, 'Email is invalid');
  emptyInputChecker(res, password, 'password');
  passwordLengthChecker(res, password, 'Password must not be less than 8 characters');
  passwordStrengthChecker(res, password, 'Password must contain at least a lowercase');
  passwordStrengthChecker2(res, password, 'Password must contain at least an uppercase');
  passwordStrengthChecker3(res, password, 'Password must contain at least a number');
  passwordStrengthChecker4(res, password, 'Password must contain at least one \'$\', \'@\', \'#\', \'&\', or \'!\'');
  emptyInputChecker(res, location, 'Location');

  next();
};

/**
 * @description This function validate user signup input field
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  emptyInputChecker(res, email, 'email');
  emailChecker(res, email, 'Email is invalid');
  emptyInputChecker(res, password, 'password');
  passwordLengthChecker(res, password, 'Password must not be less than 8 characters');
  passwordStrengthChecker(res, password, 'Password must contain at least a lowercase');
  passwordStrengthChecker2(res, password, 'Password must contain at least an uppercase');
  passwordStrengthChecker3(res, password, 'Password must contain at least a number');
  passwordStrengthChecker4(res, password, 'Password must contain at least one \'$\', \'@\', \'#\', \'&\', or \'!\'');

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

  emptyInputChecker(res, food_name, 'Food menu');
  emptyInputChecker(res, description, 'Menu Description');
  emptyInputChecker(res, category, 'Menu Category');
  emptyInputChecker(res, price, 'price');

  next();
};

/**
 *@description This function validate order input fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const placeOrderValidator = (req, res, next) => {
  const { food_name, quantity_ordered } = req.body;

  emptyInputChecker(res, food_name, 'Food menu');
  emptyInputChecker(res, quantity_ordered, 'Quantity ordered');

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

  emptyInputChecker(order_status, res, 'order status');
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

/**
 * @description This is a reuseable function checks if a user is an admin
 * @param {object} req
 * @param {object} res
 */
export const adminChecker = (req, res) => {
  if (req.authData.user_status !== 'admin') {
    return responseMsg(res, 403, 'fail', 'admin access only');
  }
};
