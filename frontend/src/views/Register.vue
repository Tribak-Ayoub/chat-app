<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div
          class="mx-auto h-16 w-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
          <UserPlus class="h-8 w-8 text-white" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Join us today and get started
        </p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="h-5 w-5 text-gray-400" />
              </div>
              <input id="username" v-model="form.username" type="text" autocomplete="username" required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your username" />
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input id="email" v-model="form.email" type="email" autocomplete="email" required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your email" />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
                minlength="6"
                class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Create a password" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <EyeOff v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                <Eye v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex">
              <AlertCircle class="h-5 w-5 text-red-400" />
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Loader2 class="h-5 w-5 text-white animate-spin" />
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Already have an account?</span>
          </div>
        </div>

        <!-- Login Link -->
        <router-link to="/login"
          class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
          Sign in instead
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { registerApi } from "../api/auth";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2
} from 'lucide-vue-next'

const router = useRouter()
const store = useUserStore()
const loading = ref(false)
const error = ref("")

const form = reactive({
  username: "",
  email: "",
  password: ""
})

const showPassword = ref(false)

const onSubmit = async () => {
  error.value = ""
  loading.value = true
  try {
    const { data } = await registerApi(form)
    store.setUser(data.user, data.token)
    router.push("/chat")
  } catch (e) {
    error.value = e?.response?.data?.error || "Registration failed"
  } finally {
    loading.value = false
  }
}
</script>
