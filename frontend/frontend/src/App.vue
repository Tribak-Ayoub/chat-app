<script setup>
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to backend:", socket.id);
});
</script>

<template>
  <h1>Vue + Socket.IO Test</h1>
</template>
