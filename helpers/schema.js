// const Joi = require("joi");
// const { Schema, model } = require("mongoose");

// // MONGOOSE SCHEMA

// const monGooseSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, "Set name for contact"],
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });

// const contact = model("contact", monGooseSchema);

// // JOI SCHEMA

// const schema = Joi.object(
//   {
//     name: Joi.string().min(3).max(15).required().messages({
//       "any.required": `Missing required "name" field`,
//       "string.empty": `"name" cannot be an empty field`,
//       "string.min": `"name" should have a minimum length of "3"`,
//       "string.max": `"name" length must be less than or equal to "15" characters long`,
//     }),
//     email: Joi.string()
//       .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//       .required()
//       .messages({
//         "any.required": `Missing required "email" field`,
//         "string.empty": `"email" cannot be an empty field`,
//         "string.email": `"email" must be a valid email`,
//       }),
//     phone: Joi.string().min(4).max(15).required().messages({
//       "any.required": `Missing required "phone" field`,
//       "string.empty": `"phone" cannot be an empty field`,
//       "string.min": `"phone" should have a minimum length of "4"`,
//       "string.max": `"phone" length must be less than or equal to "15" characters long`,
//     }),
//   },
//   { versionKey: false }
// );

// const favoriteFieldSchema = Joi.object({
//   favorite: Joi.boolean().required().messages({
//     "any.required": `Missing field "favorite"`,
//   }),
// });
// module.exports = { schema, favoriteFieldSchema, contact };
