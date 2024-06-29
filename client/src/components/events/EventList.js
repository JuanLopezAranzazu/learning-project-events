import "./Events.css";
// components
import Event from "./Event";

// Componente que muestra una lista de eventos
const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
