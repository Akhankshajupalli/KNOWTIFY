import  { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const nextStep = () => step < 4 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      interests: checked
        ? [...prevData.interests, value]
        : prevData.interests.filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
    console.log(formData);
  };

  const handleExit = () => {
    navigate("/home"); // Redirect to home page
  };

  return (
    <div className="register-container">
      {/* Exit Button Outside White Frame */}
      <button className="exit-button" onClick={handleExit} type="button">✖</button>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Step {step}: {step === 1 ? "Personal Details" : step === 2 ? "Contact Details" : step === 3 ? "Address Details" : "Your Interests"}</h2>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="step">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <div className="step">
            <label>Phone Number:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +1234567890" />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Country:</label>
            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        )}

        {/* Step 3: Address Details */}
        {step === 3 && (
          <div className="step">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />

            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />

            <label>State:</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />

            <label>Zip Code:</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
          </div>
        )}

        {/* Step 4: Your Interests */}
        {step === 4 && (
          <div className="step">
            <label>Select Your Interests:</label>
            <div className="checkbox-group">
              {["Artificial Intelligence", "Data Science", "Cybersecurity", "Data Visualization"].map((interest) => (
                <label key={interest}>
                  <input type="checkbox" value={interest} checked={formData.interests.includes(interest)} onChange={handleCheckboxChange} />
                  {interest}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-buttons">
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 4 ? (
            <button type="button" onClick={nextStep}>Next</button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;