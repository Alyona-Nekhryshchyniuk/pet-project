const { registerUser, loginUser, updateUser } = require("../services/auth");
const ErrorHandler = require("../helpers/ErrorHandler");
const { userJOISchema, userUpdateJOISchema } = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { error } = userJOISchema.validate(req.body);

  if (error) throw ErrorHandler(400, error.message);

  const user = await registerUser(req.body);

  if (!user) throw ErrorHandler(409, "Email in use");

  const { email, avatar, name, birthday, phone, city } = user;
  const { _id } = user;

  const { SECRET } = process.env;
  console.log("Secret: ", SECRET);
  const token = jwt.sign({ _id }, SECRET);
  console.log("token", token);

  res.status(201).json({
    token,
    user: {
      email,
      avatar,
      name,
      birthday,
      phone,
      city,
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

  const { _id } = user;
  const { SECRET } = process.env;
  const token = jwt.sign({ _id }, SECRET);

  res.json({
    token,
    user: {
      id: _id,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      birthday: user.birthday,
      phone: user.phone,
      city: user.city,
    },
  });
};

const updateController = async (req, res) => {
  const { _id } = req.user.user;
  let updatedUser;

  if (req.file) {
    updatedUser = await updateUser(_id, {
      avatar: req.file.path,
    });
  }

  if (req.body) {
    const { error } = userUpdateJOISchema.validate(req.body);
    if (error) throw ErrorHandler(400, error.message);

    updatedUser = await updateUser(_id, req.body);
    if (!updatedUser) {
      throw ErrorHandler(404, "Not found");
    }
  }

  // Щоб не повертати приватні дані типу паролю та id, працює навіть якщо такого поля у юзера немає
  const { email, avatar, name, birthday, phone, city } = updatedUser;

  console.log(updatedUser);
  res.json({
    user: {
      email,
      avatar,
      name,
      birthday,
      phone,
      city,
    },
  });
};

const currentController = (req, res, next) => {
  const { email, avatar, name, birthday, phone, city } = req.user.user;
  res.json({
    email,
    avatar,
    name,
    birthday,
    phone,
    city,
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
  updateController,
  currentController,
  logoutController,
};
