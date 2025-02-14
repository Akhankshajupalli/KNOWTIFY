import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/styles/home.css';
import './components/styles/header.css';
import './components/styles/footer.css';
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Footer from './components/layouts/footer'; // Correct casing for Footer
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home is now the default route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
