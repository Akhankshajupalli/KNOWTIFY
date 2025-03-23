import { createContext, useContext, useReducer } from "react";
import axios from "axios";

// ✅ Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
};

// ✅ Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ✅ Login Function using Axios
  const login = async (username, password) => {
    try {
      const response = await axios.get(
        `https://knowtify-server-2.onrender.com/users?username=${username}&password=${password}`
      );
  
      if (response.data.length > 0) {
        const user = response.data[0];
        dispatch({ type: "LOGIN", payload: user });
  
        // ✅ Store user data in local storage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Auth State After Login:", user); // ✅ Debug log
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  

  // ✅ Logout Function
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
