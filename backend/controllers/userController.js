import { getUsers, getUser, addUser, updateUserEmail, deleteUserEmail } from "../models/userModel.js";

export const fetchUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  const exisitingUser = await getUser(name);
  if (exisitingUser) {
    return res.status(400).json({ error: "User already exists, Try updating the email" });
  }
  try {
    const newUser = await addUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserEmail(name, email);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const name = req.query.name;
  const exisitingUser = await getUser(name);
  if(!exisitingUser){
    return res.status(400).json({ error: "User does not exist" });
  }
  try {
    const deletedUser = await deleteUserEmail(name);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
