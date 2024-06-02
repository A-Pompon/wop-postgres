const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("../users/user.model");

const Followed = sequelize.define(
  "Followed",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    followed_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(User, {
  through: Followed,
  as: "Followers",
  foreignKey: "user_id",
  otherKey: "followed_id",
});
User.belongsToMany(User, {
  through: Followed,
  as: "Followeds",
  foreignKey: "followed_id",
  otherKey: "user_id",
});

module.exports = Followed;
