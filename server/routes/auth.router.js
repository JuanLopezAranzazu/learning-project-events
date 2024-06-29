const express = require("express");
const authRouter = express.Router();

//controllers
const {
  registerUser,
  userLogin,
  whoAmI,
} = require("../controllers/auth.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const validateInputs = require("./../middlewares/validation");
// validations
const {
  loginValidation,
  registerValidation,
} = require("./../validations/auth");

// routes
// api para registrar un usuario
authRouter.post("/register", registerValidation, validateInputs, registerUser);
// api para iniciar sesión
authRouter.post("/login", loginValidation, validateInputs, userLogin);
// api para obtener la información del usuario autenticado
authRouter.get("/whoami", verifyJWT, whoAmI);

module.exports = authRouter;
