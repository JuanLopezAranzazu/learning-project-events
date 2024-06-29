const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// models
const User = require("../models/user.model");
const Role = require("../models/role.model");

const registerUser = async (req, res) => {
  try {
    const { body } = req;
    const { email, password, ...rest } = body;
    // validar que el email no exista
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: `El correo ${email} ya existe` });
    }
    // encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);
    // buscar el rol user
    const foundRole = await Role.findOne({ name: "user" });
    if (!foundRole) {
      return res.status(400).json({ message: "El rol user no existe" });
    }

    // guardar el usuario en la base de datos
    const newUser = new User({
      ...rest,
      email,
      password: hash,
      role: foundRole._id,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    // buscar el usuario en la base de datos
    const foundUser = await User.findOne({ email }).populate("role");
    if (!foundUser) {
      return res.status(401).json({ error: "Error al autenticarse" });
    }
    // comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Error al autenticarse" });
    }
    const role = foundUser.role.name;
    const user = { userId: foundUser._id, roles: [role] };
    // generar token
    const token = jwt.sign(user, config.secretKey, {
      expiresIn: config.jwtExpirationTime,
    });
    res.status(200).json({ token, user: foundUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const whoAmI = async (req, res) => {
  try {
    const { userId } = req; // user authenticated
    const user = await User.findById(userId).populate("role");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, userLogin, whoAmI };
