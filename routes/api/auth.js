const {
  registerController,
  loginController,
  logoutController,
  updateController,
} = require("../../controllers/userControllers");
const express = require("express");
const router = new express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");
const path = require("path");
const pathToTemporaryFolder = path.resolve("temp");
const multer = require("multer");
console.log(pathToTemporaryFolder);
const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToTemporaryFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

router.post("/register", tryCatchMiddleware(registerController));

router.post("/login", tryCatchMiddleware(loginController));

router.post("/logout", tryCatchMiddleware(logoutController));

router.patch(
  "/avatar",
  upload.single("avatar"),
  isTokenValidMiddleware(tryCatchMiddleware(updateController))
);

module.exports = { authRouter: router };
