const Joi = require("joi");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// USER MONGOOSE SCHEMA
const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },

  avatarURL: String,
  token: String,
});

// document middleware with password hashing
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("user", userSchema);

// // =======================================================================================
// // JOI SCHEMAS

const userJOISchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `Missing required "email" field`,
      "string.empty": `"email" cannot be an empty field`,
      "string.email": `"email" must be a valid email`,
    }),
  password: Joi.string().alphanum().min(4).max(15).required().messages({
    "any.required": `Missing required "password" field`,
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of "4"`,
    "string.max": `"password" length must be less than or equal to "15" characters long`,
  }),
});

module.exports = {
  userJOISchema,
  User,
};
