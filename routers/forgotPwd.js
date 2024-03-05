const express = require("express");
const router = express.Router();
const forgotPwdController = require("../controllers/forgotPwdController");

router.post("/", forgotPwdController.forgotPwdHandler);
router.post("/reset", forgotPwdController.resetPwdHandler);

module.exports = router;
