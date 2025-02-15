import { BrowserRouter as Router, Routes, Route } from './react-router-dom';
import './components/styles/Home.css';
import './components/styles/Header.css';
import './components/styles/Footer.css';
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Footer from './components/layouts/footer'; // Correct casing for Footer

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route for Home */}
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
