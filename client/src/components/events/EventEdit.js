import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
// reducers actions
import { updateEvent } from "../../reducers/event";

const initialState = {
  name: "",
  description: "",
  date: "",
};

// Componente que permite editar un evento
const EventEdit = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const getEvent = async () => {
    try {
      const response = await axios.get(`/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      console.log(data);
      setFormValues({
        name: data.name || "",
        description: data.description || "",
        date: new Date(data.date).toISOString().split("T")[0] || "",
      });
    } catch (error) {
      console.error(error);
      swal("Error", "Fallo al obtener evento", "error");
    }
  };

  const editEvent = async (eventData) => {
    try {
      const response = await axios.put(`/event/${id}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      console.log(data);
      swal("Success", "Evento creado", "success");
      dispatch(updateEvent({ id, updatedEvent: data }));
      navigate(-1);
    } catch (error) {
      console.error(error);
      swal("Error", "Fallo al crear el evento", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    let errors = { ...formErrors };

    switch (name) {
      case "name":
        errors.name = value.length < 3 ? "El nombre es muy corto" : "";
        break;
      case "description":
        errors.description =
          value.length < 10 ? "La descripcion es muy corta" : "";
        break;
      case "date":
        errors.date = value.length === 0 ? "La fecha es requerida" : "";
        break;
      default:
        break;
    }
    setFormErrors(errors);
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formErrors)) {
      editEvent(formValues);
    } else {
      swal("Error", "Datos incorrectos", "error");
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <section>
      <h2>Editar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          {formErrors.name.length > 0 && (
            <span className="error">{formErrors.name}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
          {formErrors.description.length > 0 && (
            <span className="error">{formErrors.description}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
            required
          />
          {formErrors.date.length > 0 && (
            <span className="error">{formErrors.date}</span>
          )}
        </div>
        <button type="submit">Editar</button>
      </form>
    </section>
  );
};

export default EventEdit;
