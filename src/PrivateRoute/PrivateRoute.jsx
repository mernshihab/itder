import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
