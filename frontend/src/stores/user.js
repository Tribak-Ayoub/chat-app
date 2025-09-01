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
    async fetchUser() {
      if (!this.token) return;
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        this.user = data.user;
      } catch (err) {
        console.error("fetchUser error:", err);
        this.logout(); // only logout if truly unauthorized
      }
    },
  },
});
