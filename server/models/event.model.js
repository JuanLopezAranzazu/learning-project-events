const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    date: {
      type: Date,
      required: [true, "La fecha es requerida"],
    },
    // Relación con el modelo de users
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "El usuario es requerido"],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
