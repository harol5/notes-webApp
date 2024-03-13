const Users = require("../models/Users");
const Transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const forgotPwdHandler = async (req, res) => {
  const email = req.body.email;
  const user = await Users.getUserByEmail(email);

  if (user) {
    const resetPwdToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
        },
      },
      process.env.RESET_PWD_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    await Transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Request: change password - Notes",
      text: `Please click on the following link to change your password:\n 
            ${process.env.ORIGIN_URL}/reset-pwd?code=${resetPwdToken}`,
    });
  }

  return res.status(201).json({
    success: `If an account is associated with ${email}, you should have received an email to set a new password`,
  });
};

const resetPwdHandler = async (req, res) => {
  const { password, token } = req.body;

  let username;
  jwt.verify(token, process.env.RESET_PWD_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token.
    username = decoded.UserInfo.username;
  });

  //this makes sure the username exits on database.
  const user = await Users.getUserByUsername(username);
  if (!user) return res.status(409).json({ message: "not valid" }); //conflit with token

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    await Users.updateUser(username, "password", hashedPwd);
    res.status(201).json({ success: "Password updated!!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { forgotPwdHandler, resetPwdHandler };
