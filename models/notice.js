const Joi = require("joi");
const { Schema, model } = require("mongoose");

const textRegexp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,16}$/;
const datePattern = /^[0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}$/;

const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["pet", "sell", "lost/found", "in good hands"],
      default: "sell",
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 16,
      match: [textRegexp, "Please fill name"],
    },
    date: {
      type: String,
      required: true,
      match: [datePattern, "Please enter the date in the format DD-MM-YYYY"],
    },
    breed: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 16,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: function (category) {
        if (
          category === "sell" ||
          category === "lost/found" ||
          category === "in good hands"
        ) {
          return true;
        }
      },
    },
    location: {
      type: String,
      required: function (category) {
        if (
          category === "sell" ||
          category === "lost/found" ||
          category === "in good hands"
        ) {
          return true;
        }
      },
    },
    price: {
      type: Number,
      min: 0,
      required: function (category) {
        if (category === "sell") {
          return true;
        }
      },
      default: 0,
    },
    comments: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    favoriteNotices: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

const addNoticeJOISchema = Joi.object({
  category: Joi.string()
    .valid("pet", "sell", "lost/found", "in good hands")
    .required(),
  title: Joi.string().required().messages({
    "any.required": `"title" is required`,
    "string.empty": `"title" cannot be empty`,
    "string.base": `"title" must be string`,
  }),
  name: Joi.string().min(2).max(16).pattern(textRegexp).required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  date: Joi.string().required().messages({
    "any.required": `"date" is required`,
    "date.empty": `"date" cannot be empty`,
    "date.base": `"date" must be date`,
  }),
  breed: Joi.string().min(2).max(16).required().messages({
    "any.required": `"breed" is required`,
    "string.empty": `"breed" cannot be empty`,
    "string.base": `"breed" must be string`,
  }),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().required().messages({
    "string.empty": `"location" cannot be empty`,
    "string.base": `"location" must be string`,
  }),
  price: Joi.any(),
  comments: Joi.string().min(0).max(120),
  image: Joi.string(),
});

module.exports = { Notice, addNoticeJOISchema };
