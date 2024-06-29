const express = require("express");
const eventRouter = express.Router();

//controllers
const {
  findAllEvents,
  findAllEventsByUser,
  findOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const verifyRoles = require("../middlewares/verifyRoles");
const verifyID = require("../middlewares/verifyID");

// routes
eventRouter.get("/", verifyJWT, verifyRoles("admin"), findAllEvents);
eventRouter.get(
  "/user",
  verifyJWT,
  verifyRoles("admin", "user"),
  findAllEventsByUser
);
eventRouter.get(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  verifyID,
  findOneEvent
);
eventRouter.post("/", verifyJWT, verifyRoles("admin", "user"), createEvent);
eventRouter.put(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  verifyID,
  updateEvent
);
eventRouter.delete(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  verifyID,
  deleteEvent
);

module.exports = eventRouter;
