<template>
  <div class="container">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label>Email</label>
        <input type="email" v-model.trim="form.email" required />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" v-model="form.password" required />
      </div>

      <div class="row">
        <button :disabled="loading">{{ loading ? "Logging in..." : "Login" }}</button>
        <router-link to="/register" class="ghost">Create account</router-link>
      </div>

      <p v-if="error" style="color:#ff7b7b">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { loginApi } from "../api/auth";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();
const loading = ref(false);
const error = ref("");

const form = reactive({ email: "", password: "" });

const onSubmit = async () => {
  error.value = "";
  loading.value = true;
  try {
    const { data } = await loginApi(form);
    store.setUser(data.user, data.token);
    router.push("/chat");
  } catch (e) {
    error.value = e?.response?.data?.error || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>
