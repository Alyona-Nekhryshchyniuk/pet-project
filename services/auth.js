const { User } = require("../models/schema");
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

// login
const loginUser = async (email) => {
  return await User.findOne({ email });
};

// getUserById
const getUserById = async (_id) => {
  return await User.findById({ _id });
};

// updateUser
const updateUser = async (id, objWithUpdatedUserData) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { ...objWithUpdatedUserData },
    { new: true }
  );
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUserById,
};
