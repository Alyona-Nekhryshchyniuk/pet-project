const Joi = require("joi");
const { Schema, model } = require("mongoose");

// USER MONGOOSE SCHEMA
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
const textRegexp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{2,16}$/;
const phoneNumberRegexp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};

const userSchema = new Schema(
  {
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
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: String,
      required: true,
      match: [phoneNumberRegexp, "Please fill a valid phone number"],
    },

    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      // required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// // =======================================================================================
// // JOI SCHEMAS
const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const userJOISchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(emailRegexp)
    .required()
    .messages({
      "any.required": `Missing required "email" field`,
      "string.empty": `"email" cannot be an empty field`,
      "string.email": `"email" must be a valid email`,
    }),
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  birthday: Joi.date().required().messages({
    "any.required": `"birthday" is required`,
    "date.empty": `"birthday" cannot be empty`,
    "date.base": `"birthday" must be date`,
  }),
  city: Joi.string().required().messages({
    "any.required": `"city" is required`,
    "string.empty": `"city" cannot be empty`,
    "string.base": `"city" must be string`,
  }),
  mobilePhone: Joi.string().pattern(phoneNumberRegexp).required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`,
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
  userJOISchema,
  User,
};
