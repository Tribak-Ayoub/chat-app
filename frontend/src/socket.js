import { io } from "socket.io-client";
import { useUserStore } from "./stores/user";

const userStore = useUserStore();

// Connect to backend with token
export const socket = io("http://localhost:5000", {
  auth: { token: userStore.token },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("private_message", (msg) => {
  console.log("New message received:", msg);
});