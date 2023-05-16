const jwt = require("jsonwebtoken");
const ErrorHandler = require("../helpers/ErrorHandler");
require("dotenv").config();
const { SECRET } = process.env;
const { User } = require("../models/schema");

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw ErrorHandler(401, "Not authorized");
  }

  try {
    const { _id } = jwt.verify(token, SECRET);
    const user = await User.findById(_id);

    if (!user) {
      throw ErrorHandler(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(ErrorHandler(401, "Not authorized"));
  }
};

module.exports = authentificate;
