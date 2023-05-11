const {
  registerUser,
  findUserByMail,
} = require("../services/user");
const fs = require("fs/promises");
const path = require("path");
const ErrorHandler = require("../helpers/ErrorHandler");
const { userJOISchema } = require("../helpers/schema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Jimp = require("jimp");

const registerController = async (req, res) => {
  // в req.body {email: ***, password:***}
  const { error } = userJOISchema.validate(req.body);

  if (error) throw ErrorHandler(400, error.message);

  const user = await registerUser(req.body);

  if (!user) throw ErrorHandler(409, "Email in use");
  // user на сервере будет таким {
  //   email,
  //   password,
  //   avatarURL,
  // }

  const { email } = user;

  res.status(201).json({
    user: {
      email,
    },
  });
};

const loginController = async (req, res) => {
  // в req.body {email: ***, password:***}
  const { error } = userJOISchema.validate(req.body);
  if (error) throw ErrorHandler(400, error.message);

  const { email, password } = req.body;
  const user = await findUserByMail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw ErrorHandler(401, "Email/password is wrong or email isn't verified");
  }
  const { _id } = user;
  const { SECRET } = process.env;
  const token = jwt.sign({ _id }, SECRET);
  req.user = { ...user, token };

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const logoutController = (req, res) => {
  req.headers.authorization = "";
  req.user.token = "";
  res.sendStatus(204);
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
