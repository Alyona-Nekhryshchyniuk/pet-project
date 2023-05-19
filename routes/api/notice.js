const express = require("express");
const router = express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
const { uploadCloudSecond } = require("../../cloudinary");
const authentificate = require("../../middlewares/authentificate");
const ctrl = require("../../controllers/favoriteNoticesController");
const isValidId = require("../../middlewares/isValidId");
const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");


const {
  getAllPetsController,
  addNoticeController,
  getNoticeControllerById,
  deleteNoticeController,
  getSellPetsController,
  getLostPetsController,
  getInGoodHandsPetsController,
  getMyAddsController,
} = require("../../controllers/noticesController");

router.get("/", tryCatchMiddleware(getAllPetsController));
router.get("/sell", tryCatchMiddleware(getSellPetsController));
router.get("/lost", tryCatchMiddleware(getLostPetsController));
router.get("/inGoodHands", tryCatchMiddleware(getInGoodHandsPetsController));
router.get("/myAdds/:id", tryCatchMiddleware(getMyAddsController));

router.post(
  "/",
  authentificate,
  uploadCloudSecond.single("image"),
  tryCatchMiddleware(addNoticeController)
);
router.get("/:id", tryCatchMiddleware(getNoticeControllerById));
router.delete(
  "/:id",
  authentificate,
  tryCatchMiddleware(deleteNoticeController)
);

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

module.exports = router;
