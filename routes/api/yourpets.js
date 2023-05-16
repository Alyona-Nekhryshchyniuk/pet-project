const express = require("express");

const ctrl = require("../../controllers/yourPetsControllers");

const isValidId = require("../../middlewares/isValidId");

const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");

const validateBody = require("../../helpers/validateBody");

const { petJOISchema } = require("../../models/petShema");

const { uploadCloudThird } = require("../../cloudinary");

const router = express.Router();

router.get("/", isTokenValidMiddleware(ctrl.listYourPets));

router.post(
  "/",
  uploadCloudThird.single("petsAvatar"),
  validateBody(petJOISchema),
  isTokenValidMiddleware(ctrl.addPet)
);

router.put(
  "/:id",
  isValidId,
  validateBody(petJOISchema),
  isTokenValidMiddleware(ctrl.updatePet)
);

router.delete("/:id", isTokenValidMiddleware, isValidId, ctrl.removePet);

module.exports = { yourPetsRouter: router };
