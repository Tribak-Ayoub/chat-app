import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Chat from "../views/Chat.vue";

const routes = [
  { path: "/", redirect: "/chat" },
  { path: "/login", component: Login, meta: { guest: true } },
  { path: "/register", component: Register, meta: { guest: true } },
  { path: "/chat", component: Chat, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// simple guard
router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.token) {
    return "/login";
  }
  if (to.meta.guest && userStore.token) {
    return "/chat";
  }
});

export default router;
