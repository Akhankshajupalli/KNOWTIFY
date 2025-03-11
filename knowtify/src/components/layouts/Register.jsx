import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    interests: [],
  });

  const nextStep = () => step < 5 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      interests: checked
        ? [...prevData.interests, value]
        : prevData.interests.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Send POST request to backend using Axios
      const response = await axios.post("https://knowtify-server-2.onrender.com/users", formData);

      console.log("Registration Successful:", response.data);
      alert("Registration Successful!");
      navigate("/signin");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Registration Failed. Please try again.");
    }
  };

  const handleExit = () => {
    navigate("/home");
  };

  return (
    <div className="register-container">
      {/* Exit Button */}
      <button className="exit-button" onClick={handleExit} type="button">
        ✖
      </button>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>
          Step {step}:{" "}
          {step === 1
            ? "Create Account"
            : step === 2
            ? "Personal Details"
            : step === 3
            ? "Contact Details"
            : step === 4
            ? "Address Details"
            : "Your Interests"}
        </h2>

        {/* ✅ Step 1: Create Account */}
        {step === 1 && (
          <div className="step">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* ✅ Step 2: Personal Details */}
        {step === 2 && (
          <div className="step">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* ✅ Step 3: Contact Details */}
        {step === 3 && (
          <div className="step">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="e.g. +1234567890"
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Country:</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        )}

        {/* ✅ Step 4: Address Details */}
        {step === 4 && (
          <div className="step">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <label>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <label>Zip Code:</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* ✅ Step 5: Your Interests */}
        {step === 5 && (
          <div className="step">
            <label>Select Your Interests:</label>
            <div className="checkbox-group">
              {[
                "Artificial Intelligence",
                "Data Science",
                "Cybersecurity",
                "Data Visualization",
              ].map((interest) => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleCheckboxChange}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="form-buttons">
          {step > 1 && (
            <button type="button" onClick={prevStep}>
              Back
            </button>
          )}
          {step < 5 ? (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
