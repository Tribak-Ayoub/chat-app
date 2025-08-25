import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    // Save user info and token
    setUser(user, token) {
      this.user = user;
      this.token = token;
      localStorage.setItem("token", token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
