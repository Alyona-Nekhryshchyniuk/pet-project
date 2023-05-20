const ErrorHandler = require("../helpers/ErrorHandler");
const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware");
const { User } = require("../models/schema");
const { Notice } = require("../models/notice");
const mongoose = require("mongoose");

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const addToFavoriteController = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user.user;

  const user = await User.findById(owner);
  const isInFavorites = user.favoriteNotices.includes(id);

  if (isInFavorites) {
    throw ErrorHandler(
      409,
      `Notice with id: ${id} has been already added`
    );
  }

  await User.findByIdAndUpdate(
    { _id: owner },
    { $push: {favoriteNotices: new mongoose.Types.ObjectId(id)}},
    { new: true }
  );

  res.status(200).json({
    message: `Notice with id=${id} has been added to favorite`,
  });
};

const getFavoritesController = async (req, res) => {
  const { _id: owner } = req.user.user;
  const { page = 1, limit = 12, query } = req.query;
  const skip = (page - 1) * limit;

  // const user = await User.findOne({ _id: owner }).populate({
  //   path: "favoriteNotices",
  //   match: { title: { $regex: new RegExp(search, "i") } },
  //   options: {
  //     select: "-createdAt -updatedAt",
  //   },
  // });
  // const totalItems = user.favoriteNotices.length;

  const userDataWithNotices = await User.findOne({ _id: owner }).populate({
    path: "favoriteNotices",
    match: { title: { $regex: new RegExp(query, "i") } },
    options: {
      select: "-createdAt -updatedAt",
      skip: Number(skip),
      limit: Number(limit),
    },
  });

  const getFavoriteItems = async () => {
    const items = [];
    await asyncForEach(userDataWithNotices.favoriteNotices, async (element) => {
      const notice = await Notice.findById(element);
      items.push(notice);
    });

    return items;
  };

  const favorites = await getFavoriteItems();
  favorites.reverse();
  return res.status(200).json(favorites);
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
