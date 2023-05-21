const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

const BaseJoi = require("joi");
const JoiDate = require("@joi/date");

const Joi = BaseJoi.extend(JoiDate);

const { Schema, model } = mongoose;

const petSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   minLength: 2,
    //   maxLength: 16,
    //   match: [
    //     /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
    //     "Only letters can be accepted",
    //   ],
    //   required: [true, "Name is required"],
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // birthDate: {
    //   type: String,
    //   required: [true, "Birth date is required"],
    // },
    // breed: {
    //   type: String,
    //   minLength: 2,
    //   maxLength: 16,
    //   required: [true, "Breed is required"],
    // },
    // comments: {
    //   type: String,
    //   minLength: 8,
    //   maxLength: 120,
    //   default: null,
    // },
    photoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const Pet = model("Pet", petSchema);

const petJOISchema = Joi.object({
  // name: Joi.string()
  //   .min(2)
  //   .max(16)
  //   .regex(
  //     /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  //     "Only letters can be accepted"
  //   )
  //   .required(),
  // birthDate: Joi.date().less(Date.now()).format("DD.MM.YYYY").required(),
  // breed: Joi.string()
  //   .min(2)
  //   .max(16)
  //   .regex(
  //     /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
  //     "Only letters can be accepted"
  //   )
  //   .required(),
  // comments: Joi.string().min(8).max(120),
  // imageFile: Joi
  petsAvatar: Joi.object().required(),
  //   {
  //   originalname: Joi.string().required(),
  //   fieldname: Joi.string(),
  //   encoding: Joi.string(),
  //   mimetype: Joi.string(),
  //   path: Joi.string().required(),
  //   size: Joi.number(),
  //   filename: Joi.string(),
  // }
});

module.exports = { Pet, petJOISchema };
