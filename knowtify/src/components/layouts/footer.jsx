
import '../styles/Footer.css'; // Import the CSS file

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>Subscribe to our KNOWTIFY</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

      <div className="footer-container">
        <div className="footer-column">
          <h3>KnowTify Features</h3>
          <ul>
            <li><a href="#">Learning Modules</a></li>
            <li><a href="#">Skill Tracks</a></li>
            <li><a href="#">Gamification & Challenges</a></li>
            <li><a href="#">Community Engagement</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Support & Resources</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Learn More</h3>
          <ul>
            <li><a href="#">About KnowTify</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect With Us</h3>
          <ul className="social-icons">
            <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} KnowTify. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
