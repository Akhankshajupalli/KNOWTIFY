import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import authReducer from "../reducers/authReducer";

const AuthContext = createContext();

const initialState = JSON.parse(localStorage.getItem("authState")) || {
  isAuthenticated: false,
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  const login = async (username, password) => {
    try {
      const response = await axios.get(
        `https://knowtify-server-2.onrender.com/users?username=${username}`
      );
      const user = response.data[0];

      if (user && user.password === password) {
        dispatch({ type: "LOGIN", payload: user });
        localStorage.setItem(
          "authState",
          JSON.stringify({ isAuthenticated: true, user })
        );
        console.log("Login Successful:", user);
        return true;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authState");
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://knowtify-server-2.onrender.com/users/${updatedData.id}`,
        updatedData
      );
      dispatch({ type: "UPDATE_PROFILE", payload: response.data });
      localStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated: true, user: response.data })
      );
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
