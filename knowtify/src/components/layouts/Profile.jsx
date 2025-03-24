import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../layouts/authcontext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { state, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const username = state.user?.username; // Get logged-in username

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ Fetch user details from your backend
        const response = await axios.get(
          `http://localhost:8080/api/users/${username}`,
          { headers: { "Content-Type": "application/json" } }
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!userData) return <p>No user data found.</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Date of Birth:</strong> {userData.dob}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Country:</strong> {userData.country}</p>
      <p><strong>Address:</strong> {userData.address}, {userData.city}, {userData.state} - {userData.zip}</p>
      <p><strong>Interests:</strong> {userData.interests?.join(", ")}</p>

      <button className="edit-btn" onClick={() => navigate("/edit-profile")}>Edit Profile</button>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
