// components/RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
    // Optionally, clear the form after registration
    setFormData({
      name: '',
      email: '',
      password: '',
      city: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} required />

      <label>City:</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} required />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
