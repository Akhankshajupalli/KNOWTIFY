import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaBell, FaUser, FaBook, FaChartBar, FaUsers, FaUserCheck } from "react-icons/fa"; 
import Button from "./Button";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="inner-container">
        {/* Top Section: Logo & Auth Buttons */}
        <div className="header-top">
          <Link to="/" className="header-logo">
            KNOWTIFY
          </Link>
          <div className="auth-buttons">
          <Link to="/signin" className="sign-in-btn">
          <FaUserCheck style={{ marginRight: '5px' }} />
          Sign In
          </Link>

            <Link to="/register">
              <Button variant="outline" className="register-btn">
                Register
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Section: Navigation & Icons */}
        <div className="header-bottom">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <nav className={menuOpen ? "menu-open" : ""}>
            <Link to="/courses">
              <FaBook style={{ marginRight: '5px' }} />
              Courses
            </Link>
            <Link to="/skill-tracks">
              <FaChartBar style={{ marginRight: '5px' }} />
              Skill Tracks
            </Link>
            <Link to="/leaderboard">
              <FaChartBar style={{ marginRight: '5px' }} />
              Leaderboard
            </Link>
            <Link to="/community">
              <FaUsers style={{ marginRight: '5px' }} />
              Community
            </Link>
            <Link to="/analytics">
              <FaChartBar style={{ marginRight: '5px' }} />
              Analytics
            </Link>
          </nav>

          <div className="icon-container">
            <FaBell className="icon" />
            <Link to="/profile">
              <FaUser className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
