import { useEffect, useState } from "react";
import { useAuth } from "../layouts/authcontext"; // ✅ Correct import
import axios from "axios";
import "../styles/dashboard.css"; // ✅ Import your external CSS file

const Dashboard = () => {
  const { state } = useAuth(); // ✅ Get authentication state
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!state.user) {
          setError("User not logged in. Please sign in.");
          setLoading(false);
          return;
        }

        // ✅ Fetch user details from Spring Boot server
        const response = await axios.get(
          `http://localhost:8080/api/users/${state.user.id}`, // ✅ Replace with your Spring Boot backend URL
          { withCredentials: true } // ✅ Include credentials for authentication
        );

        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to load user data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [state.user]); // ✅ Refetch when user state changes

  if (loading) return <div className="dashboard-container">Loading user details...</div>;
  if (error) return <div className="dashboard-container error">{error}</div>;
  if (!userDetails) return <div className="dashboard-container">User not found.</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome to your KnowTify Dashboard, {userDetails.username}!
      </h1>
      <p className="dashboard-subtitle">Explore the features available for you:</p>
      <ul className="dashboard-features">
        <li className="feature-card">Edit Profile</li>
        <li className="feature-card">Manage Account</li>
        <li className="feature-card">View Activity</li>
        <li className="feature-card">Change Password</li>
      </ul>
    </div>
  );
};

export default Dashboard;
