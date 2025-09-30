import { useEffect, useState } from "react";
import API from "../services/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [updateForm, setUpdateForm] = useState({ name: "", email: "" });
  const [deleteForm, setDeleteForm] = useState({ name: ""});

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/users", form);
    setUsers([...users, res.data]);
    setForm({ name: "", email: "" });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/users", updateForm);
      setUsers(users.map(user => 
        user.name === updateForm.name ? res.data : user
      ));
      setUpdateForm({ name: "", email: "" });
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please check if the name exists.");
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(deleteForm);
      const res = await API.delete("/users", {params: deleteForm});
      setUsers(users.filter(user => user.name !== deleteForm.name));
      setDeleteForm({ name: ""});
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please check if the name exists.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>User Management System</h2>
      
      {/* Add User Form */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        border: "1px solid #ddd", 
        borderRadius: "8px",
        backgroundColor: "#f9f9f9"
      }}>
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: "1", minWidth: "150px" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: "1", minWidth: "150px" }}
          />
          <button 
            type="submit"
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "#007bff", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer" 
            }}
          >
            Add User
          </button>
        </form>
      </div>

      {/* Update User Form */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        border: "1px solid #ddd", 
        borderRadius: "8px",
        backgroundColor: "#fff3cd"
      }}>
        <h3>Update User Email</h3>
        <form onSubmit={handleUpdateSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Enter user name to update"
            value={updateForm.name}
            onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: "1", minWidth: "150px" }}
          />
          <input
            type="email"
            placeholder="New email"
            value={updateForm.email}
            onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: "1", minWidth: "150px" }}
          />
          <button 
            type="submit"
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer" 
            }}
          >
            Update Email
          </button>
        </form>
      </div>

      {/* Delete User Form */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px",
        border: "1px solid #ddd", 
        borderRadius: "8px",
        backgroundColor: "#fff3cd"
      }}>
        <h3>Delete User Email</h3>
        <form onSubmit={handleDeleteSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Enter user name to delete"
            value={deleteForm.name}
            onChange={(e) => setDeleteForm({ ...deleteForm, name: e.target.value })}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", flex: "1", minWidth: "150px" }}
          />
          <button 
            type="submit"
            style={{
              padding: "8px 16px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              cursor: "pointer" 
            }}
          >
            Delete User
          </button>
        </form>
      </div>

      {/* Users List */}
      <div>
        <h3>Current Users</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li
              key={u.id}
              style={{
                padding: "10px", 
                margin: "5px 0",
                backgroundColor: "#e9ecef",
                borderRadius: "4px",
                border: "1px solid #dee2e6"
              }}
            >
              <strong>{u.name}</strong> - {u.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
