const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { authRouter } = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.set("view engine", "ejs");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);

app.use((error, req, res, next) => {
  const { status = 500, message = "server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
