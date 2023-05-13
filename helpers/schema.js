const Joi = require("joi");
const { Schema, model } = require("mongoose");

// USER MONGOOSE SCHEMA
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
// const textRegexp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,16}$/;
const phoneNumberRegexp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

// const handleMongooseError = (error, data, next) => {
//   const { name, code } = error;
//   error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
//   next();
// };

const registerOrLoginMongooseSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
    maxLength: 16,
    match: [passwordRegexp, "Please fill a valid password"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email address is required"],
    unique: true,
    match: [emailRegexp, "Please fill a valid email address"],
  },
  avatar: {
    type: String,
    required: [true, "default avatar url is required"],
  },
});

const fieldsUpdateMongooseSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      maxLength: 16,
      match: [passwordRegexp, "Please fill a valid password"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [emailRegexp, "Please fill a valid email address"],
    },
    name: {
      type: String,
    },
    birthday: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
      match: [phoneNumberRegexp, "Please fill a valid phone number"],
    },

    token: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", fieldsUpdateMongooseSchema);
const UserUpdate = model("user", registerOrLoginMongooseSchema);
// const addPetSchema = new Schema(
//   {
//     category: {
//       type: String,
//       required: true,
//       enum: ["my pet", "sell", "lost-found", "for-free"],
//       default: "sell",
//     },
//     name: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 16,
//       match: [textRegexp, "Please fill name"],
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     breed: {
//       type: String,
//       required: true,
//       minLength: 2,
//       maxLength: 16,
//       match: [textRegexp, "Please fill breed"],
//     },
//     sex: {
//       type: String,
//       enum: ["male", "female"],
//       required: function (category) {
//         if (
//           category === "sell" ||
//           category === "lost-found" ||
//           category === "for-free"
//         ) {
//           return true;
//         }
//       },
//     },
//     location: {
//       type: String,
//       required: function (category) {
//         if (
//           category === "sell" ||
//           category === "lost-found" ||
//           category === "for-free"
//         ) {
//           return true;
//         }
//       },
//     },
//     price: {
//       type: Number,
//       min: 0,
//       required: function (category) {
//         if (category === "sell") {
//           return true;
//         }
//       },
//     },
//     comments: {
//       type: String,
//       required: false,
//       minlength: 8,
//       maxlength: 120,
//     },
//     petAvatarURL: String,
//   },
//   { versionKey: false, timestamps: true }
// );

// addPetSchema.post("save", handleMongooseError);

// const Pet = model("pet", addPetSchema);

// // =======================================================================================
// // JOI SCHEMAS

const emailMessages = {
  "any.required": `Missing required "email" field`,
  "string.empty": `"email" cannot be an empty field`,
  "string.empty": `"email" cannot be an empty field`,
  "string.email": `"email" must be a valid email`,
  "string.pattern.base": "must be valid email",
};

const userJOISchema = Joi.object({
  email: Joi.string().regex(emailRegexp).required().messages(emailMessages),
  password: Joi.string()
    .min(6)
    .max(16)
    .regex(passwordRegexp)
    .required()
    .messages({
      "any.required": `Missing required "password" field`,
      "string.min": `"password" should have a minimum length of "6"`,
      "string.max": `"password" length must be less than or equal to "16" characters long`,
      "string.empty": `"password" cannot be an empty field`,
      "string.pattern.base": `"password" field must contain minimum 6 characters, maximum 16, at least 1 uppercase letter, 1 lowercase letter and 1 digit`,
    }),
});

// const emailSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
// });

const userUpdateJOISchema = Joi.object({
  avatar: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .regex(emailRegexp)
    .messages(emailMessages),
  name: Joi.string().messages({
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  birthday: Joi.string().messages({
    "date.empty": `"birthday" cannot be empty`,
    "date.base": `"birthday" must be string`,
  }),
  city: Joi.string().messages({
    "string.empty": `"city" cannot be empty`,
    "string.base": `"city" must be string`,
  }),
  phone: Joi.string().regex(phoneNumberRegexp).messages({
    "string.empty": `"phone" cannot be empty`,
    "string.pattern.base": `"phone" must be string`,
  }),
});

// const addPetJOISchema = Joi.object({
//   category: Joi.string()
//     .valid("my pet", "sell", "lost-found", "for-free")
//     .required(),
//   name: Joi.string().min(2).max(16).pattern(textRegexp).required().messages({
//     "any.required": `"name" is required`,
//     "string.empty": `"name" cannot be empty`,
//     "string.base": `"name" must be string`,
//   }),
//   date: Joi.date().required().messages({
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

module.exports = {
  // emailSchema,
  userJOISchema,
  userUpdateJOISchema,
  // addPetJOISchema,
  User,
  UserUpdate,
  // Pet,
};
