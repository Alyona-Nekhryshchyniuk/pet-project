const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/ErrorHandler");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models/schema");

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw ErrorHandler(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
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
