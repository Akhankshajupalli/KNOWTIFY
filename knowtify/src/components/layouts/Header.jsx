import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUser, FaBook, FaChartBar, FaUsers, FaUserCheck } from "react-icons/fa";
import { useAuth } from "../layouts/authcontext"; // ✅ Ensure correct path
import Button from "../layouts/Button";
import "../styles/header.css"; // ✅ Ensure correct path

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, logout } = useAuth(); // ✅ Access authentication state and actions
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Clear authentication state
    navigate("/"); // ✅ Redirect to home after logout
  };

  return (
    <header>
      <div className="inner-container">
        {/* ✅ Top Section: Logo & Auth Buttons */}
        <div className="header-top">
          <Link to="/" className="header-logo">
            KNOWTIFY
          </Link>

          <div className="auth-buttons">
            {state.isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="dashboard-btn">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="logout-btn" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="outline" className="register-btn">
                    Register
                  </Button>
                </Link>

                <Link to="/signin">
                  <Button variant="outline" className="sign-in-btn">
                    <FaUserCheck style={{ marginRight: "5px" }} />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* ✅ Bottom Section: Navigation & Icons */}
        <div className="header-bottom">
          {/* ✅ Hamburger Menu */}
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* ✅ Navigation Links */}
          <nav className={menuOpen ? "menu-open" : ""}>
            <Link to="/courses">
              <FaBook style={{ marginRight: "5px" }} />
              Courses
            </Link>
            <Link to="/skill-tracks">
              <FaChartBar style={{ marginRight: "5px" }} />
              Skill Tracks
            </Link>
            <Link to="/leaderboard">
              <FaChartBar style={{ marginRight: "5px" }} />
              Leaderboard
            </Link>
            <Link to="/community">
              <FaUsers style={{ marginRight: "5px" }} />
              Community
            </Link>
            <Link to="/analytics">
              <FaChartBar style={{ marginRight: "5px" }} />
              Analytics
            </Link>
          </nav>

          {/* ✅ Icons */}
          <div className="icon-container">
            <FaBell className="icon" />
            {state.isAuthenticated && (
              <Link to="/profile">
                <FaUser className="icon" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
