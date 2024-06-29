const express = require("express");

//routes
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const eventRouter = require("./event.router");

function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/event", eventRouter);
}

module.exports = routes;
