const { Game } = require("../../config/models");

class GamesService {
  async getGameByName(nameGame) {
    return Game.findOne({ where: { nameGame } });
  }
}

module.exports = new GamesService();
