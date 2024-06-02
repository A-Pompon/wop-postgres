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

  async getFriendsWithScores(userId) {
    const user = await this.getMyProfil(userId);
    if (!user) throw new Error("User not found");

    const friends = await user.getFolloweds({
      include: {
        model: Score,
        as: "Scores",
        attributes: ["victories", "defeats", "points"],
      },
    });

    return friends.map((friend) => ({
      id: friend.user_id,
      name: friend.name,
      race: friend.race,
      score: friend.Scores || { victories: 0, defeats: 0, points: 0 },
    }));
  }
  // PB AVEC LE user_id et followed_id qui s'inverse, revoir MODEL ???
  async addFriend(userId, friendId) {
    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);

    if (!user || !friend) throw new Error("User or Friend not found");

    await user.addFollowed(friend);
    return user;
  }

  async deleteFriend(userId, friendId) {
    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);

    if (!user || !friend) throw new Error("User or Friend not found");

    await user.removeFollowed(friend);
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
  }
}

module.exports = new UserService();
