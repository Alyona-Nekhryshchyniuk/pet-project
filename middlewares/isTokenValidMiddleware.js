const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { getUserById } = require("../services/auth");

const isTokenValidMiddleware = (controller) => {
  const func = async (req, res, next) => {
    const [type, token] = req.headers.authorization.split(" ");
    try {
      const { _id } = jwt.decode(token, SECRET);
      const user = await getUserById(_id);
      req.user = { ...user, token };
      console.log(req.user);
      if (!user) throw new Error();
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
