import express from "express";
import { fetchUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", fetchUsers);
router.post("/", createUser);

export default router;
