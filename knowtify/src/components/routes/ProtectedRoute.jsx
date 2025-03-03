import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();

  return state.isAuthenticated ? element : <Navigate to="/signin" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
