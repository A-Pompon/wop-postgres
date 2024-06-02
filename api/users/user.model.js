const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z0-9_@&-]{3,25}$/,
          msg: "Name must be alphanumeric and between 3 to 25 characters long.",
        },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email must be a valid email address.",
        },
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be between 8 to 100 characters long.",
        },
        is: {
          args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
          msg: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        },
      },
    },
    race: {
      type: DataTypes.ENUM(
        "GUERRIER",
        "SORCIER",
        "ESPION",
        "ALCHIMISTE",
        "ENCHANTEUR"
      ),
      allowNull: false,
      validate: {
        isIn: {
          args: [["GUERRIER", "SORCIER", "ESPION", "ALCHIMISTE", "ENCHANTEUR"]],
          msg: "Race must be one of 'GUERRIER', 'SORCIER', 'ESPION', 'ALCHIMISTE', or 'ENCHANTEUR'.",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
    },
  },
  {
    hooks: {
      beforeSave: (user, options) => {
        user.email = user.email.toLowerCase();
        user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
      },
      afterCreate: async (user, options) => {
        const games = await sequelize.models.Game.findAll();
        const scores = games.map((game) => ({
          game_id: game.game_id,
          user_id: user.user_id,
          victories: 0,
          defeats: 0,
          points: 0,
        }));
        await sequelize.models.Score.bulkCreate(scores);
      },
      afterDestroy: async (user, options) => {
        await sequelize.models.Score.destroy({
          where: { user_id: user.user_id },
        });
      },
    },
  }
);

module.exports = User;
