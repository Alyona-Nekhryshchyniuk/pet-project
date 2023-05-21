const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware");

const { Pet } = require("../models/petShema");

const { ErroHandler } = require("../helpers/ErrorHandler");

const listYourPets = async (req, res) => {
  const { _id: owner } = req.user.user;
  // const { page = 1, limit = 20 } = req.query;
  // const skip = (page - 1) * limit;
  const result = await Pet.find({ owner }, "-createdAt -updatedAt", {
    // skip,
    // limit,
  }).populate("owner", "name date breed comments petsAvatar");
  res.json(result);
};

// const getPetById = async (req, res) => {
//     const { id } = req.params;
//     // const result = await Contact.findOne({_id: id});
//     const result = await Pet.findById(id);
//     if (!result) {
//         throw ErroHandler(404, `Pet with ${id} not found`);
//     }
//     res.json(result);
// };

const addPet = async (req, res) => {
  const { _id: owner } = req.user.user;
  const result = await Pet.create({
    ...req.body,
    owner,
    petsAvatar: req.file.path,
  });
  res.status(201).json(result);
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const result = await Pet.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw ErroHandler(404, `Pet with ${id} not found`);
  }
  res.json(result);
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
  updatePet: tryCatchMiddleware(updatePet),
  removePet: tryCatchMiddleware(removePet),
};
