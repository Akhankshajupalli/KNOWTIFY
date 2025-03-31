import { Navigate } from "react-router-dom";
import { useAuth } from "../layouts/authcontext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();

  console.log("ProtectedRoute - Auth State:", state); // Debugging

  if (!state.isAuthenticated) {
    console.log("User not authenticated - Redirecting to Sign In");
    return <Navigate to="/signin" />;
  }

  console.log("User authenticated - Rendering children");
  return children; // ✅ Render children if authenticated
};

export default ProtectedRoute;
