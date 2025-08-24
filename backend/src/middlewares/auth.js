import { verifyToken } from "../utils/auth.js";

// Middleware for Express routes to check JWT
export const authMiddleware = (req, res, next) => {
  // Get token from Authorization header: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = verifyToken(token); // decode JWT
    req.userId = decoded.id; // attach userId to request for later use
    next(); // move to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
