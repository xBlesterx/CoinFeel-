import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "./state/api";
import { useEffect } from "react";
import { setUser } from "./state";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);
  const user = localStorage.getItem("user");

  if (user) dispatch(setUser(user));

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
