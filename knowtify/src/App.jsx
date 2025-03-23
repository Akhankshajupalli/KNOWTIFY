import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/layout";
import SignIn from "./components/layouts/SignIn";
import Register from "./components/layouts/Register";
import Dashboard from "./components/layouts/Dashboard";
import Home from "./components/layouts/Home";
import Profile from "./components/layouts/Profile";
import { AuthProvider } from "./components/layouts/authcontext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import "./components/styles/header.css";
import "./components/styles/footer.css";
import "./components/styles/home.css";
import "./components/styles/signin.css";
import "./components/styles/register.css";
import "./components/styles/dashboard.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Public Routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected Routes with Layout */}
          <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
