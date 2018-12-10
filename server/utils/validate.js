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


/**
 * @description This function validate user signup field
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const signupValidator = (req, res, next) => {
  const {
    firstname, lastname, phone, email, password,
  } = req.body;

  if (!firstname || !firstname.trim()) {
    return responseMsg(res, 400, 'fail', 'First name is required');
  }
  if (!lastname || !lastname.trim()) {
    return responseMsg(res, 400, 'fail', 'Last name is required');
  }
  if (!phone || !phone.trim()) {
    return responseMsg(res, 400, 'fail', 'phone is required');
  }
  if (!email || !email.trim()) {
    return responseMsg(res, 400, 'fail', 'email is required');
  }
  if (!password || !password.trim()) {
    return responseMsg(res, 400, 'fail', 'password is required');
  }
  // if (!location || !location.trim()) {
  //   return responseMsg(res, 400, 'fail', 'password is required');
  // }
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, 'fail', 'email is not valid');
  }
  if (password.length < 8) {
    return responseMsg(res, 400, 'fail', 'password must not be less than 8 character');
  }
  if (!lowerCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'password must contain at least a lowercase');
  }
  if (!upperCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at least an uppercase');
  }
  if (!numChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at least a number');
  }
  if (!specCharChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at least one \'$\',\'@\',\'#\',\'&\',or\'!\'');
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
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return responseMsg(res, 400, 'fail', 'email is required');
  }
  if (!password || !password.trim()) {
    return responseMsg(res, 400, 'fail', 'password is required');
  }
  if (!isValidEmail(email)) {
    return responseMsg(res, 400, 'fail', 'email is not valid');
  }
  if (password.length < 8) {
    return responseMsg(res, 400, 'fail', 'password must not be less than 8 character');
  }
  if (!lowerCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'password must contain at least a lowercase');
  }
  if (!upperCaseChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at least an uppercase');
  }
  if (!numChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at least a number');
  }
  if (!specCharChecker(password)) {
    return responseMsg(res, 400, 'fail', 'Password must contain at least one \'$\',\'@\',\'#\',\'&\',or\'!\'');
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

  if (!food_name || !food_name.trim()) {
    return responseMsg(res, 400, 'fail', 'Food name is required');
  }
  if (!description || !description.trim()) {
    return responseMsg(res, 400, 'fail', 'Description is required');
  }
  if (!category || !category.trim()) {
    return responseMsg(res, 400, 'fail', 'category is required');
  }
  if (!price || !price.trim()) {
    return responseMsg(res, 400, 'fail', 'price is required');
  }

  next();
};

/**
 * @description This function validate reviews input fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const reviewsValidator = (req, res, next) => {
  const { review, rating } = req.body;

  if (!review || !review.trim()) {
    return responseMsg(res, 400, 'fail', 'Review is required');
  }
  if (!rating || !rating.trim()) {
    return responseMsg(res, 400, 'fail', 'Rating is required');
  }
  if (!numChecker(rating)) {
    return responseMsg(res, 400, 'fail', 'rating must be a number');
  }
  if (rating < 0 || rating > 10) {
    return responseMsg(res, 400, 'fail', 'rating must be between 0 and 10');
  }

  next();
};

/**
 *@description This function validate order input fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const placeOrderValidator = (req, res, next) => {
  const { cart } = req.body;

  if (!cart) {
    return responseMsg(res, 400, 'fail', 'cart item is required');
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

  if (!order_status || !order_status.trim()) {
    return responseMsg(res, 400, 'fail', 'order status is required');
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
