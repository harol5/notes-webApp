const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const confirmAccountHandler = async (req, res) => {
  const token = req.query.code;

  let username;
  jwt.verify(token, process.env.CONFIRM_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token.

    console.log(decoded.UserInfo.username);
    username = decoded.UserInfo.username;
  });

  const user = await Users.getUserByUsername(username);
  if (!user) return res.status(409).json({ message: "not valid" }); //conflit with token
  console.log(user);

  await Users.updateUser(username, "active", true);
  await Users.deleteVerificationToken(username);

  return res.redirect(
    301,
    `${process.env.ORIGIN_URL}/account-verified/${username}`
  );
};

module.exports = { confirmAccountHandler };
