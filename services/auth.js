const { User } = require("../helpers/schema");
const gravatar = require("gravatar");

// register
const registerUser = async ({ email, password }) => {
  const avatarURL = gravatar.url(email);

  const emailAlreadyInDB = await User.findOne({ email });
  if (emailAlreadyInDB) return;

  const user = await User.create({
    email,
    password,
    avatarURL,
  });
  return user;
};

// find By Mail
const findUserByMail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  registerUser,
  findUserByMail,
};
