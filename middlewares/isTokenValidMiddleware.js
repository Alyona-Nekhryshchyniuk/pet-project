const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { getUserById } = require("../services/auth");

const isTokenValidMiddleware = (controller) => {
  const func = async (req, res, next) => {
    let token;
    let type;

    if (req.headers.authorization) {
      [type, token] = req.headers.authorization.split(" ");
    }

    try {
      const { _id } = jwt.decode(token, SECRET);
      const user = await getUserById(_id);
      if (!user) throw new Error();
      req.user = { user, token };
      await controller(req, res, next);
      next();
    } catch (error) {
      error.status = 401;
      error.message = "Not authorized";
      next(error);
    }
  };
  return func;
};
module.exports = isTokenValidMiddleware;
