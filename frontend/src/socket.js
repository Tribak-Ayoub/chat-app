import { io } from "socket.io-client";
import { useUserStore } from "./stores/user";

// Create a single socket instance AFTER Pinia exists (call from a component or after app init)
let socket;

export function getSocket() {
  if (socket) return socket;

  const store = useUserStore();

  socket = io(import.meta.env.VITE_WS_URL, {
    transports: ["websocket"], // prefer ws
    auth: { token: store.token || "" }, // send JWT
    autoConnect: !!store.token, // connect only if logged in
  });

  // Re-authenticate when token changes (simple approach)
  const unsub = store.$subscribe((_mutation, state) => {
    if (!socket) return;
    if (state.token) {
      if (!socket.connected) {
        socket.auth = { token: state.token };
        socket.connect();
      } else {
        // refresh auth on live socket
        socket.auth = { token: state.token };
      }
    } else {
      socket.disconnect();
    }
  });

  // Optionally expose unsubscribe for teardown in SPA navigations
  socket._unsubStore = unsub;

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
}
