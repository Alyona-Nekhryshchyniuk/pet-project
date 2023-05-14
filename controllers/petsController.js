const ErrorHandler = require("../helpers/ErrorHandler");
const Notice = require("../models/notice");

const getAllPetsController = async (req, res, next) => {
  console.log(req.query);
  const pets = await Notice.find();
  res.json(pets);
};

const addNoticeController = async (req, res, next) => {
  // const { error } = addPetJOISchema.validate(req.body);

  // if (error) throw ErrorHandler(400, error.message);
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

const getNoticeControllerByTitle = async (req, res, next) => {
  const { query } = req.query;
  console.log(query);
  const result = await Notice.find({ title: query });
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

// const getCatagoryController = async (req, res) => {
//   const { cate } = req.params;
// }

module.exports = {
  getAllPetsController,
  addNoticeController,
  getNoticeControllerById,
  deleteNoticeController,
  getNoticeControllerByTitle,
};
