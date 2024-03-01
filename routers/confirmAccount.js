const express = require("express");
const router = express.Router();
const confirmAccountController = require("../controllers/confirmAccountController");

router.get("/", confirmAccountController.confirmAccountHandler);

module.exports = router;
