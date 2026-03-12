<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white overflow-hidden relative font-['Inter',_sans-serif]"
  >
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/login-bg.png"
        alt="background"
        class="w-full h-full object-cover opacity-60 scale-105"
      />
      <div
        class="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/90"
      ></div>
    </div>

    <!-- Login Card -->
    <div
      class="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-purple-500/20"
    >
      <div class="mb-10 flex flex-col items-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300"
        >
          <TerminalIcon class="w-8 h-8 text-white" />
        </div>
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-[length:200%_auto] bg-clip-text text-transparent"
        >
          Welcome Back
        </h1>
        <p class="text-gray-400 mt-2">Sign in to continue your journey</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label
            class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1"
            >Email / Username</label
          >
          <div class="relative group">
            <UserIcon
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
            />
            <input
              type="text"
              v-model="email"
              placeholder="admin@example.com"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 text-white"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1"
            >Password</label
          >
          <div class="relative group">
            <LockIcon
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
            />
            <input
              type="password"
              v-model="password"
              placeholder="••••••••"
              class="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 text-white"
            />
          </div>
        </div>

        <div
          v-if="error"
          class="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-pulse"
        >
          {{ error }}
        </div>

        <div class="flex items-center justify-between text-sm py-2">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-0 focus:ring-offset-0 transition-all"
            />
            <span
              class="text-gray-400 group-hover:text-gray-300 transition-colors"
              >Remember me</span
            >
          </label>
          <a
            href="#"
            class="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >Forgot Password?</a
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            type="submit"
            :disabled="loading"
            class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/40 transform transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {{ loading ? "Signing In..." : "Sign In" }}
          </button>

          <button
            @click="handleTrial"
            type="button"
            :disabled="loading"
            class="bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <ZapIcon class="w-4 h-4 text-yellow-400" />
            Trial
          </button>
        </div>

        <div class="text-center mt-6">
          <p class="text-gray-400 text-sm">
            Don't have an account?
            <router-link
              to="/register"
              class="text-purple-400 hover:text-purple-300 font-bold ml-1 transition-colors"
              >Create Account</router-link
            >
          </p>
        </div>
      </form>
    </div>

    <!-- Floating Blobs for Atmosphere -->
    <div
      class="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse"
    ></div>
    <div
      class="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse"
      style="animation-delay: 1s"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  User as UserIcon,
  Lock as LockIcon,
  Terminal as TerminalIcon,
  Zap as ZapIcon,
} from "lucide-vue-next";
import { authApi } from "../../api/auth";

const router = useRouter();
const email = ref("vikingshome86@gmail.com");
const password = ref("123123");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  const role = email.value.includes("admin") ? "admin" : "user";
  const result = await authApi.login({
    email: email.value,
    role: role,
  });

  if (result.status === 200 || result.status === 201) {
    saveAuth(result.data);
    const userRole = result.data.user.role;
    if (["admin", "moderator", "manager", "lawyer"].includes(userRole)) {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  } else {
    error.value = result.message || "Login failed";
  }
  loading.value = false;
};

const handleTrial = async () => {
  loading.value = true;
  error.value = "";

  const result = await authApi.trial();

  if (result.status === 200 || result.status === 201) {
    saveAuth(result.data);
    const userRole = result.data.user.role;
    if (["admin", "moderator", "lawyer"].includes(userRole)) {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  } else {
    error.value = result.message || "Trial failed";
  }
  loading.value = false;
};

const saveAuth = (data: any) => {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

input:focus {
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
}
</style>
