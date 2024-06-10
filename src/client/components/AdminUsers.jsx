// components/AdminUsers.jsx
import React, { useState, useEffect } from "react";

const AdminUsers = ({ user }) => { // Define function for Admins
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => { // Fetch users from API
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorizing token from local storage
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error); // Log an error message if fetching a user is failed
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminUsers;
