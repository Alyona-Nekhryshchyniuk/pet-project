const express = require("express");

const ctrl = require("../../controllers/favoriteNoticesController");

const isValidId = require("../../middlewares/isValidId");

const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");

const authentificate = require("../../middlewares/authentificate");

const router = express.Router();

router.post(
  "/favorites/:id",
  authentificate,
  isValidId,
  isTokenValidMiddleware(ctrl.addToFavoriteController)
);
router.get(
  "/favorites",
  authentificate,
  isTokenValidMiddleware(ctrl.getFavoritesController)
);
router.delete(
  "/favorites/:id",
  authentificate,
  isValidId,
  isTokenValidMiddleware(ctrl.removeFromFavoritesController)
);

module.exports = { favoriteNoticesRouter: router };
