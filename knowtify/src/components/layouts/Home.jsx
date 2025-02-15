import{ useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    document.title= "Knowtify";
    const handleScroll = () => {
      const featuresSection = document.querySelector(".features");
      const sectionPosition = featuresSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionPosition < windowHeight - 100) {
        setShowFeatures(true);
      }

      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home">
      <section className="hero-section">
        <h1>Welcome to the Skill-Based Microlearning Platform</h1>
        <p>Short, targeted lessons to help you acquire and improve specific skills.</p>
      </section>

      <section className={`features ${showFeatures ? "show" : ""}`}>
        <div className="feature">
          <div className="feature-icon">🎯</div>
          <h2>Short and Targeted Learning Modules</h2>
          <p>Learn in bite-sized lessons focused on specific skills or tasks.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📈</div>
          <h2>Skill Tracks</h2>
          <p>Follow structured tracks and track your progress easily.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🏆</div>
          <h2>Gamification</h2>
          <p>Earn points, badges, and certificates for completing modules.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🤖</div>
          <h2>Personalized Learning Path</h2>
          <p>AI-powered recommendations to meet your learning goals.</p>
        </div>
      </section>

      {showScrollToTop && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}
    </div>
  );
};

export default Home;
