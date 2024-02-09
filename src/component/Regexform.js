import React, { useState } from "react";
import './Regex.css';

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validation logic with regex
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim().match(nameRegex)) {
      newErrors.firstName = "First name is not valid";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName.trim().match(nameRegex)) {
      newErrors.lastName = "Last name is not valid";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!formData.email.trim().match(emailRegex)) {
      newErrors.email = "Email is not valid";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);
      // Add logic to send data to the server or perform other actions
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <div className="error">{errors.firstName}</div>
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <div className="error">{errors.lastName}</div>
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="error">{errors.email}</div>
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="error">{errors.password}</div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
