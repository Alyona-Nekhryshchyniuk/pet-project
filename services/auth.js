const { User } = require("../helpers/schema");
const gravatar = require("gravatar");

// register
const registerUser = async ({ email, password }) => {
  const avatar = gravatar.url(email);

  const emailAlreadyInDB = await User.findOne({ email });
  if (emailAlreadyInDB) return;

  const user = await User.create({
    email,
    password,
    avatar,
  });
  return user;
};

// find By Mail
const findUserByMail = async (email) => {
  return await User.findOne({ email });
};

// getUserById
const getUserById = async (_id) => {
  return await User.findById({ _id });
};

module.exports = {
  registerUser,
  findUserByMail,
  getUserById,
};
