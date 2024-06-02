const NotFoundError = require("../../errors/not-found");
const ValidationError = require("sequelize").ValidationError; // Importez ValidationError de Sequelize
const usersService = require("./user.service");

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await usersService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await usersService.get(id);
      if (!user) {
        throw new NotFoundError();
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getMyProfil(req, res, next) {
    try {
      console.log("req.userId", req.userId);
      const userId = req.userId;
      const me = await usersService.getMyProfil(userId);
      console.log("me", me);
      res.status(200).json(me);
    } catch (error) {
      next(error);
    }
  }

  async getFriendsWithScores(req, res, next) {
    try {
      const userId = req.userId;
      const friendsWithScores = await usersService.getFriendsWithScores(userId);
      res.json(friendsWithScores);
    } catch (error) {
      next(error);
    }
  }

  async updateRace(req, res, next) {
    try {
      const userId = req.userId;
      console.log("userId", userId);
      const race = req.body.race;
      console.log("race", race);
      const userModified = await usersService.updateUser(userId, {
        race: race,
      });
      // userModified.password = undefined;
      console.log("userModified", userModified);
      res.json(userModified);
    } catch (err) {
      if (err instanceof ValidationError) {
        // Si l'erreur est une erreur de validation Sequelize
        return res.status(400).json({
          error: err.errors.map((e) => e.message),
        });
      }
      // Si ce n'est pas une erreur de validation Sequelize, passez à l'erreur suivante
      next(err);
    }
  }

  async updateName(req, res, next) {
    try {
      const userId = req.userId;
      console.log("userId", userId);
      const name = req.body.name;
      console.log("race", name);
      const userModified = await usersService.updateUser(userId, {
        name: name,
      });
      // userModified.password = undefined;
      console.log("userModified", userModified);
      res.json(userModified);
    } catch (err) {
      if (err instanceof ValidationError) {
        // Si l'erreur est une erreur de validation Sequelize
        return res.status(400).json({
          error: err.errors.map((e) => e.message),
        });
      }
      // Si ce n'est pas une erreur de validation Sequelize, passez à l'erreur suivante
      next(err);
    }
  }

  async addFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      const userId = req.userId;
      const user = await usersService.addFriend(userId, friendId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteFriend(req, res, next) {
    try {
      const { friendId } = req.body;
      const userId = req.userId;
      const user = await usersService.deleteFriend(userId, friendId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.userId;
      await usersService.deleteUser(id);
      // req.io.emit("user:delete", { id });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
