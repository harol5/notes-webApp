const jwt = require("jsonwebtoken");
const users = require("../models/Users");

const refreshTokenHandler = async (req, res) => {
  //check is cookie is on req.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content.

  // Is refreshToken in DB?
  const refreshToken = cookies.jwt;
  const foundUser = await users.getUserByRefreshToken(refreshToken);
  console.log(foundUser);

  if (!foundUser) return res.sendStatus(403); //forbidden.

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30S" }
    );
    res.json({ accessToken });
  });
};

module.exports = { refreshTokenHandler };
