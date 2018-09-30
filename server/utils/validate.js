import responseMsg from './helpers';

const isValidEmail = email => /\S+@\S+\.\S/.test(email);

const isValidInt = input => /^\+?\d+$/.test(input);

const lowerCaseChecker = input => /[a-z]/.test(input);

const upperCaseChecker = input => /[A-Z]/.test(input);

const numChecker = input => /[0-9]/.test(input);

const specCharChecker = input => /[$@#&!]/.test(input);

export const signupValidator = (req, res, next) => {
  let {
    firstname, lastname, phone, email, password,
  } = req.body;

  firstname = firstname.trim();
  lastname = lastname.trim();
  phone = phone.trim();
  email = email.trim();
  password = password.trim();

  if (!firstname) {
    return responseMsg(res, 400, 'fail', 'First name is missing');
  }
  if (typeof firstname !== 'string') {
    return responseMsg(res, 400, 'fail', 'First name must be string');
  }
  if (!lastname) {
    return responseMsg(res, 400, 'fail', 'Last name is missing');
  }
  if (typeof lastname !== 'string') {
    return responseMsg(res, 400, 'fail', 'Last name must be string');
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

  next();
};

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

export const menuValidator = (req, res, next) => {
  let {
    food_name, description, category, price, image,
  } = req.body;

  food_name = food_name.trim();
  description = description.trim();
  category = category.trim();
  price = price.trim();
  image = image.trim();

  if (!food_name) {
    return responseMsg(res, 400, 'fail', 'food name is missing');
  }
  if (!description) {
    return responseMsg(res, 400, 'fail', 'description is missing');
  }
  if (!category) {
    return responseMsg(res, 400, 'fail', 'Category is not selected');
  }
  if (!price) {
    return responseMsg(res, 400, 'fail', 'price is missing');
  }
  if (!isValidInt(price)) {
    return responseMsg(res, 400, 'fail', 'price must be a number');
  }
  if (!image) {
    return responseMsg(res, 400, 'fail', 'upload an image');
  }

  next();
};
