const Users = require("../models/Users");
const Transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");

const forgotPwdHandler = async (req, res) => {
  const email = req.body.email;
  const user = await Users.getUserByEmail(email);
  console.log(user);

  //TODO: create an page with a form in front end that will ask for the new password.
  //the url of this form will be the link included on this email.
  if (user) {
    const resetPwdToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
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
                http://localhost:3000/reset-pwd?code=${resetPwdToken}`,
    });
  }

  return res.status(201).json({
    success: `If an account is associated with ${email}, you should have received an email to set a new password`,
  });
};

module.exports = { forgotPwdHandler };
