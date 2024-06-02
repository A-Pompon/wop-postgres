const express = require("express");
const router = express.Router();
const gamesController = require("./game.controller");

router.get("/ShiFuMi", gamesController.getGameByName);

module.exports = router;
