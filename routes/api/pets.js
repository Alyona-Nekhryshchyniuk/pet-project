const express = require("express");
const router = express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");
const { uploadCloudSecond } = require("../../cloudinary");
const authentificate = require("../../middlewares/authentificate");

const {
  getAllPetsController,
  addNoticeController,
  getNoticeControllerById,
  getNoticeControllerByTitle,
  deleteNoticeController,
} = require("../../controllers/petsController");

router.get("/", tryCatchMiddleware(getAllPetsController));
router.post(
  "/",
  uploadCloudSecond.single("image"),
  tryCatchMiddleware(addNoticeController)
);
router.get("/:id", tryCatchMiddleware(getNoticeControllerById));
router.delete("/:id", tryCatchMiddleware(deleteNoticeController));
// router.get("/search", tryCatchMiddleware(getNoticeControllerByTitle));

module.exports = router;
