const jwt = require("jsonwebtoken");
const users = require("../models/Users");

const refreshTokenHandler = async (req, res) => {
  //check is cookie is on req.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content.

  // Is refreshToken in DB?
  const refreshToken = cookies.jwt;
  const foundUser = await users.getUserByRefreshToken(refreshToken);

  if (!foundUser) return res.sendStatus(403); //forbidden.

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.UserInfo.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: decoded.UserInfo.userId,
          username: decoded.UserInfo.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3600s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { refreshTokenHandler };
