const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { authRouter } = require("./routes/api/auth");
const { yourPetsRouter } = require("./routes/api/yourpets");
const noticeRouter = require("./routes/api/notice");
const { favoriteNoticesRouter } = require("./routes/api/favoriteNotice");
const { newsRouter } = require("./routes/api/news");
const { friendsRouter } = require("./routes/api/friends");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.set("view engine", "ejs");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/yourPets", yourPetsRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/notice/favorites", favoriteNoticesRouter);
app.use("/api/news", newsRouter);
app.use("/api/friends", friendsRouter);

app.use((error, req, res, next) => {
  const { status = 500, message = "server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
