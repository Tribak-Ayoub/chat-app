import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { verifyToken } from "./utils/auth.js";
import authRoutes from "./routes/auth.js";
import prisma from "./prisma/client.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/auth", authRoutes); // attach auth routes

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } }); // WebSocket server

// WebSocket middleware for JWT auth
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // token from client
  if (!token) return next(new Error("Unauthorized"));

  try {
    const decoded = verifyToken(token);
    socket.userId = decoded.id; // attach userId to socket
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

// Handle connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.userId);

  // Listen for private messages
  socket.on("private_message", async ({ content, to }) => {
    // Save message to DB
    const message = await prisma.message.create({
      data: { text: content, senderId: socket.userId, receiverId: to },
    });

    // Emit to the recipient only
    socket.to(to).emit("private_message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.userId);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
