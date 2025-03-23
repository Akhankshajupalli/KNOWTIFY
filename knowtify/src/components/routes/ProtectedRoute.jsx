import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../layouts/authcontext";

const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();

  // ✅ Handle authentication check
  if (!state || !state.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
