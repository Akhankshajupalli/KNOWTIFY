import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/styles/Home.css";
import "./components/styles/Header.css";
import "./components/styles/Footer.css";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import SignIn from "./components/layouts/SignIn";
import Dashboard from "./components/layouts/Dashboard";
import Footer from "./components/layouts/Footer"; 

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
