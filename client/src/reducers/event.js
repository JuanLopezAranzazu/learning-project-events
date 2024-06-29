import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      console.log(action.payload);
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    },
    updateEvent: (state, action) => {
      console.log(action.payload);
      const { id, updatedEvent } = action.payload;
      const eventIndex = state.events.findIndex((event) => event._id === id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = {
          ...state.events[eventIndex],
          updatedEvent,
        };
      }
    },
  },
});

export const { setEvents, addEvent, removeEvent, updateEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
