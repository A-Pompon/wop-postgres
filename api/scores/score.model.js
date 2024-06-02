const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("../users/user.model");
const Game = require("../games/game.model");

const Score = sequelize.define("Score", {
  score_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  victories: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  defeats: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  game_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Game,
      key: "game_id",
    },
    onDelete: "CASCADE",
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE",
  },
});

User.hasMany(Score, { foreignKey: "user_id" });
Game.hasMany(Score, { foreignKey: "game_id" });
Score.belongsTo(User, { foreignKey: "user_id" });
Score.belongsTo(Game, { foreignKey: "game_id" });

module.exports = Score;
