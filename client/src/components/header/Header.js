import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../reducers/auth";
import swal from "sweetalert";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const handleClick = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez cerrada la sesión, deberás iniciar sesión de nuevo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        swal("Success", "Sesion cerrada", "success");
        dispatch(setUser(null));
        dispatch(setToken(null));
        navigate("/");
      }
    });
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="nav-link">
          <h1 style={{ margin: 0, padding: 0 }}>App Test React</h1>
        </Link>
        {user ? (
          <nav>
            <Link to="/" className="nav-link">
              Eventos
            </Link>
            <button type="button" className="btn-danger" onClick={handleClick}>
              Cerrar sesion
            </button>
          </nav>
        ) : (
          <nav>
            <Link to="/login" className="nav-link">
              Iniciar sesion
            </Link>
            <Link to="/register" className="nav-link">
              Registrarse
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
