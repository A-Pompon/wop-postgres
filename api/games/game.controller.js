const GamesService = require("./game.service");

class GamesController {
  async getGameByName(req, res, next) {
    console.log("pass controller");
    try {
      const gameName = "ShiFuMi";
      const shiFuMiGame = await GamesService.getGameByName(gameName);
      if (shiFuMiGame) {
        res.json(shiFuMiGame);
      } else {
        res.status(404).json({ message: "Le jeu ShiFuMi n'a pas été trouvé." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GamesController();
