const ErrorHandler = require("../helpers/ErrorHandler");
const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware");
const filter = require("../helpers/filter");
const { User } = require("../models/schema");
const { Notice } = require("../models/notice");
const mongoose = require("mongoose");

const addToFavoriteController = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user.user;

  const user = await User.findById(owner);
  const isInFavorites = user.favoriteNotices.includes(id);

  if (isInFavorites) {
    throw ErrorHandler(409, `Notice with id: ${id} has been already added`);
  }

  await User.findByIdAndUpdate(
    { _id: owner },
    { $push: { favoriteNotices: new mongoose.Types.ObjectId(id) } },
    { new: true }
  );

  res.status(200).json({
    message: `Notice with id=${id} has been added to favorite`,
  });
};

const getFavoritesController = async (req, res) => {
  const { _id: owner } = req.user.user;
  const { page = 1, limit = 12, query, gender, age } = req.query;
  const skip = (page - 1) * limit;

  const userDataWithNotices = await User.findOne({ _id: owner }).populate({
    path: "favoriteNotices",
    match: { title: { $regex: new RegExp(query, "i") } },
    options: {
      select: "-createdAt -updatedAt",
      skip: Number(skip),
      limit: Number(limit),
    },
  });
  const allPets = await Notice.find(filter(query, gender, age)).populate(
    "owner",
    "email phone"
  );

  const pets = [];

  allPets.forEach((pet) => {
    userDataWithNotices.favoriteNotices.forEach((favId) => {
      if (pet.id === favId.toString()) {
        pets.push(pet);
      }
    });
  });

  const total = pets.length;

  pets.reverse();

  return res.status(200).json({ pets, total });
};

const removeFromFavoritesController = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user.user;
  const user = await User.findById(owner);

  if (!user.favoriteNotices.includes(id)) {
    throw ErrorHandler(400, `Notice with ${id} has not been found`);
  }

  await User.findByIdAndUpdate(
    { _id: owner },
    { $pull: { favoriteNotices: { $in: [new mongoose.Types.ObjectId(id)] } } },
    { new: true }
  );

  res.status(200).json({
    message: `Notice with id=${id} has been removed from favorites`,
  });
};

module.exports = {
  addToFavoriteController: tryCatchMiddleware(addToFavoriteController),
  getFavoritesController: tryCatchMiddleware(getFavoritesController),
  removeFromFavoritesController: tryCatchMiddleware(
    removeFromFavoritesController
  ),
};
