import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/check-auth", {
          withCredentials: true,
        });
        setFormData(response.data.user);
      } catch (err) {
        setError("Failed to load profile.",err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/update/${formData.id}`, formData, {
        withCredentials: true,
      });

      setSuccess("Profile updated successfully! Please log in again.");
      setTimeout(() => {
        axios.post("http://localhost:8080/api/users/logout", {}, { withCredentials: true });
        navigate("/signin");
      }, 2000);
    } catch (err) {
      setError("Failed to update profile. Please try again.",err);
    }
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        

        <button className="save-btn" type="submit">Save Changes</button>
        <button className="cancel-btn" type="button" onClick={() => navigate("/profile")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfile;
