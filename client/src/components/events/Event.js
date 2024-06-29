import { Link } from "react-router-dom";
import "./Events.css";
import swal from "sweetalert";
// redux
import { useDispatch, useSelector } from "react-redux";
import { removeEvent } from "../../reducers/event";
// api
import axios from "../../api/axios";

// Componente que muestra un evento
const Event = ({ event }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const deleteEvent = async (eventId) => {
    try {
      swal({
        title: "¿Estás seguro?",
        text: "Una vez cerrada la sesión, deberás iniciar sesión de nuevo",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (value) => {
        if (value) {
          const response = await axios.delete(`/event/${eventId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response?.data);
          swal("Success", "Evento eliminado", "success");
          dispatch(removeEvent(eventId));
        }
      });
    } catch (error) {
      console.error(error);
      swal("Error", "Fallo al eliminar el evento", "error");
    }
  };

  return (
    <div className="event">
      <div className="event-header">
        <Link to={`/events/edit/${event._id}`}>
          <h2>{event.name}</h2>
        </Link>
        <button
          type="button"
          className="btn-danger"
          onClick={() => deleteEvent(event._id)}
        >
          Eliminar
        </button>
      </div>
      <div className="event-body">
        <p>{event.description}</p>
        <p>Fecha {new Date(event.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Event;
