import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Users.css";  // Import CSS

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user.id}`, { state: { user } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user!");
    }
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img src={user.avatar} alt={user.first_name} />
          <h4>{user.first_name} {user.last_name}</h4>
          <p>{user.email}</p>
          <div className="user-buttons">
            <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Users;
