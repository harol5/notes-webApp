const bcrypt = require("bcrypt");
const users = require("../models/Users");
const transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");

const registerHandler = async (req, res) => {
  //front-end code MUST validate inputs before sending request to this endpoint.
  const newUser = req.body;
  const isUsernameTaken = await users.getUserByUsername(newUser.username);
  const isEmailTaken = await users.getUserByEmail(newUser.email);

  if (isUsernameTaken)
    return res.status(409).json({ message: "username not available" });

  if (isEmailTaken)
    return res.status(409).json({
      message: `there is an account associated with ${newUser.email}`,
    });

  try {
    const hashedPwd = await bcrypt.hash(newUser.password, 10);
    const date_created = new Date().toISOString().split("T")[0];
    const confirmToken = jwt.sign(
      {
        UserInfo: {
          email: newUser.email,
          username: newUser.username,
        },
      },
      process.env.CONFIRM_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const newUserWithHashedPwd = {
      ...newUser,
      password: hashedPwd,
      date: date_created,
      active: false,
    };
    await users.insertNewUser(newUserWithHashedPwd);
    await users.insertVerificationToken(newUser.username, confirmToken);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: newUser.email,
      subject: "Confirm Account - Notes",
      text: `welcome to NOTES, click the following link to confirm you account\n 
            ${process.env.ORIGIN_URL}/verify-account?code=${confirmToken}`,
    });

    res.status(201).json({
      success: `New user ${newUser.username} created!`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerHandler };
