const express = require("express");
const userRouter = express.Router();

//controllers
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");
const verifyID = require("../middlewares/verifyID");

// routes
// api para obtener todos los usuarios
userRouter.get("/", verifyJWT, verifyRoles("admin"), findAllUsers);
// api para obtener un usuario por id
userRouter.get("/:id", verifyJWT, verifyRoles("admin"), verifyID, findOneUser);
// api para crear un usuario
userRouter.post("/", verifyJWT, verifyRoles("admin"), createUser);
// api para actualizar un usuario
userRouter.put("/:id", verifyJWT, verifyRoles("admin"), verifyID, updateUser);
// api para eliminar un usuario
userRouter.delete(
  "/:id",
  verifyJWT,
  verifyRoles("admin"),
  verifyID,
  deleteUser
);

module.exports = userRouter;
