import { useLocation, Navigate, Outlet } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

// Componente para verificar si el usuario tiene los roles requeridos
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  return allowedRoles?.includes(user?.role?.name) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
