const ErrorHandler = require("../helpers/ErrorHandler");
const { Notice, addNoticeJOISchema } = require("../models/notice");

const getAllPetsController = async (req, res, next) => {
  const { query, gender } = req.query;
  if (query && gender) {
    const pets = await Notice.find({ title: query, sex: gender }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find({ title: query }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (!query && gender) {
    const pets = await Notice.find({ sex: gender }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (!query && !gender) {
    const pets = await Notice.find().sort({ createdAt: -1 });
    res.json(pets);
  }
};

const getSellPetsController = async (req, res, next) => {
  const { query, gender } = req.query;
  if (query && gender) {
    const pets = await Notice.find({
      category: "sell",
      title: query,
      sex: gender,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
  if (query && !gender) {
    const pets = await Notice.find({
      category: "sell",
      title: query,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
  if (!query && gender) {
    const pets = await Notice.find({
      category: "sell",
      sex: gender,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
  if (!query && !gender) {
    const pets = await Notice.find({ category: "sell" }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
};

const getLostPetsController = async (req, res, next) => {
  const { query, gender } = req.query;

  if (query && gender) {
    const pets = await Notice.find({
      category: "lost/found",
      title: query,
      sex: gender,
    });
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find({
      category: "lost/found",
      title: query,
    });
    res.json(pets);
  }

  if (!query && gender) {
    const pets = await Notice.find({
      category: "lost/found",
      sex: gender,
    });
    res.json(pets);
  }

  if (!query && !gender) {
    const pets = await Notice.find({ category: "lost/found" }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
};

const getInGoodHandsPetsController = async (req, res, next) => {
  const { query, gender } = req.query;

  if (query && gender) {
    const pets = await Notice.find({
      category: "in good hands",
      title: query,
      sex: gender,
    }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find({
      category: "in good hands",
      title: query,
    }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (!query && gender) {
    const pets = await Notice.find({
      category: "in good hands",
      sex: gender,
    }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (!query && !gender) {
    const pets = await Notice.find({ category: "in good hands" }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
};

const addNoticeController = async (req, res, next) => {
  const { error } = addNoticeJOISchema.validate(req.body);

  if (error) throw ErrorHandler(400, error.message);
  const notice = await Notice.create({ ...req.body, image: req.file.path });
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

module.exports = {
  getAllPetsController,
  addNoticeController,
  getNoticeControllerById,
  deleteNoticeController,
  getSellPetsController,
  getLostPetsController,
  getInGoodHandsPetsController,
};
