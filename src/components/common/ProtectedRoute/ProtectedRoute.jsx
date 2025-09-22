import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token → redirigir a login
    return <Navigate to="/login" replace />;
  }

  // Si hay token → mostrar la vista
  return children;
}

export default ProtectedRoute;
