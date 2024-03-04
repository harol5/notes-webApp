const express = require("express");
const router = express.Router();
const forgotPwdController = require("../controllers/forgotPwdController");

router.post("/", forgotPwdController.forgotPwdHandler);

module.exports = router;
