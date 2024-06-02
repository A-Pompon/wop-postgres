const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
