const { registerUser, loginUser, updateUser } = require("../services/auth");
const ErrorHandler = require("../helpers/ErrorHandler");
const { userJOISchema, userUpdateJOISchema } = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let token;

const registerController = async (req, res) => {
  const { error } = userJOISchema.validate(req.body);

  if (error) throw ErrorHandler(400, error.message);

  const user = await registerUser(req.body);

  if (!user) throw ErrorHandler(409, "Email in use");

  const { email } = user;
  const { _id } = user;

  const { SECRET } = process.env;
  console.log("Secret: ", SECRET);
  token = jwt.sign({ _id }, SECRET);
  console.log("token", token);

  res.status(201).json({
    token,
    user: {
      email,
    },
  });
};

const loginController = async (req, res) => {
  const { error } = userJOISchema.validate(req.body);
  if (error) throw ErrorHandler(400, error.message);

  const { email, password } = req.body;
  const user = await loginUser(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw ErrorHandler(401, "Email/password is wrong or email isn't verified");
  }

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const updateController = async (req, res) => {
  let updatedUser;

  if (req.file) {
    updatedUser = await updateUser(req.params.id, {
      avatar: req.file.path,
    });
  }

  if (req.body) {
    const { error } = userUpdateJOISchema.validate(req.body);
    if (error) throw ErrorHandler(400, error.message);

    updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser) {
      throw ErrorHandler(404, "Not found");
    }
  }
  res.json(updatedUser);
};

const currentController = (req, res, next) => {
  const { email } = req.user.user;
  res.json({ email });
};

const logoutController = (req, res) => {
  req.headers.authorization = "";
  req.user.token = "";
  res.sendStatus(204);
};

module.exports = {
  registerController,
  loginController,
  updateController,
  currentController,
  logoutController,
};
