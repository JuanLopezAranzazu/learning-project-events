import "./Events.css";
import { useState } from "react";
// components
import EventList from "./EventList";

const SearchableEventList = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="searchable-event-list">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleChange}
      />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default SearchableEventList;
