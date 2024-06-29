const { body } = require("express-validator");

const registerValidation = [
  body("email").isEmail().withMessage("Ingrese un email válido"),
  body("password")
    .isLength({ min: 6, max: 128 })
    .withMessage("La contraseña debe tener al menos 6 caracteres y máximo 128"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Ingrese un email válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
