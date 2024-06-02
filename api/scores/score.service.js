const { Score, User } = require("../../config/models");

class ScoreService {
  async getAllScores() {
    return Score.findAll({
      order: [["points", "DESC"]],
      include: [{ model: User, attributes: ["name", "race"] }],
    });
  }

  async getMyScoreById(userId) {
    return Score.findOne({
      where: { user_id: userId },
      include: [{ model: User, attributes: ["name", "race"] }],
    });
  }

  async getScoreById(userId) {
    return Score.findOne({
      where: { user_id: userId },
      include: [{ model: User, attributes: ["name", "race"] }],
    });
  }

  async getUserScore(userId) {
    const user = await User.findByPk(userId, {
      attributes: ["name", "race"],
      include: [{ model: Score }],
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new Error("User not found");
    }

    // Vérifier si le score existe
    if (!user.Scores || user.Scores.length === 0) {
      throw new Error("Score not found for the user");
    }

    // Ajouter le nom et la race de l'utilisateur au score
    const userScore = {
      name: user.name,
      race: user.race,
      victories: user.Scores[0].victories,
      defeats: user.Scores[0].defeats,
      points: user.Scores[0].points,
    };
    console.log("userScore", userScore);
    return userScore;
  }

  async updateScore(userId, gameId, updateData) {
    console.log("SERVICE");
    const score = await Score.findOne({
      where: { user_id: userId, game_id: gameId },
    });

    if (!score) {
      throw new Error("Score not found");
    }

    // Utilisation de increment pour mettre à jour les valeurs
    await score.increment(updateData);

    // Recharger le score mis à jour
    await score.reload();

    return score;
  }

  async updateScoreStatic(userId, gameId, points) {
    const score = await Score.findOne({
      where: { user_id: userId, game_id: gameId },
    });

    if (!score) {
      throw new Error("Score not found");
    }

    await score.increment({ points: points });

    await score.reload();

    return score;
  }
}

module.exports = new ScoreService();
