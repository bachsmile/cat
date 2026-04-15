<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-[#050507] text-white overflow-x-hidden overflow-y-auto py-10"
  >
    <!-- SUNLIGHT ATMOSPHERIC BACKGROUND -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[#050507]"></div>
      <!-- Golden Mesh Gradients -->
      <div
        class="absolute top-[-10%] right-[-10%] w-[70%] h-[60%] bg-[#FFD700]/10 blur-[180px] rounded-full animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full animate-pulse-slow"
        style="animation-delay: 3s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-amber-500/5 blur-[120px] rounded-full"
      ></div>
      <div
        class="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
      ></div>
    </div>

    <!-- MASCOT FLOATING (Large Screens) -->
    <div
      class="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 z-10 animate-float opacity-80"
    >
      <img
        :src="mascotImg"
        alt="Mascot"
        class="w-[260px] drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]"
      />
      <div
        class="mt-6 p-5 rounded-[1.8rem] bg-white/5 border border-white/5 backdrop-blur-md max-w-[220px] ml-10"
      >
        <p
          class="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-relaxed italic"
        >
          Chào mừng bạn gia nhập đế chế số NovaClient!
        </p>
      </div>
    </div>

    <!-- MAIN REGISTER CARD -->
    <div
      class="relative z-10 w-[95%] max-w-2xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-8 duration-1000"
    >
      <div
        class="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-white/10 bg-[#0c0c0e]/60 backdrop-blur-3xl shadow-[0_0_100px_rgba(255,215,0,0.05)]"
      >
        <!-- TOP DECORATIVE GOLD BAR -->
        <div
          class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"
        ></div>

        <div class="p-8 md:p-14">
          <!-- Language Switcher -->
          <div class="absolute top-6 right-6 flex gap-2">
            <button
              v-for="lang in ['en', 'vi'] as const"
              :key="lang"
              @click="changeLanguage(lang)"
              class="px-3 py-1.5 rounded-xl border border-white/10 flex items-center justify-center font-black text-[9px] transition-all uppercase tracking-widest"
              :class="
                currentLocale === lang
                  ? 'bg-[#FFD700] text-black border-[#FFD700]'
                  : 'bg-white/5 text-gray-500'
              "
            >
              {{ lang }}
            </button>
          </div>

          <!-- Header -->
          <div class="text-center mb-10 space-y-3">
            <div
              class="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-orange-500 text-black rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,215,0,0.25)] rotate-3 hover:rotate-0 transition-transform mb-6"
            >
              <UserPlusIcon class="w-7 h-7" />
            </div>
            <h1
              class="text-3xl font-black italic tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(255,215,0,0.15)]"
            >
              {{ $t("authRegisterToAccount") }}
            </h1>
            <p
              class="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]"
            >
              {{ $t("authJoinNova") }}
            </p>
          </div>

          <!-- FORM -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Username -->
              <div class="space-y-3 group">
                <label
                  class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-1"
                  >{{ $t("authUsername") }}</label
                >
                <div class="relative">
                  <div
                    class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors"
                  >
                    <IdCardIcon class="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    v-model="form.username"
                    required
                    placeholder="USERNAME"
                    class="w-full bg-white/5 border border-white/10 rounded-2x2 py-5 pl-14 pr-5 outline-none focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/5 transition-all placeholder:text-gray-700 text-white font-bold tracking-widest text-sm"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-3 group">
                <label
                  class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-1"
                  >{{ $t("authEmailOnly") }}</label
                >
                <div class="relative">
                  <div
                    class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors"
                  >
                    <MailIcon class="w-6 h-6" />
                  </div>
                  <input
                    type="text"
                    v-model="form.email"
                    placeholder="EMAIL OR USERNAME"
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/5 transition-all placeholder:text-gray-700 text-white font-bold tracking-widest text-sm"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Password -->
              <div class="space-y-3 group">
                <label
                  class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-1"
                  >{{ $t("authPassword") }}</label
                >
                <div class="relative">
                  <div
                    class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors"
                  >
                    <LockIcon class="w-6 h-6" />
                  </div>
                  <input
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="••••••••"
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/5 transition-all placeholder:text-gray-700 text-white font-bold"
                  />
                </div>
              </div>

              <!-- Confirm Password -->
              <div class="space-y-3 group">
                <label
                  class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-1"
                  >{{ $t("authPasswordConfirm") }}</label
                >
                <div class="relative">
                  <div
                    class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors"
                  >
                    <ShieldCheckIcon class="w-6 h-6" />
                  </div>
                  <input
                    type="password"
                    v-model="confirmPassword"
                    required
                    placeholder="••••••••"
                    class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/5 transition-all placeholder:text-gray-700 text-white font-bold"
                  />
                </div>
              </div>
            </div>

            <!-- SUPER ADMIN VERIFICATION CODE (Golden Style) -->
            <div class="space-y-4 pt-4">
              <div
                class="p-8 rounded-[2.5rem] bg-[#FFD700]/5 border border-[#FFD700]/10 space-y-5"
              >
                <label
                  class="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.4em] ml-1 italic"
                  >Mã xác thực SUPER ADMIN (Tùy chọn)</label
                >
                <div class="flex gap-4">
                  <input
                    type="text"
                    v-model="adminCode"
                    placeholder="SUPREME KEY"
                    :disabled="isAdminVerified"
                    class="flex-1 bg-white/5 border border-white/10 rounded-2xl py-5 px-6 outline-none focus:border-[#FFD700]/50 transition-all text-sm font-black tracking-[0.5em] disabled:opacity-30 disabled:grayscale text-[#FFD700] placeholder:text-gray-800"
                  />
                  <button
                    v-if="!isAdminVerified"
                    type="button"
                    @click="verifyAdminCode"
                    class="px-10 bg-[#FFD700] hover:bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,215,0,0.2)]"
                  >
                    Xác thực
                  </button>
                  <div
                    v-else
                    class="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center text-black animate-in zoom-in duration-500 shadow-[0_0_40px_rgba(255,215,0,0.4)]"
                  >
                    <CheckCircleIcon class="w-8 h-8" />
                  </div>
                </div>
                <div
                  v-if="isAdminVerified"
                  class="flex items-center gap-3 animate-in fade-in duration-1000"
                >
                  <div
                    class="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_8px_#FFD700]"
                  ></div>
                  <p
                    class="text-[10px] text-[#FFD700] font-black uppercase tracking-[0.3em] italic"
                  >
                    ĐÃ KÍCH HOẠT QUYỀN SUPER ADMIN CẤP CAO
                  </p>
                </div>
              </div>
            </div>

            <!-- FEEDBACK MESSAGES -->
            <div
              v-if="error"
              class="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3 items-center animate-in zoom-in duration-300"
            >
              <AlertCircleIcon class="w-5 h-5 text-red-500" />
              <p class="text-xs font-bold text-red-500 italic">{{ error }}</p>
            </div>
            <div
              v-if="success"
              class="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex gap-3 items-center animate-in zoom-in duration-300"
            >
              <CheckCircleIcon class="w-5 h-5 text-emerald-500" />
              <p class="text-xs font-bold text-emerald-500 italic">
                {{ success }}
              </p>
            </div>

            <!-- SUBMIT BUTTON -->
            <div class="pt-6">
              <button
                type="submit"
                :disabled="loading"
                class="w-full group relative bg-white text-black font-black uppercase tracking-[0.3em] py-7 rounded-[2rem] shadow-2xl hover:bg-[#FFD700] transition-all duration-500 active:scale-[0.98] disabled:opacity-50 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-[#FFD700] translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                ></div>
                <span
                  class="relative z-10 flex items-center justify-center gap-3 text-xs italic"
                >
                  {{ loading ? $t("authCreatingAccount") : $t("authRegister") }}
                  <ArrowRightIcon
                    v-if="!loading"
                    class="w-5 h-5 group-hover:translate-x-2 transition-transform"
                  />
                </span>
              </button>
            </div>

            <div class="text-center pt-10 border-t border-white/5">
              <p
                class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]"
              >
                {{ $t("authAlreadyHaveAccount") }}
                <router-link
                  to="/"
                  class="text-white hover:text-[#FFD700] transition-colors ml-2 border-b border-white hover:border-[#FFD700]"
                  >{{ $t("authLogin") }}</router-link
                >
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- BOTTOM COPYRIGHT -->
    <div
      class="absolute bottom-8 left-0 right-0 z-10 text-center opacity-20 select-none"
    >
      <p class="text-[10px] font-black uppercase tracking-[1em] text-[#FFD700]">
        SUNLIGHT ADMIN PORTAL • Est. 2026
      </p>
    </div>
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
  CheckCircle as CheckCircleIcon,
  ArrowRight as ArrowRightIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-vue-next";
import { authApi } from "../../api/auth";
import mascotImg from "@/assets/images/Mascot robot-otter với tablet hologram.png";

const router = useRouter();
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const changeLanguage = (lang: "en" | "vi") => {
  setLanguage(lang);
};

const loading = ref(false);
const error = ref("");
const success = ref("");
const confirmPassword = ref("");
const adminCode = ref("");
const isAdminVerified = ref(false);

const form = reactive({
  email: "",
  username: "",
  password: "",
});

const verifyAdminCode = async () => {
  if (!adminCode.value) return;

  loading.value = true;
  error.value = "";

  try {
    const result = await authApi.verifyAdminCode(adminCode.value);
    if (
      (result.status === 200 || result.status === 201) &&
      result.data?.verified
    ) {
      isAdminVerified.value = true;
      success.value = "Mã xác thực Admin hợp lệ!";
    } else {
      error.value = "Mã xác thực Admin không chính xác";
    }
  } catch (err) {
    error.value = "Lỗi kết nối khi xác thực mã";
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  if (form.password !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    let finalEmail = form.email.trim();
    if (!finalEmail) {
      finalEmail = `${form.username.trim()}@gmail.com`;
    } else if (!finalEmail.includes('@')) {
      finalEmail = `${finalEmail}@gmail.com`;
    }

    const payload = {
      ...form,
      email: finalEmail,
      adminCode: isAdminVerified.value ? adminCode.value : undefined,
    };

    const result = await authApi.register(payload);
    if (result.status === 200 || result.status === 201) {
      success.value = "Registration successful! Redirecting to login...";
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

<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animate-in {
  animation-fill-mode: forwards;
}

.fade-in {
  animation: fade-in 1.2s ease-out forwards;
}

.slide-in-from-bottom-8 {
  animation: slide-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input:focus {
  background-color: rgba(255, 215, 0, 0.05);
}
</style>
