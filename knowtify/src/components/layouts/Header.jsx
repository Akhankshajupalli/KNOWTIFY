import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUser, FaBook, FaChartBar, FaUsers, FaUserCheck } from "react-icons/fa";
import { useAuth } from "../layouts/authcontext";
import Button from "../layouts/Button";
import "../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, logout } = useAuth(); // ✅ Direct state usage
  const navigate = useNavigate();

  // ✅ Handle Logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header key={state?.isAuthenticated}>
      <div className="inner-container">
        {/* ✅ Top Section */}
        <div className="header-top">
          <Link to="/" className="header-logo">
            KNOWTIFY
          </Link>

          <div className="auth-buttons">
            {state?.isAuthenticated ? (
              <>
                {/* ✅ Dashboard */}
                <Link to="/dashboard">
                  <Button variant="outline" className="dashboard-btn">
                    Dashboard
                  </Button>
                </Link>

                {/* ✅ Profile */}
                <Link to="/profile">
                  <Button variant="outline" className="profile-btn">
                    Profile
                  </Button>
                </Link>

                {/* ✅ Logout */}
                <Button
                  variant="outline"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* ✅ Register */}
                <Link to="/register">
                  <Button variant="outline" className="register-btn">
                    Register
                  </Button>
                </Link>

                {/* ✅ Sign In */}
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

        {/* ✅ Bottom Section */}
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
            {state?.isAuthenticated && (
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
