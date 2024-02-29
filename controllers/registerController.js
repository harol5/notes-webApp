const bcrypt = require("bcrypt");
const users = require("../models/Users");
const transporter = require("../config/mailer");

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
      active: false,
    };
    await users.insertNewUser(newUserWithHashedPwd);

    //TODO: send email with confirmation link
    // const info = await transporter.sendMail({
    //   from: "hrcode95@gamil.com", // sender address
    //   to: "herp05@hotmail.es", // list of receivers
    //   subject: "Hello", // Subject line
    //   text: "Hello world?", // plain text body
    // });

    console.log("Message sent: %s", info);

    res.status(201).json({ success: `New user ${newUser.username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerHandler };
