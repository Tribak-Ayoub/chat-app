import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register → calls register controller
router.post("/register", register);

// POST /api/auth/login → calls login controller
router.post("/login", login);

export default router;
