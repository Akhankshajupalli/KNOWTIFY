import  { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../layouts/authcontext";
import ProfileEditModal from "../layouts/ProfileEditModal";

Modal.setAppElement("#root");

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Title = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
`;

const Profile = () => {
  const { state, logout } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState(state.user || {});
  const [tempData, setTempData] = useState({});
  const [error, setError] = useState("");

  const openModal = (section) => {
    setEditSection(section);
    setTempData(formData[section] || {});
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const updatedData = { ...formData, [editSection]: tempData };

    try {
      // ✅ Step 1: Update user data using Axios
      const response = await axios.put(
        `https://knowtify-server-2.onrender.com/users/${formData.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Step 2: Update state on success
      setFormData(response.data);
      closeModal();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account?")) {
        // ✅ Step 1: Delete user account using Axios
        await axios.delete(`https://knowtify-server-2.onrender.com/users/${formData.id}`);

        alert("Account deleted successfully.");
        logout(); // ✅ Clear auth state after deletion
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
      setError("Failed to delete account. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Profile</h2>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Personal Info */}
      <Section>
        <Title>
          Personal Info
          <Button onClick={() => openModal("personal")}>
            <FaEdit />
          </Button>
        </Title>
        <p>Name: {formData.personal?.name || "N/A"}</p>
        <p>Email: {formData.personal?.email || "N/A"}</p>
        <p>Phone: {formData.personal?.phone || "N/A"}</p>
        <p>DOB: {formData.personal?.dob || "N/A"}</p>
        <p>Gender: {formData.personal?.gender || "N/A"}</p>
      </Section>

      {/* ✅ Permanent Address */}
      <Section>
        <Title>
          Address (Permanent)
          <Button onClick={() => openModal("permanent")}>
            <FaEdit />
          </Button>
        </Title>
        <p>
          {formData.permanent?.street || "N/A"},{" "}
          {formData.permanent?.city || "N/A"},{" "}
          {formData.permanent?.state || "N/A"},{" "}
          {formData.permanent?.country || "N/A"} -{" "}
          {formData.permanent?.pin || "N/A"}
        </p>
      </Section>

      {/* ✅ Current Address */}
      <Section>
        <Title>
          Address (Current)
          <Button onClick={() => openModal("current")}>
            <FaEdit />
          </Button>
        </Title>
        <p>
          {formData.current?.street || "N/A"},{" "}
          {formData.current?.city || "N/A"},{" "}
          {formData.current?.state || "N/A"},{" "}
          {formData.current?.country || "N/A"} -{" "}
          {formData.current?.pin || "N/A"}
        </p>
      </Section>

      {/* ✅ Languages */}
      <Section>
        <Title>
          Languages
          <Button onClick={() => openModal("languages")}>
            <FaEdit />
          </Button>
        </Title>
        {formData.languages?.length > 0 ? (
          formData.languages.map((lang, index) => (
            <p key={index}>
              {lang.name} (Read: {lang.read ? "Yes" : "No"}, Write:{" "}
              {lang.write ? "Yes" : "No"}, Speak: {lang.speak ? "Yes" : "No"})
            </p>
          ))
        ) : (
          <p>N/A</p>
        )}
      </Section>

      {/* ✅ Delete Account */}
      <DeleteButton onClick={handleDelete}>
        <FaTrash /> Delete Account
      </DeleteButton>

      {/* ✅ Profile Edit Modal */}
      <ProfileEditModal
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        closeModal={closeModal}
        section={editSection}
        tempData={tempData}
        setTempData={setTempData}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Profile;
