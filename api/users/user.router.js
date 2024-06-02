const express = require("express");
const usersController = require("./user.controller");
const router = express.Router();

router.get("/", usersController.getAll);

// router.get("/:id", usersController.getById); // BLOQUE LES REQUETES DU BAS

router.get("/profil", usersController.getMyProfil);

router.patch("/race", usersController.updateRace);
router.patch("/name", usersController.updateName);

router.get("/followed/scores", usersController.getFollowedsWithScores);

router.patch("/add/followed", usersController.addFollowed);
router.patch("/delete/followed", usersController.deleteFollowed);

router.delete("/delete/me", usersController.deleteUser); // POUR ADMIN UNIQUEMENT

module.exports = router;
