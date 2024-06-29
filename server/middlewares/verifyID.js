const mongoose = require("mongoose");

// Middleware para validar el ID de un objeto
const validarObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "ID no válido",
    });
  }
  next();
};

module.exports = validarObjectId;
