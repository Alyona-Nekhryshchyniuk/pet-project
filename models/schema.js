const Joi = require("joi");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// USER MONGOOSE SCHEMA
const emailRegexp = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
const passwordRegexp = /(?=.*\d)\w{3,20}$/;
const phoneNumberRegexp = /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/;
const birthdayRegexp =
  /^(0[1-9]|[12][0-9]|3[01])\.[0-1][0-9]\.(20[0-1][0-9]|19[0-9][0-9])$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      maxLength: 16,
      match: passwordRegexp,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: [emailRegexp, "Please fill a valid email"],
    },
    name: {
      type: String,
    },
    birthday: {
      type: String,
      match: [birthdayRegexp, "Please fill a valid birthday"],
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
      match: [phoneNumberRegexp, "Please fill a valid phone number"],
    },

    avatar: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    favoriteNotices: 
      {
        type: Array,
        default: [],
      },
},
  { versionKey: false, timestamps: true }
);

// document middleware with password hashing
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});


const User = model("user", userSchema);

// // =======================================================================================
// // JOI SCHEMAS

const emailMessages = {
  "any.required": `Missing required "email" field`,
  "string.empty": `"email" cannot be an empty field`,
  "string.email": `"email" must be a valid email`,
};

const userJOISchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .pattern(emailRegexp)
    .messages(emailMessages),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "any.required": `Missing required "password" field`,
      "string.min": `"password" should have a minimum length of "6"`,
      "string.max": `"password" length must be less than or equal to "16" characters long`,
      "string.empty": `"password" cannot be an empty field`,
      "string.pattern.base": `"password" field must contain minimum 6 characters, maximum 16, at least 1 uppercase letter, 1 lowercase letter and 1 digit with no symbols`,
    }),
});

const userUpdateJOISchema = Joi.object({
  avatar: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(emailRegexp)
    .messages(emailMessages),
  name: Joi.string().messages({
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  birthday: Joi.string().pattern(birthdayRegexp).messages({
    "date.empty": `"birthday" cannot be empty`,
  }),
  city: Joi.string().messages({
    "string.empty": `"city" cannot be empty`,
    "string.base": `"city" must be string`,
  }),
  phone: Joi.string().pattern(phoneNumberRegexp).messages({
    "string.empty": `"phone" cannot be empty`,
    "string.pattern.base": `"phone" has not enough numbers or includes forbidden symbols `,
  }),
});

module.exports = {
  userJOISchema,
  userUpdateJOISchema,
  User,

};

