const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/Users");

const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await users.getUserByUsername(username);
  if (!foundUser) return res.sendStatus(401); //unauthorized

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser.id,
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser.id,
          username: foundUser.username,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await users.updateUser("refresh_token", refreshToken, username);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { loginHandler };
