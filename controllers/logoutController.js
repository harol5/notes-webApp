const users = require("../models/Users");

const logoutHandler = async (req, res) => {
  // !!On front-end code, also delete the accessToken!!.
  //check is cookie is on req.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content.

  // Is refreshToken in DB?
  const refreshToken = cookies.jwt;
  const foundUser = await users.getUserByRefreshToken(refreshToken);
  console.log(foundUser);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  await users.updateUser("refresh_token", "", foundUser.username);
  // add in production flag "secure:true". only will serve in https
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = { logoutHandler };
