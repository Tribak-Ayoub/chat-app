<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit" class="form">
      <div class="field">
        <label>Username</label>
        <input v-model.trim="form.username" required />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" v-model.trim="form.email" required />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="form.password" required minlength="6" />
      </div>

      <div class="row">
        <button :disabled="loading">{{ loading ? "Creating..." : "Create account" }}</button>
        <router-link to="/login" class="ghost">Have an account? Login</router-link>
      </div>

      <p v-if="error" style="color:#ff7b7b">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { registerApi } from "../api/auth";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();
const loading = ref(false);
const error = ref("");

const form = reactive({
  username: "",
  email: "",
  password: ""
});

const onSubmit = async () => {
  error.value = "";
  loading.value = true;
  try {
    const { data } = await registerApi(form);
    store.setUser(data.user, data.token);
    router.push("/chat");
  } catch (e) {
    error.value = e?.response?.data?.error || "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>
