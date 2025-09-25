import { useEffect, useState } from "react";
import API from "../services/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/users", form);
    setUsers([...users, res.data]);
    setForm({ name: "", email: "" });
  };

  return (
    <div>
      <h2>Users</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
