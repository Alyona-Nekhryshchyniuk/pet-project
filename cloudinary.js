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
});

const storageSecond = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "notice",
  allowedFormats: ["jpg", "png"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });
const uploadCloudSecond = multer({ storage: storageSecond });

module.exports = { uploadCloud, cloudinary, uploadCloudSecond };
