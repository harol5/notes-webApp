const jwt = require("jsonwebtoken");
const users = require("../models/Users");

/*TODO:
this handler will check the token on the query parameter and see if it matches
with the one saved on database
any other verification?
*/
const confirmAccountHandler = async (req, res) => {
  const queryStr = req.query;
  console.log(queryStr);

  return res.send("endpoint is working");
};

module.exports = { confirmAccountHandler };
