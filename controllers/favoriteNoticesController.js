const ErrorHandler = require("../helpers/ErrorHandler");
const tryCatchMiddleware = require("../middlewares/tryCatchMiddleware");
const { Notice } = require("../models/notice");

const addToFavoriteController = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const notice = await Notice.findById(id);
  const isInFavorites = notice.favoriteNotices.includes(id);

  if (isInFavorites) {
    throw new ErrorHandler(409, `Notice with id: ${id} has been already added`);
  }

  await Notice.findByIdAndUpdate(
    { owner },
    { $push: { favoriteNotices: id } },
    { new: true }
  );

  res.status(200).json({
    message: `Notice with id=${id} has been added to favorite`,
  });
};

const getFavoritesController = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const favoriteNoticesArray = await Notice.findOne({ owner }).populate({
    path: "favoriteNotices",
    //   match: { title: { $regex: new RegExp(search, "i") } },
    options: {
      select: "-createdAt -updatedAt",
    },
  });
  const totalItems = favoriteNoticesArray.favoriteNotices.length;

  const userDataWithNotices = await Notice.findOne({ owner }).populate({
    path: "favoriteNotices",
    //   match: { title: { $regex: new RegExp(search, "i") } },
    options: {
      select: "-createdAt -updatedAt",
      skip: Number(skip),
      limit: Number(limit),
    },
  });

  const favorites = userDataWithNotices.favoriteNotices;

  favorites.reverse();
  return res.status(200).json(favorites, totalItems);
};

const removeFromFavoritesController = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const notice = await Notice.findById(id);

  if (!notice.favoriteNotices.includes(id)) {
    throw new ErrorHandler(400, `Notice with ${id} has not been found`);
  }

  await Notice.findByIdAndUpdate(
    { owner },
    { $pull: { favoriteNotices: id } },
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
