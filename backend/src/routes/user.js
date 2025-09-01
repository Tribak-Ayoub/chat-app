import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import prisma from "../prisma/client.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.userId },
      select: { id: true, username: true, email: true },
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
