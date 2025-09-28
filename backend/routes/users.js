import express from "express";
import { fetchUsers, createUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", fetchUsers);
router.post("/", createUser);
router.put("/", updateUser);

export default router;
