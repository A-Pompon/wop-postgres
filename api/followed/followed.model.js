const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("../users/user.model");

const Followed = sequelize.define(
  "Followed",
  {
    follower_id: {
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

// Définition des associations belongsToMany
User.belongsToMany(User, {
  through: Followed,
  as: "Followers",
  foreignKey: "followed_id",
  otherKey: "follower_id",
});

User.belongsToMany(User, {
  through: Followed,
  as: "Followings",
  foreignKey: "follower_id",
  otherKey: "followed_id",
});

module.exports = Followed;

// const Followed = sequelize.define(
//   "Followed",
//   {
//     follower_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "user_id",
//       },
//       onDelete: "CASCADE",
//     },
//     followed_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "user_id",
//       },
//       onDelete: "CASCADE",
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// Définition des associations belongsToMany
// User.belongsToMany(User, {
//   through: Followed,
//   as: "Followers",
//   foreignKey: "followed_id",
//   otherKey: "follower_id",
// });

// User.belongsToMany(User, {
//   through: Followed,
//   as: "Followings",
//   foreignKey: "follower_id",
//   otherKey: "followed_id",
// });

// module.exports = Followed;
