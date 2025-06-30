import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
