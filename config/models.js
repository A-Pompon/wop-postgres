const sequelize = require("./db");
const User = require("../api/users/user.model");
const Game = require("../api/games/game.model");
const Score = require("../api/scores/score.model");
const Followed = require("../api/followed/followed.model");

async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the database:", error);
    process.exit(1); // Arrête l'application si la synchronisation échoue
  }
}

module.exports = {
  User,
  Game,
  Score,
  Followed,
  initializeDatabase,
};
