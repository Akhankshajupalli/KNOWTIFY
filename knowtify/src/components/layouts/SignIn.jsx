import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../layouts/authcontext";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css"; // ✅ Import your existing CSS file

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
      const response = await axios.post(
        "http://localhost:8080/api/users/login", // ✅ Adjusted endpoint for Spring Boot API
        formData,
        { withCredentials: true } // ✅ Send cookies with request
      );

      login(response.data.username); // ✅ Store user state
      navigate("/dashboard"); // ✅ Redirect to dashboard
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleLogin}>
        {/* ✅ Username Input */}
        <div className="form-group">
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
        <div className="form-group">
          <label>Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span className="toggle-icon" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        {/* ✅ Error Message */}
        {error && <p className="error">{error}</p>}

        {/* ✅ Submit Button */}
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
