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

module.exports = router;
