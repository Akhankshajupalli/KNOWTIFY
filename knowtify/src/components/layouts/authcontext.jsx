import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import authReducer from "../reducers/authReducer";

// ✅ Load Initial State from Local Storage
const initialState = JSON.parse(localStorage.getItem("authState")) || {
  isAuthenticated: false,
  user: null,
};

// ✅ Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Save to Local Storage on State Change
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  // ✅ Login Action
  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
    localStorage.setItem(
      "authState",
      JSON.stringify({ isAuthenticated: true, user })
    );
  };

  // ✅ Logout Action
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authState");
  };

  // ✅ Update Profile Action
  const updateProfile = (updatedData) => {
    dispatch({ type: "UPDATE_PROFILE", payload: updatedData });
    localStorage.setItem(
      "authState",
      JSON.stringify({
        isAuthenticated: state.isAuthenticated,
        user: updatedData,
      })
    );
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ PropTypes Validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Custom Hook to Use Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
