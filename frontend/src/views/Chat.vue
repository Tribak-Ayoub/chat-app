<template>
    <div class="container">
        <div class="row" style="justify-content:space-between">
            <h2>Direct Messages</h2>
            <div class="row">
                <span v-if="user">@{{ user.username }}</span>
                <button class="ghost" @click="logout">Logout</button>
            </div>
        </div>

        <div
            style="border:1px solid #253157; border-radius:12px; padding:12px; height:360px; overflow:auto; background:#0f152b; margin-bottom:12px;">
            <div v-for="m in messages" :key="m.id" :style="bubbleStyle(m)">
                <div style="opacity:.7; font-size:12px; margin-bottom:4px;">
                    {{ m.senderId === user?.id ? "You" : m.senderId }}
                </div>
                <div>{{ m.text }}</div>
            </div>
            <div v-if="messages.length === 0" style="opacity:.6">No messages yet.</div>
        </div>

        <div class="row">
            <input v-model="toId" placeholder="Receiver userId (UUID)" style="flex:1" />
            <input v-model="text" placeholder="Type a message..." style="flex:3" @keyup.enter="send" />
            <button @click="send">Send</button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import { getSocket } from "../socket";

const store = useUserStore();
const user = computed(() => store.user);

const messages = ref([]);
const text = ref("");
const toId = ref(""); // set this to the other user's id to test

let socket;

const bubbleStyle = (m) => ({
    background: m.senderId === user.value?.id ? "#17305f" : "#15203f",
    border: "1px solid #253157",
    borderRadius: "12px",
    padding: "10px 12px",
    margin: "6px 0",
    maxWidth: "80%",
    marginLeft: m.senderId === user.value?.id ? "auto" : "0"
});

const send = () => {
    if (!text.value || !toId.value) return;
    socket.emit("private_message", { content: text.value, to: toId.value });
    // optimistically add to list (server also returns via recipient; for sender we add locally)
    messages.value.push({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        text: text.value,
        senderId: user.value.id,
        receiverId: toId.value
    });
    text.value = "";
};

const onPrivateMessage = (msg) => {
    messages.value.push(msg);
};

onMounted(() => {
    socket = getSocket();
    if (!socket) return;
    socket.on("private_message", onPrivateMessage);
});

onUnmounted(() => {
    socket?.off("private_message", onPrivateMessage);
});

const logout = () => {
    store.logout();
    socket?.disconnect();
    location.href = "/login";
};
</script>
