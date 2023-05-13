const { User, UserUpdate } = require("../helpers/schema");
const gravatar = require("gravatar");

// register
const registerUser = async ({ email, password }) => {
  const avatar = gravatar.url(email);

  const emailAlreadyInDB = await UserUpdate.findOne({ email });
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
  return await UserUpdate.findOne({ email });
};

// getUserById
const getUserById = async (_id) => {
  return await UserUpdate.findById({ _id });
};

// updateUser
const updateUser = async (userId, objWithUpdatedUserData) => {
  return await UserUpdate.findOneAndUpdate(
    { _id: userId },
    { ...objWithUpdatedUserData },
    { new: true }
  );
};

module.exports = {
  registerUser,
  findUserByMail,
  getUserById,
  updateUser,
};
