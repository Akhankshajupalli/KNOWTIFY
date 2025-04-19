import { createContext, useContext, useReducer, useEffect, useState } from "react";
import authReducer from "../reducers/authReducer";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const initialState = { isAuthenticated: false, user: null };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/check-auth", {
          withCredentials: true,
        });

        if (response.data) {
          dispatch({ type: "LOGIN", payload: response.data }); // ✅ Store full user object
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Login Function
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        username,
        password,
      }, { withCredentials: true });

      if (response.data) {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Store updated user
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ Update Profile Function
  const updateProfile = async (updates) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${state.user.id}`, updates, {
        withCredentials: true,
      });

      if (response.data) {
        dispatch({ type: "LOGIN", payload: response.data }); // ✅ Update state with new user data
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // ✅ Logout Function
  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout", {}, { withCredentials: true });
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user"); // ✅ Clear local storage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
