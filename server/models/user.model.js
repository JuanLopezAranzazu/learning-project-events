const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    lastName: {
      type: String,
      required: [true, "El apellido es requerido"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El correo es requerido"],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: function () {
          return "El correo no es válido";
        },
      },
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: 6,
      maxlength: 128,
    },
    // Relación con el modelo de roles
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
  },
  { timestamps: true }
);

// Eliminar la propiedad password de los objetos que se devuelven
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
