const { isValidObjectId } = require("mongoose");

const ErrorHandler = require("../helpers/ErrorHandler");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(ErrorHandler(404, `${id} invalid format`));
  }

  next();
};

module.exports = isValidId;
