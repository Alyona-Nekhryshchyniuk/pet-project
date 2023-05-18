const express =require( "express");
const { getFriensController } =require( "../../controllers/friendsController");

const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");

const router = new express.Router();

router.get("/", tryCatchMiddleware(getFriensController));

module.exports = { friendsRouter: router };