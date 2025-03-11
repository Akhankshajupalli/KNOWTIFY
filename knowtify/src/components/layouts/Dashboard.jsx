
import { useAuth } from '../layouts/authcontext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Clear user state
    navigate('/'); // ✅ Redirect to home page
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard, {user?.username || 'Guest'}!</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Dashboard;
