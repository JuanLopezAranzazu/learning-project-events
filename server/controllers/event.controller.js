// models
const Event = require("../models/event.model");

const findAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate("user");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findAllEventsByUser = async (req, res) => {
  try {
    const { userId } = req;
    const events = await Event.find({ user: userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOneEvent = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundEvent = await Event.findById(id);
    if (!foundEvent) {
      return res
        .status(404)
        .json({ message: `El evento con id ${id} no se encuentra` });
    }
    res.status(200).json(foundEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { userId, body } = req;
    const newEvent = new Event({
      ...body,
      user: userId,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateEvent = async (req, res) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const foundEvent = await Event.findById(id);
    if (!foundEvent) {
      return res
        .status(404)
        .json({ message: `El evento con id ${id} no se encuentra` });
    }
    const eventUpdated = await Event.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(eventUpdated);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;
    const foundEvent = await Event.findById(id);
    if (!foundEvent) {
      res
        .status(404)
        .json({ message: `El evento con id ${id} no se encuentra` });
      return;
    }
    await Event.deleteOne({ _id: id });
    res.status(204).json({ message: "Evento eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findAllEvents,
  findAllEventsByUser,
  findOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
