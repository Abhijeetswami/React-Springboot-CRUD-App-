// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    city: ''
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', password: '', city: '' });
      console.log('User created successfully:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${id}`, newUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data : user))
      );
      setNewUser({ name: '', email: '', password: '', city: '' });
      setSelectedUserId(null);
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log('User deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    setNewUser(selectedUser);
    setSelectedUserId(id);
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <div>
        <h2>Create/Update User</h2>
        <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} />
        <input type="text" name="city" placeholder="City" value={newUser.city} onChange={handleInputChange} />
        {selectedUserId ? (
          <button onClick={() => handleUpdateUser(selectedUserId)}>Update User</button>
        ) : (
          <button onClick={handleCreateUser}>Create User</button>
        )}
      </div>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.city}
              <button onClick={() => handleEditUser(user.id)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
