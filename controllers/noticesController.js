const ErrorHandler = require("../helpers/ErrorHandler");
const { Notice, addNoticeJOISchema } = require("../models/notice");

const getAllPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  if (query && gender) {
    const pets = await Notice.find(
      { title: query, sex: gender },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    // const total = await Notice.find({ title: query, sex: gender });
    // const totalNotice = total.length;
    // console.log(totalNotice);
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find({ title: query }, "-updatedAt", {
      skip,
      limit,
    }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (!query && gender) {
    const pets = await Notice.find({ sex: gender }, "-updatedAt", {
      skip,
      limit,
    }).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (!query && !gender) {
    const pets = await Notice.find({}, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
};

const getSellPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  if (query && gender) {
    const pets = await Notice.find(
      {
        category: "sell",
        title: query,
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
    res.json(pets);
  }
  if (query && !gender) {
    const pets = await Notice.find(
      {
        category: "sell",
        title: query,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    res.json(pets);
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
    res.json(pets);
  }
  if (!query && !gender) {
    const pets = await Notice.find({ category: "sell" }, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
};

const getLostPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  if (query && gender) {
    const pets = await Notice.find(
      {
        category: "lost/found",
        title: query,
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    );
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find(
      {
        category: "lost/found",
        title: query,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    );
    res.json(pets);
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
    res.json(pets);
  }

  if (!query && !gender) {
    const pets = await Notice.find({ category: "lost/found" }, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
  }
};

const getInGoodHandsPetsController = async (req, res, next) => {
  const { query, gender, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  if (query && gender) {
    const pets = await Notice.find(
      {
        category: "in good hands",
        title: query,
        sex: gender,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find(
      {
        category: "in good hands",
        title: query,
      },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    res.json(pets);
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
    res.json(pets);
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
    res.json(pets);
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
      { owner: owner, title: query, sex: gender },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    res.json(pets);
  }

  if (query && !gender) {
    const pets = await Notice.find(
      { owner: owner, title: query },
      "-updatedAt",
      {
        skip,
        limit,
      }
    ).sort({
      createdAt: -1,
    });
    res.json(pets);
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
    res.json(pets);
  }

  if (!query && !gender) {
    const pets = await Notice.find({ owner: owner }, "-updatedAt", {
      skip,
      limit,
    }).sort({
      createdAt: -1,
    });
    res.json(pets);
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
