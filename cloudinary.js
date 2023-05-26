const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatar",
  format: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  params: {
    transformation: [{ quality: "75" }],
  },
});

const storageSecond = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "notice",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  params: {
    transformation: [{ quality: "75" }],
  },
});

const storageThird = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "petsAvatar",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  params: {
    transformation: [{ quality: "75" }],
  },
});

const uploadCloud = multer({ storage });
const uploadCloudSecond = multer({ storage: storageSecond });
const uploadCloudThird = multer({ storage: storageThird });

module.exports = {
  uploadCloud,
  cloudinary,
  uploadCloudSecond,
  uploadCloudThird,
};
