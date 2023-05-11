const ErrorHandler = (status, message) => {
  console.log("we are in errorHandler");
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = ErrorHandler;
