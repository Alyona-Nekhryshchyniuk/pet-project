const moment = require("moment");
const ErrorHandler = require("../helpers/ErrorHandler");
const { Notice, addNoticeJOISchema } = require("../models/notice");

const filter = (query, gender) => {
  if (query && gender) {
    return { title: { $regex: query, $options: "i" }, sex: gender };
  }
  if (query && !gender) {
    return { title: { $regex: query, $options: "i" } };
  }
  if (!query && gender) {
    return { sex: gender };
  }
  if (!query && !gender) {
    return {};
  }
};

const getAllPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const pets = await Notice.find(filter(query, gender), "-updatedAt", {
    skip,
    limit,
  }).sort({
    createdAt: -1,
  });

  const totalNotice = await Notice.find(filter(query, gender));
  const total = totalNotice.length;
  return res.json({ pets, total });
};

const getSellPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const filters = await filter(query, gender);
  const pets = await Notice.find(
    { ...filters, category: "sell" },
    "-updatedAt",
    {
      skip,
      limit,
    }
  ).sort({
    createdAt: -1,
  });
  const totalNotice = await Notice.find({
    ...filters,
    category: "sell",
  });
  const total = totalNotice.length;
  return res.json({ pets, total });
};

const getLostPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const filters = filter(query, gender);

  const pets = await Notice.find(
    {
      ...filters,
      category: "lost/found",
    },
    "-updatedAt",
    {
      skip,
      limit,
    }
  );
  const totalNotice = await Notice.find({
    ...filters,
    category: "lost/found",
  });
  const total = totalNotice.length;
  res.json({ pets, total });
};

const getInGoodHandsPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const filters = filter(query, gender);

  const pets = await Notice.find(
    {
      ...filters,
      category: "in good hands",
    },
    "-updatedAt",
    {
      skip,
      limit,
    }
  ).sort({ createdAt: -1 });
  const totalNotice = await Notice.find({
    ...filters,
    category: "in good hands",
  });
  const total = totalNotice.length;
  res.json({ pets, total });
};

const addNoticeController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = addNoticeJOISchema.validate(req.body);

  if (error) throw ErrorHandler(400, error.message);
  const notice = await Notice.create({
    ...req.body,
    image: req.file.path,
    owner,
  });
  res.status(201).json(notice);
};

const getNoticeControllerById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Notice.findById(id);
  if (!result) {
    throw ErrorHandler(404, "Notice not found");
  }
  res.json(result);
};

const deleteNoticeController = async (req, res) => {
  const { id } = req.params;
  const removeNotice = await Notice.findByIdAndDelete(id);
  if (!removeNotice) {
    throw ErrorHandler(404, "Notice not found");
  }
  res.json({ message: "Notice deleted" });
};

const getMyAddsController = async (req, res, next) => {
  // const { _id } = req.user;
  // const { query, gender, page = 1, limit = 12 } = req.query;
  // const skip = (page - 1) * limit;
  // const filters = filter(query, gender);
  // const pets = await Notice.find({ ...filters, owner: _id }, "-updatedAt", {
  //   skip,
  //   limit,
  // }).sort({
  //   createdAt: -1,
  // });
  // const totalNotice = await Notice.find({
  //   ...filters,
  //   owner: owners,
  // });
  // const total = totalNotice.length;
  // res.json({ pets, total });
};

module.exports = {
  getAllPetsController,
  addNoticeController,
  getNoticeControllerById,
  deleteNoticeController,
  getSellPetsController,
  getLostPetsController,
  getInGoodHandsPetsController,
  getMyAddsController,
};
