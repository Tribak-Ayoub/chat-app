<script setup>
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(backendUrl);

socket.on("connect", () => {
  console.log("Connected to backend:", socket.id);
});
</script>

<template>
  <h1>Vue + Socket.IO Test 2</h1>
</template>
