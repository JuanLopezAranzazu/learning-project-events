import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../reducers/event";
// api
import axios from "../../api/axios";
// components
import SearchableEventList from "../../components/events/SearchableEventList";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const events = useSelector((state) => state.event.events);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const getEvents = async () => {
    try {
      const response = await axios.get("/event", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response?.data;
      console.log(data);
      dispatch(setEvents(data));
    } catch (error) {
      console.error(error);
      swal("Error", "Fallo al obtener eventos", "error");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <section className="home">
      <div className="home-header">
        <h1>Bienvenido {fullName}</h1>
        <button type="button" onClick={() => navigate("/events/add")}>
          Crear evento
        </button>
      </div>
      <SearchableEventList events={events} />
    </section>
  );
};

export default HomePage;
