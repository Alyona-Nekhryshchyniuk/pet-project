import express from "express";
import { getNewsController } from "../../controllers/newsController";

const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");

const router = new express.Router();

router.get("/", tryCatchMiddleware(getNewsController));

module.exports = { newsRouter: router };