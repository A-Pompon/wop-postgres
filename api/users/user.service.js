const { Score, User, Followed } = require("../../config/models");

class UserService {
  getAll() {
    return User.findAll({ attributes: { exclude: ["password"] } });
  }

  get(id) {
    return User.findByPk(id, { attributes: { exclude: ["password"] } });
  }

  getMyProfil(userId) {
    return User.findByPk(userId, { attributes: { exclude: ["password"] } });
  }

  async updateUser(userId, updateData) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
    await user.update(updateData);
    await user.reload(); // Recharger pour obtenir la version mise à jour
    return user;
  }

  async getFollowedUsers(userId) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    // Récupérer les utilisateurs suivis
    const followedUsers = await user.getFollowings({
      attributes: ["user_id", "name", "race"],
    });

    // Récupérer les scores pour chaque utilisateur suivi
    const followedUsersWithScores = await Promise.all(
      followedUsers.map(async (followedUser) => {
        const scores = await Score.findAll({
          where: { user_id: followedUser.user_id },
          attributes: ["victories", "defeats", "points"],
          raw: true,
        });
        followedUser.dataValues.Scores = scores || {
          victories: 0,
          defeats: 0,
          points: 0,
        };
        return followedUser;
      })
    );

    return followedUsersWithScores;
  }

  // async getFollowedUsers(userId) {
  //   const user = await this.getMyProfil(userId);
  //   if (!user) throw new Error("User not found");

  //   const followedUsers = await user.getFollowings({
  //     attributes: ["user_id", "name", "race"], // Sélectionnez les colonnes à retourner
  //   });

  //   return followedUsers;
  // }

  async addFriend(userId, friendId) {
    const followed = await User.findByPk(friendId);
    const follower = await User.findByPk(userId);

    if (!followed || !follower) throw new Error("User or Friend not found");

    await followed.addFollower(follower);
    return followed;
  }

  async deleteFriend(userId, friendId) {
    const followed = await User.findByPk(friendId);
    const follower = await User.findByPk(userId);

    if (!followed || !follower) throw new Error("User or Friend not found");

    await followed.removeFollower(follower);
    return followed;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
  }
}

module.exports = new UserService();
