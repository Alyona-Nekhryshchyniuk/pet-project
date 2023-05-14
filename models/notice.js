const Joi = require("joi");
const { Schema, model } = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
const textRegexp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,16}$/;
const phoneNumberRegexp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

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
      enum: ["my pet", "sell", "lost-found", "for-free"],
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
          category === "lost-found" ||
          category === "for-free"
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
          category === "lost-found" ||
          category === "for-free"
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
    },
    comments: {
      type: String,
      required: false,
      minlength: 8,
      maxlength: 120,
    },
    image: {
      type: String,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

// const addPetJOISchema = Joi.object({
//   category: Joi.string()
//     .valid("my pet", "sell", "lost-found", "for-free")
//     .required(),
//   name: Joi.string().min(2).max(16).pattern(textRegexp).required().messages({
//     "any.required": `"name" is required`,
//     "string.empty": `"name" cannot be empty`,
//     "string.base": `"name" must be string`,
//   }),
//   date: Joi.string().required().messages({
//     "any.required": `"date" is required`,
//     "date.empty": `"date" cannot be empty`,
//     "date.base": `"date" must be date`,
//   }),
//   breed: Joi.string().min(2).max(16).pattern(textRegexp).required().messages({
//     "any.required": `"breed" is required`,
//     "string.empty": `"breed" cannot be empty`,
//     "string.base": `"breed" must be string`,
//   }),
//   sex: Joi.string()
//     .pattern("sell", "lost-found", "for-free", Joi.required())
//     .valid("male", "female"),
//   location: Joi.string()
//     .pattern("sell", "lost-found", "for-free", Joi.required())
//     .messages({
//       "string.empty": `"location" cannot be empty`,
//       "string.base": `"location" must be string`,
//     }),
//   price: Joi.number().min(0).pattern("sell", Joi.required()).messages({
//     "any.required": `"price" is required`,
//     "number.empty": `"price" cannot be empty`,
//     "number.base": `"price" must be number`,
//   }),
//   comments: Joi.string().min(8).max(120),
// });

module.exports = Notice;
