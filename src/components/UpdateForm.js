// components/UpdateForm.js
import React, { useState } from 'react';

const UpdateForm = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    city: user.city,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(user.id, formData);
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

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
