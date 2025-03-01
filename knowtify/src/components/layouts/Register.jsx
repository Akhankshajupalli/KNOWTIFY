import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    education: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // Add backend API call here
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Education (Optional)</label>
        <input
          type="text"
          name="education"
          value={formData.education}
          onChange={handleChange}
        />

        <label>Country/Region (Optional)</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
