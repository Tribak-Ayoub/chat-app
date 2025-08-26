// Import PrismaClient from Prisma package
import { PrismaClient } from "@prisma/client";

// Create a single instance of Prisma to interact with DB
const prisma = new PrismaClient();

// Export it so we can use it in controllers or WebSocket handlers
export default prisma;
