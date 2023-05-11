const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const tryCatchMiddleware = require("./middlewares/tryCatchMiddleware");
const isTokenValidMiddleware = require("./middlewares/isTokenValidMiddleware");

const { petsRouter } = require("./routes/api/pets");
const { authRouter } = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
// app.set("view engine", "ejs");

// app.use("/api/pets", petsRouter);
app.use("/api/auth", authRouter);
// app.use("/", authRouter);
// app.use("/", express.static("public"));

app.use((error, req, res, next) => {
  const { status = 500, message = "server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
