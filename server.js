const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
const cors = require("cors");
const NotFoundError = require("./errors/not-found");
const auhRouter = require("./api/auth/auth.router");
const userRouter = require("./api/users/user.router");
const scoresRouter = require("./api/scores/score.router");
const gamesRouter = require("./api/games/game.router");
const authMiddleware = require("./middlewares/authenticate");
// const forestAdmin = require("./forest");
const app = express();
const sequelize = require("./config/db");

// const server = http.createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   /*socket.on("my_event", (data) => {
//     console.log(data);
//   });
//   io.emit("event_from_server", { test: "foo" });*/
// });

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// forestAdmin(app);
app.use(cors());
app.use(express.json());

app.use("/api/auth", auhRouter);
app.use("/api/users", authMiddleware, userRouter);
app.use("/api/scores", authMiddleware, scoresRouter);
app.use("/api/games", authMiddleware, gamesRouter);

app.use("/", express.static("public"));

app.use((error, req, res, next) => {
  next(new NotFoundError());
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status);
  res.json({
    status,
    message,
  });
});

const printDbOk = "Connection has been established successfully.";

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log(printDbOk);
    res.status(200).send(printDbOk);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = {
  app,
  // serve, // POUR WEBSOCKETS
};
