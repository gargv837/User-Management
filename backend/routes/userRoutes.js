import express from "express";
import { fetchUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", fetchUsers);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
