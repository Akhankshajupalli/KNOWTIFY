import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/styles/home.css";
import "./components/styles/header.css";
import "./components/styles/footer.css";
import "./components/styles/register.css";
import Header from "./components/layouts/Header";
import Home from "./components/layouts/Home";
import SignIn from "./components/layouts/SignIn";
import Dashboard from "./components/layouts/Dashboard";
import Footer from "./components/layouts/footer"; 
import Register from "./components/layouts/Register";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
