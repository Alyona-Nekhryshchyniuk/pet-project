import express from "express";
import { getFriensController } from "../../controllers/friendsController";

const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");

const router = new express.Router();

router.get("/", tryCatchMiddleware(getFriensController));

module.exports = { friendsRouter: router };