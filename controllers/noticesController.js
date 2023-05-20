const ErrorHandler = require("../helpers/ErrorHandler");
const { Notice, addNoticeJOISchema } = require("../models/notice");

const getAllPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  if (query && gender) {
    const pets = await Notice.find(
      { title: { $regex: query, $options: "i" }, sex: gender },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      sex: gender,
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (query && !gender) {
    const pets = await Notice.find(
      { title: { $regex: query, $options: "i" } },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && gender) {
    const pets = await Notice.find({ sex: gender }, "-updatedAt", {
      skip,
      limit,
    }).sort({ createdAt: -1 });
    const totalNotice = await Notice.find({
      sex: gender,
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && !gender) {
    const pets = await Notice.find({}, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({});
    const total = totalNotice.length;
    res.json({ pets, total });
  }
};

const getSellPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  if (query && gender) {
    const pets = await Notice.find(
      {
        category: "sell",
        title: { $regex: query, $options: "i" },
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      sex: gender,
      category: "sell",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
  if (query && !gender) {
    const pets = await Notice.find(
      {
        category: "sell",
        title: { $regex: query, $options: "i" },
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i", category: "sell" },
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
  if (!query && gender) {
    const pets = await Notice.find(
      {
        category: "sell",
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      sex: gender,
      category: "sell",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
  if (!query && !gender) {
    const pets = await Notice.find({ category: "sell" }, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({ category: "sell" });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
};

const getLostPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  if (query && gender) {
    const pets = await Notice.find(
      {
        category: "lost/found",
        title: { $regex: query, $options: "i" },
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    );
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      sex: gender,
      category: "lost/found",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (query && !gender) {
    const pets = await Notice.find(
      {
        category: "lost/found",
        title: { $regex: query, $options: "i" },
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    );
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      category: "lost/found",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && gender) {
    const pets = await Notice.find(
      {
        category: "lost/found",
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    );
    const totalNotice = await Notice.find({
      sex: gender,
      category: "lost/found",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && !gender) {
    const pets = await Notice.find({ category: "lost/found" }, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({ category: "lost/found" });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
};

const getInGoodHandsPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  if (query && gender) {
    const pets = await Notice.find(
      {
        category: "in good hands",
        title: { $regex: query, $options: "i" },
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      sex: gender,
      category: "in good hands",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (query && !gender) {
    const pets = await Notice.find(
      {
        category: "in good hands",
        title: { $regex: query, $options: "i" },
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      category: "in good hands",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && gender) {
    const pets = await Notice.find(
      {
        category: "in good hands",
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    const totalNotice = await Notice.find({
      sex: gender,
      category: "in good hands",
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && !gender) {
    const pets = await Notice.find(
      { category: "in good hands" },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({ category: "in good hands" });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
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
  const { _id: owner } = req.user;
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  if (query && gender) {
    const pets = await Notice.find(
      { owner: owner, title: { $regex: query, $options: "i" }, sex: gender },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i" },
      sex: gender,
      owner: owner,
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (query && !gender) {
    const pets = await Notice.find(
      { owner: owner, title: { $regex: query, $options: "i" } },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      title: { $regex: query, $options: "i", owner: owner },
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && gender) {
    const pets = await Notice.find(
      { owner: owner, sex: gender },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({
      sex: gender,
      owner: owner,
    });
    const total = totalNotice.length;
    res.json({ pets, total });
  }

  if (!query && !gender) {
    const pets = await Notice.find({ owner: owner }, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    const totalNotice = await Notice.find({ owner: owner });
    const total = totalNotice.length;
    res.json({ pets, total });
  }
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
