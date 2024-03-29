const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) res.sendStatus(401);

  //removing "Bearer" from token.
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token.

    //if not error, this middleware adds properties to the req object -
    //so the next middleware can use it.
    req.userId = decoded.UserInfo.userId;
    req.user = decoded.UserInfo.username;
    next();
  });
};

module.exports = verifyJWT;
