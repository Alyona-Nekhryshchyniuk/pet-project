const express = require("express");

const ctrl = require("../../controllers/yourPetsControllers");

const { isValidId } = require("../../middlewares/isValidId");

const {
  isTokenValidMiddleware,
} = require("../../middlewares/isTokenValidMiddleware");

const { validateBody } = require("../../helpers/validateBody");

const { petJOISchema } = require("../../helpers/petShema");

const { uploadCloudThird } = require("../../cloudinary");

const router = express.Router();

router.get("/", isTokenValidMiddleware, ctrl.listYourPets);

router.post(
  "/",
  uploadCloudThird.single("petsAvatar"),
  isTokenValidMiddleware,
  validateBody(petJOISchema),
  ctrl.addPet
);

router.put(
  "/:id",
  isTokenValidMiddleware,
  isValidId,
  validateBody(petJOISchema),
  ctrl.updatePet
);

router.delete("/:id", isTokenValidMiddleware, isValidId, ctrl.removePet);

module.exports = {yourPetsRouter: router};
