import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
// redux
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
// reducers actions
import { setUser, setToken } from "../../reducers/auth";

const LoginPage = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      console.log(response?.data);
      const { user, token } = response.data;
      swal("Success", "Inicio de sesion exitoso", "success");
      dispatch(setUser(user));
      dispatch(setToken(token));
      navigate(from);
    } catch (error) {
      console.error(error);
      swal("Error", "Fallo al iniciar sesion", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const validEmailRegex = RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    let errors = { ...formErrors };

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value)
          ? ""
          : "El correo es invalido!";
        break;
      case "password":
        errors.password =
          value.length < 6 || value.length > 128
            ? "La contraseña debe ser de 6 a 128 caracteres"
            : "";
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
      loginUser(formValues);
    } else {
      swal("Error", "Datos incorrectos", "error");
    }
  };

  return (
    <section>
      <h1>Inicio de sesion</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          {formErrors.email.length > 0 && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          {formErrors.password.length > 0 && (
            <span className="error">{formErrors.password}</span>
          )}
        </div>
        <button type="submit" className="btn-primary">
          Iniciar sesion
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
