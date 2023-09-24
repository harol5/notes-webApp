const bcrypt = require("bcrypt");
const users = require("../models/Users");

const registerHandler = async (req, res) => {
  //front-end code MUST DO validation of inputs before sending request to this endpoint.
  const newUser = req.body;
  const isUsernameAvailable = await users.getUserByUsername(newUser.username);
  if (isUsernameAvailable)
    return res.status(409).json({ message: "username not available" });

  try {
    const hashedPwd = await bcrypt.hash(newUser.password, 10);
    const date_created = new Date().toISOString().split("T")[0];
    const newUserWithHashedPwd = {
      ...newUser,
      password: hashedPwd,
      date: date_created,
    };
    await users.insertNewUser(newUserWithHashedPwd);
    res.status(201).json({ success: `New user ${newUser.username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerHandler };
