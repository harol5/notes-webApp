const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router.post("/update-email", usersController.changeUserEmail);
router.post("/update-password", usersController.changePassword);
router.delete("/delete-account", usersController.deleteAccount);

module.exports = router;
