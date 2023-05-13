const { registerUser, findUserByMail } = require("../services/auth");
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
  //   avatar,
  //   verify;
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
  // console.log(user);
  // console.log(token);
  // req.user = { ...user, token };
  // console.log(req.user);
  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const updateController = async (req, res, next) => {
  console.log(req.file);
  if (req.file) {
    const modifFileName = `${Math.random() * (999 - 1) + 1}${
      req.file.filename
    }`;
    const tempDirFullPath = path.resolve(req.file.path);
    const permDirFullPath = path.resolve("public", "avatar", modifFileName);
    const fullFilePathOnUserObj = path.join("avatar", modifFileName);

    Jimp.read(req.file.path, (err, img) => {
      if (err) throw err;
      img.resize(250, 250);
    });

    await fs.rename(tempDirFullPath, permDirFullPath);

    console.log("}}}}", req.user);
    req.user._doc.avatar = fullFilePathOnUserObj;
  }
  if (req.body) {
    for (let key in req.body) {
      req.user._doc[key] = req.body[key];
    }
    console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}", req.user);
  }

  res.sendStatus(200);
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
  logoutController,
};
