// import express from "express";
// import { getNewsController } from "../../controllers/newsController";

const { getNewsController }=require("../../controllers/newsController");

const express = require("express");

const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");

const router =  express.Router();

router.get("/", tryCatchMiddleware(getNewsController));

module.exports = { newsRouter: router };