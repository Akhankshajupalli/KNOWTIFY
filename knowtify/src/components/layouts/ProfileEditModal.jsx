import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";

Modal.setAppElement("#root");

// ✅ Styled Components
const ModalContainer = styled.div`
  padding: 20px;
  width: 400px;
  background: rgba(5, 23, 36, 0.9);
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: rgba(5, 23, 36, 0.9);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

const ProfileEditModal = ({ isOpen, closeModal, userData, setUserData }) => {
  const [formData, setFormData] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission (Save Changes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Send update request to backend
      const response = await axios.put(
        `http://localhost:8080/api/users/update`,
        formData,
        { withCredentials: true }
      );

      // ✅ Update Profile Data & Close Modal
      setUserData(response.data.user);
      closeModal();
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Edit Profile">
      <ModalContainer>
        <h2>Edit Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <Input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
          />

          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />

          <label>Phone:</label>
          <Input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />

          <label>Date of Birth:</label>
          <Input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
          />

          <Button primary type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
};

// ✅ Prop Types
ProfileEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default ProfileEditModal;
