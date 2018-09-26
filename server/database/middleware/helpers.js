export const isValidEmail = email => /\S+@\S+\.\S/.test(email);

export const responseMsg = (res, code, success, message, data) => res.status(code).json({
  success,
  message,
  data,
});
