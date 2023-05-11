const express = require("express");
const router = new express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
// const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");
// const multer = require("multer");
// const path = require("path");

const {
  registerController,
  loginController,
  logoutController,
} = require("../../controllers/userControllers");

router.post("/register", tryCatchMiddleware(registerController));

router.post("/login", tryCatchMiddleware(loginController));

router.post("/logout", tryCatchMiddleware(logoutController));

module.exports = { authRouter: router };
