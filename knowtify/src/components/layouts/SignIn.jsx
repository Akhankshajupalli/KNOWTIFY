import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "./authcontext";
import { useNavigate } from "react-router-dom";
import "../styles/signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Correct import
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
      // ✅ Call login function from context
      const isSuccess = await login(formData.username, formData.password);

      if (isSuccess) {
        navigate("/"); // ✅ Redirect to dashboard
      }
    } catch (error) {
      setError("Invalid username or password");
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
