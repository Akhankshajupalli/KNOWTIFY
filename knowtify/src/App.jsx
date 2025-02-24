import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import './components/styles/home.css';
import './components/styles/header.css';
import './components/styles/footer.css';
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Footer from './components/layouts/footer'; // Correct casing for Footer
=======
import './components/styles/Home.css';
import './components/styles/Header.css';
import './components/styles/Footer.css';
import Header from './components/layouts/Header';
import Home from './components/layouts/Home';
import Footer from './components/layouts/footer'; // Correct casing for Footer

>>>>>>> 85f8f3948489e81614597bafea2f61da7fe5f21d
const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home />} /> {/* Home is now the default route */}
=======
          <Route path="/" element={<Home />} /> {/* Default route for Home */}
          
>>>>>>> 85f8f3948489e81614597bafea2f61da7fe5f21d
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
