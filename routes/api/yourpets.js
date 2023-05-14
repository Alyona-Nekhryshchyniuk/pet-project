const express = require("express");

const ctrl = require("../../controllers/yourPetsControllers");

const { isValidId } = require("../../middlewares/isValidId");

const {
  isTokenValidMiddleware,
} = require("../../middlewares/isTokenValidMiddleware");

const { validateBody } = require("../../helpers/validateBody");

const { addPetJOISchema } = require("../../helpers/schema");

// const { uploadCloud } = require("../../cloudinary");

const router = express.Router();

router.get("/", isTokenValidMiddleware, ctrl.listYourPets);

router.get("/:id", isTokenValidMiddleware, isValidId, ctrl.getPetById);

router.post(
  "/",
  isTokenValidMiddleware,
  validateBody(addPetJOISchema),
  ctrl.addPet
);

router.put(
  "/:id",
  isTokenValidMiddleware,
  isValidId,
  validateBody(addPetJOISchema),
  ctrl.updatePet
);

// router.patch(
//   "/:id/update",
//   uploadCloud.single("petAvatar"),
//   isTokenValidMiddleware,
//   isValidId,
//   validateBody(addPetJOISchema),
//   ctrl.updatePet
// );

router.delete("/:id", isTokenValidMiddleware, isValidId, ctrl.removePet);

module.exports = router;
