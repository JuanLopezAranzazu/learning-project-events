import { useLocation, Navigate, Outlet } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

// Componente que se encarga de proteger las rutas privadas
const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
