import { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../AuthContext";
import ProfileEditModal from "./ProfileEditModal";

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
  const { state } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState(state.user || {});
  const [tempData, setTempData] = useState({});

  const openModal = (section) => {
    setEditSection(section);
    setTempData(formData[section] || {});
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, [editSection]: tempData };
    setFormData(updatedData);
    closeModal();

    try {
      await axios.put(
        `http://localhost:5000/users/${formData.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${formData.id}`);
      alert("Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <Container>
      <h2>Profile</h2>
      <Section>
        <Title>
          Personal Info{" "}
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

      <Section>
        <Title>
          Address (Permanent){" "}
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

      <Section>
        <Title>
          Address (Current){" "}
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

      <Section>
        <Title>
          Languages{" "}
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

      <DeleteButton onClick={handleDelete}>
        <FaTrash /> Delete Account
      </DeleteButton>

      {/* Profile Edit Modal */}
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
