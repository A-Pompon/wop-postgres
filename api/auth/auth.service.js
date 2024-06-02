const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../config/models"); // ATTENTION PRENDRE DEPUIS config/models
const config = require("../../config/index");

class AuthService {
  async registerUser(params) {
    const { name, email, password, race, role } = params;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        race: race,
        role: role,
      });

      console.log(`Nouvel utilisateur ${user.email} enregistré`);
      user.password = undefined;
      user.role = undefined;
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid email or password."); // Pour ne pas donner d'info sur l'erreur (email ou password invalide)
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error("Invalid email or password."); // Pour ne pas donner d'info sur l'erreur (email ou password invalide)
      }
      return user.user_id; // Changement de `_id` à `user_id`
    } catch (error) {
      throw error;
    }
  }

  generateTokens(userId, userEmail) {
    const accessToken = jwt.sign({ userId, userEmail }, config.secretJwtToken, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(
      { userId, userEmail },
      config.secretJwtToken,
      {
        expiresIn: "30d",
      }
    );
    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("Null refresh token");
      }
      console.log(refreshToken);
      const user = await jwt.verify(
        refreshToken,
        config.secretJwtToken // Correction de l'utilisation de la clé secrète
      );
      const tokens = this.generateTokens(user.userId, user.userEmail);
      return tokens;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new AuthService();
