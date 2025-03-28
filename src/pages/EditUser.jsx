import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./EditUser.css";  // Import CSS

const EditUser = () => {
  const location = useLocation();
  const user = location.state.user;
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      alert("User updated successfully!");
      navigate("/users");
    } catch (err) {
      alert("Failed to update user!");
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="update-btn" type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
