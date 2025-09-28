import pool from "../db.js";

export const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUser = async (name) => {
  const result = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
  return result.rows[0];
};

export const addUser = async (name, email) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

export const updateUserEmail = async (name, email) => {
  const result = await pool.query(  
    "UPDATE users SET email = $2 WHERE name = $1 RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

export const deleteUserEmail = async (name) => {
  const result = await pool.query(
    "DELETE FROM users WHERE name = $1 RETURNING *",
    [name]
  );
  return result.rows[0];
};
