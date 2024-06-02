const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Game = sequelize.define("Game", {
  game_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameGame: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Game;
