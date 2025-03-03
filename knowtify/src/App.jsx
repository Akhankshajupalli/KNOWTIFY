import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/styles/home.css';
import './components/styles/header.css';
import './components/styles/footer.css';
import './components/styles/Register.css';
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Footer from './components/layouts/Footer';
import Register from './components/layouts/Register'; // Import Register

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
