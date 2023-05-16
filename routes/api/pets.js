const express = require("express");
const router = express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
const { uploadCloudSecond } = require("../../cloudinary");
const authentificate = require("../../middlewares/authentificate");

const {
  getAllPetsController,
  addNoticeController,
  getNoticeControllerById,
  deleteNoticeController,
  getSellPetsController,
  getLostPetsController,
  getInGoodHandsPetsController,
} = require("../../controllers/petsController");

router.get("/", tryCatchMiddleware(getAllPetsController));
router.get("/sell", tryCatchMiddleware(getSellPetsController));
router.get("/lost", tryCatchMiddleware(getLostPetsController));
router.get("/inGoodHands", tryCatchMiddleware(getInGoodHandsPetsController));

router.post(
  "/",
  uploadCloudSecond.single("image"),
  tryCatchMiddleware(addNoticeController)
);
router.get("/:id", tryCatchMiddleware(getNoticeControllerById));
router.delete("/:id", tryCatchMiddleware(deleteNoticeController));
// router.get("/search", tryCatchMiddleware(getNoticeControllerByTitle));

module.exports = router;
