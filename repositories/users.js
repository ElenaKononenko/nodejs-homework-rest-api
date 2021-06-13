const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (body) => {
  const user = new User(body);
  console.log(user, "user");
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSub = async (id, sub) => {
  return await User.updateOne({ _id: id }, { subscription: sub.subscription });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};
const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verifyToken: verificationToken });
};
const updateVerifyToken = async (id, verify, verificationToken) => {
  return await User.updateOne(
    { _id: id },
    { verify, verifyToken: verificationToken }
  );
};
module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSub,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
