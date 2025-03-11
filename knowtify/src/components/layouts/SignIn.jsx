import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../layouts/authcontext";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle Login Process
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const userResponse = await axios.get(
        `https://knowtify-server-2.onrender.com/users?username=${formData.username}`
      );
      const user = userResponse.data[0];
  
      if (!user) {
        setError("Username does not exist");
        return;
      }
  
      if (user.password !== formData.password) {
        setError("Incorrect password");
        return;
      }
  
      login(user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    }
  };
  

  return (
    <div>
      <form onSubmit={handleLogin}>
        {/* ✅ Username Input */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        {/* ✅ Password Input with Eye Icon */}
        <div>
          <label>Password:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {/* ✅ Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* ✅ Submit Button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
