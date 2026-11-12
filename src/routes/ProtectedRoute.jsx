// import { useAuth } from "../hooks/fetchUser";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "../state-mangement/contextApi";
import { useContext } from "react";
import Spinner from "../Spinner/Spinner";

const ProtectedRoute = () => {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
