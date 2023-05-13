const {
  registerController,
  loginController,
  updateController,
  currentController,
  logoutController,
} = require("../../controllers/userControllers");
const { uploadCloud } = require("../../cloudinary");
const express = require("express");
const router = new express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");

router.post("/register", tryCatchMiddleware(registerController));

router.post("/login", tryCatchMiddleware(loginController));

router.get(
  "/current",
  isTokenValidMiddleware(tryCatchMiddleware(currentController))
);

router.post("/logout", tryCatchMiddleware(logoutController));

router.patch(
  "/update",
  uploadCloud.single("avatar"),
  isTokenValidMiddleware(tryCatchMiddleware(updateController))
);

module.exports = { authRouter: router };
