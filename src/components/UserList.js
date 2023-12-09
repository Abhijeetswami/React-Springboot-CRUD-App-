// components/UserList.js
import React from 'react';
const UserList = ({ users, onUpdateClick, onDelete }) => {
  // Check if users is not an array
  if (!Array.isArray(users)) {
    console.error('Error: Users data is not an array', users);
    return null; // or display an error message
  }
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.city}
            <button onClick={() => onUpdateClick(user)}>Update</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserList;
