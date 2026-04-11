<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white overflow-hidden relative "
  >
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/login-bg.png"
        alt="background"
        class="w-full h-full object-cover opacity-40 scale-110 blur-sm"
      />
      <div
        class="absolute inset-0 bg-gradient-to-tr from-[#0a0a0f]/90 via-transparent to-[#0a0a0f]/90"
      ></div>
    </div>

    <!-- Language Switcher -->
    <div class="absolute top-8 right-8 z-20 flex gap-2">
      <button 
        v-for="lang in (['en', 'vi'] as const)" 
        :key="lang"
        @click="changeLanguage(lang)"
        class="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center font-bold text-xs transition-all uppercase"
        :class="currentLocale === lang ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-500 hover:bg-white/10'"
      >
        {{ lang }}
      </button>
    </div>

    <!-- Register Card -->
    <div
      class="relative z-10 w-full max-w-lg p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20"
    >
      <div class="mb-8 flex flex-col items-center">
        <div
          class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-12 hover:rotate-0 transition-transform duration-300"
        >
          <UserPlusIcon class="w-7 h-7 text-white" />
        </div>
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          {{ $t('authRegisterToAccount') }}
        </h1>
        <p class="text-gray-400 mt-1">{{ $t('authJoinNova') }}</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-2">
            <label
              class="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1"
              >{{ $t('authUsername') }}</label
            >
            <div class="relative group">
              <IdCardIcon
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
              />
              <input
                type="text"
                v-model="form.username"
                placeholder="username"
                class="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-600 text-white"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label
              class="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1"
              >{{ $t('authEmail') }}</label
            >
            <div class="relative group">
              <MailIcon
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
              />
              <input
                type="email"
                v-model="form.email"
                placeholder="name@company.com"
                required
                class="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1"
            >{{ $t('authPassword') }}</label
          >
          <div class="relative group">
            <LockIcon
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
            />
            <input
              type="password"
              v-model="form.password"
              placeholder="••••••••"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-600 text-white"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label
            class="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1"
            >{{ $t('authPasswordConfirm') }}</label
          >
          <div class="relative group">
            <ShieldCheckIcon
              class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
            />
            <input
              type="password"
              v-model="confirmPassword"
              placeholder="••••••••"
              required
              class="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-600 text-white"
            />
          </div>
        </div>

        <div
          v-if="error"
          class="text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20"
        >
          {{ error }}
        </div>
        <div
          v-if="success"
          class="text-green-400 text-xs bg-green-400/10 p-3 rounded-lg border border-green-400/20"
        >
          {{ success }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-900/40 transform transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
        >
          {{ loading ? $t('authCreatingAccount') : $t('authRegister') }}
        </button>

        <div class="text-center mt-6">
          <p class="text-gray-500 text-sm">
            {{ $t('authAlreadyHaveAccount') }}
            <router-link
              to="/"
              class="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors"
              >{{ $t('authLogin') }}</router-link
            >
          </p>
        </div>
      </form>
    </div>

    <!-- Decor Blobs -->
    <div
      class="absolute top-1/4 -right-24 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full animate-pulse"
    ></div>
    <div
      class="absolute bottom-1/4 -left-24 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full animate-pulse"
      style="animation-delay: 1.5s"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { setLanguage } from "../../i18n";
import {
  UserPlus as UserPlusIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  Contact as IdCardIcon,
  ShieldCheck as ShieldCheckIcon,
} from "lucide-vue-next";
import { authApi } from "../../api/auth";

const router = useRouter();
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const changeLanguage = (lang: 'en' | 'vi') => {
  setLanguage(lang);
};

const loading = ref(false);
const error = ref("");
const success = ref("");
const confirmPassword = ref("");

const form = reactive({
  email: "",
  username: "",
  password: "",
});

const handleRegister = async () => {
  if (form.password !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const result = await authApi.register(form);
    if (result.status === 200 || result.status === 201) {
      success.value = "Registration successful! Redirecting...";
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      error.value = result.message || "Registration failed";
    }
  } catch (err: any) {
    error.value = "An unexpected error occurred";
  } finally {
    loading.value = false;
  }
};
</script>
