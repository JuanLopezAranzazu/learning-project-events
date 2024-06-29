import { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
// reducers actions
import { addEvent } from "../../reducers/event";

const initialState = {
  name: "",
  description: "",
  date: "",
};

// Componente que permite agregar un evento
const EventAdd = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const createEvent = async (eventData) => {
    try {
      const response = await axios.post("/event", eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response?.data);
      swal("Success", "Evento creado", "success");
      dispatch(addEvent(response.data));
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
      createEvent(formValues);
    } else {
      swal("Error", "Datos incorrectos", "error");
    }
  };

  return (
    <section>
      <h2>Crear Evento</h2>
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
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};

export default EventAdd;
