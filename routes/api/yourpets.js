const express = require("express");

const ctrl = require("../../controllers/yourPetsControllers");

const isValidId = require("../../middlewares/isValidId");

const isTokenValidMiddleware = require("../../middlewares/isTokenValidMiddleware");

const validateBody = require("../../helpers/validateBody");

const { petJOISchema } = require("../../models/petShema");

const { uploadCloudThird } = require("../../cloudinary");

const authentificate = require("../../middlewares/authentificate");

const router = express.Router();

router.get("/", isTokenValidMiddleware(ctrl.listYourPets));

router.post(
  "/",
  authentificate,
  uploadCloudThird.single("petsAvatar"),
  validateBody(petJOISchema),
  isTokenValidMiddleware(ctrl.addPet)
);

router.put(
  "/:id",
  authentificate,
  isValidId,
  validateBody(petJOISchema),
  isTokenValidMiddleware(ctrl.updatePet)
);

router.delete("/:id", authentificate, isValidId, isTokenValidMiddleware(ctrl.removePet));

module.exports = { yourPetsRouter: router };
