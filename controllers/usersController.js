const Users = require("../models/Users");
const bcrypt = require("bcrypt");

const changeUserEmail = async (req, res) => {
  const username = req.user;
  const newEmail = req.body.email;

  try {
    await Users.updateUser(username, "email", newEmail);
    res.status(201).json({ message: "Email has been updated!!" });
  } catch (err) {
    res.sendStatus(409);
  }
};

const changePassword = async (req, res) => {
  const username = req.user;
  const { password } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    await Users.updateUser(username, "password", hashedPwd);
    res.status(201).json({ message: "Password has been updated!!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAccount = async (req, res) => {
  const username = req.user;
  await Users.deleteUser(username);

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = { changeUserEmail, changePassword, deleteAccount };
