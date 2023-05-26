const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware");

const { Pet } = require("../models/petShema");

const ErroHandler = require("../helpers/ErrorHandler");

const listYourPets = async (req, res) => {
  const { _id: owner } = req.user.user;
  const result = await Pet.find(
    { owner },
    "-createdAt -updatedAt",
    {}
  ).populate("owner", "name date breed comments petsAvatar");
  res.json(result);
};

const addPet = async (req, res) => {
  const { _id: owner } = req.user.user;
  const result = await Pet.create({
    ...req.body,
    owner,
    petsAvatar: req.file.path,
  });
  res.status(201).json(result);
};

const removePet = async (req, res) => {
  const { id } = req.params;
  const result = await Pet.findByIdAndDelete(id);
  if (!result) {
    throw ErroHandler(404, `Pet with ${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = {
  listYourPets: tryCatchMiddleware(listYourPets),
  addPet: tryCatchMiddleware(addPet),
  removePet: tryCatchMiddleware(removePet),
};
