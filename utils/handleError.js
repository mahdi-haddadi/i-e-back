exports.handleError = (statusCode, message = "", errors = {}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = errors;
  throw error;
};
