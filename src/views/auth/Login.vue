<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-[#050507] text-white overflow-x-hidden overflow-y-auto py-10">
    <!-- SUNLIGHT ATMOSPHERIC BACKGROUND -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[#050507]"></div>
      <!-- Golden Mesh Gradients -->
      <div class="absolute top-[-10%] left-[20%] w-[70%] h-[60%] bg-[#FFD700]/10 blur-[180px] rounded-full animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full animate-pulse-slow" style="animation-delay: 2s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full"></div>
      
      <!-- Static noise overlay for texture -->
      <div class="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>

    <!-- MAIN LOGIN CONTAINER -->
    <div class="relative z-10 w-[95%] max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] lg:rounded-[3rem] border border-white/10 bg-[#0c0c0e]/60 backdrop-blur-3xl shadow-[0_0_80px_rgba(255,215,0,0.1)]">
      
      <!-- LEFT SIDE: Branding & Features -->
      <div class="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-[#FFD700]/5 to-orange-500/5 border-r border-white/5">
        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-10">
            <div class="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-orange-500 text-black rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.3)]">
              <SunIcon class="w-6 h-6" />
            </div>
            <span class="text-xl font-black italic tracking-tighter uppercase tracking-[0.3em] text-[#FFD700]">NOVA ADMIN</span>
          </div>
          
          <h2 class="text-5xl font-black italic tracking-tighter leading-[0.9] mb-6">
            HÀNH TRÌNH <br/>
            <span class="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">ÁNH SÁNG</span> <br/>
            KHỞI ĐẦU TẠI ĐÂY
          </h2>
          <p class="text-gray-400 text-sm font-medium max-w-sm leading-relaxed">
            Hệ quản trị tối thượng với hiệu năng vượt trội và giao diện tinh hoa.
          </p>
        </div>

        <div class="relative z-10 flex-1 flex flex-col justify-center items-center py-6">
           <img :src="mascotImg" alt="Mascot" class="w-full max-w-[280px] drop-shadow-[0_20px_50px_rgba(255,215,0,0.2)] animate-float" />
        </div>

        <div class="relative z-10">
          <div class="p-5 rounded-[1.8rem] bg-white/5 border border-white/5 backdrop-blur-md">
            <p class="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.3em] mb-1 italic">Hệ thống AI thông minh</p>
            <p class="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Đang vận hành toàn bộ giải pháp kỹ thuật số của bạn</p>
          </div>
        </div>

        <!-- Decorative Sunlight Blob -->
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-[100px]"></div>
      </div>

      <!-- RIGHT SIDE: Login Form -->
      <div class="p-8 lg:px-16 lg:py-12 flex flex-col justify-center relative">
        <!-- Language Switcher -->
        <div class="absolute top-6 right-6 lg:top-10 lg:right-10 flex gap-2">
           <button 
             v-for="lang in (['en', 'vi'] as const)" 
             :key="lang"
             @click="changeLanguage(lang)"
             class="px-4 py-2 rounded-xl border border-white/10 flex items-center justify-center font-black text-[10px] transition-all uppercase tracking-widest"
             :class="currentLocale === lang ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white'"
           >
             {{ lang }}
           </button>
        </div>

        <div class="w-full max-w-sm mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div class="space-y-3 text-center lg:text-left">
            <h1 class="text-4xl font-black tracking-tighter italic uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{{ $t("authLogin") }}</h1>
            <p class="text-gray-500 text-xs font-black uppercase tracking-[0.3em]">{{ $t("authLoginToAccount") }}</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Input -->
            <div class="space-y-3 group">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-1">{{ $t("authEmail") }}</label>
              <div class="relative">
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors">
                  <UserIcon class="w-6 h-6" />
                </div>
                <input
                  type="text"
                  v-model="email"
                  placeholder="ID / EMAIL"
                  required
                  class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/5 transition-all placeholder:text-gray-700 text-white font-bold tracking-widest text-sm"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-3 group">
              <div class="flex items-center justify-between px-1">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{{ $t("authPassword") }}</label>
                <a href="#" class="text-[10px] font-black text-[#FFD700] uppercase tracking-widest hover:text-orange-400 transition-colors">{{ $t("authForgotPassword") }}</a>
              </div>
              <div class="relative">
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FFD700] transition-colors">
                  <LockIcon class="w-6 h-6" />
                </div>
                <input
                  type="password"
                  v-model="password"
                  placeholder="••••••••"
                  required
                  class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-[#FFD700]/50 focus:ring-4 focus:ring-[#FFD700]/5 transition-all placeholder:text-gray-700 text-white font-bold tracking-widest"
                />
              </div>
            </div>

            <!-- Error State -->
            <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3 items-center animate-in zoom-in duration-300">
               <AlertCircleIcon class="w-5 h-5 text-red-500" />
               <p class="text-xs font-bold text-red-500 italic">{{ error }}</p>
            </div>

            <div class="space-y-4 pt-6">
              <!-- Login Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full group relative bg-[#FFD700] text-black font-black uppercase tracking-[0.3em] py-6 rounded-2xl shadow-[0_20px_40px_rgba(255,215,0,0.15)] hover:bg-white transition-all duration-500 active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <div class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span class="relative z-10 flex items-center justify-center gap-3 text-xs italic">
                  {{ loading ? $t("authLoggingIn") : $t("authLogin") }}
                  <ArrowRightIcon v-if="!loading" class="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              <!-- Trial Button -->
              <button
                @click="handleTrial"
                type="button"
                :disabled="loading"
                class="w-full bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 rounded-2xl border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ZapIcon class="w-4 h-4 text-[#FFD700] fill-[#FFD700]/20" />
                {{ $t("authTrial") }}
              </button>
            </div>

            <!-- Footer -->
            <div class="text-center pt-10 border-t border-white/5">
              <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                {{ $t("authDontHaveAccount") }}
                <router-link
                  to="/register"
                  class="text-white hover:text-[#FFD700] transition-colors ml-2 border-b border-white hover:border-[#FFD700]"
                >{{ $t("authRegister") }}</router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- BOTTOM COPYRIGHT -->
    <div class="absolute bottom-10 left-0 right-0 z-10 text-center opacity-20 select-none">
       <p class="text-[10px] font-black uppercase tracking-[1em] text-[#FFD700]">SUNLIGHT ADMIN ECOSYSTEM • Est. 2026</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { setLanguage } from "../../i18n";
import {
  User as UserIcon,
  Lock as LockIcon,
  Sun as SunIcon,
  Zap as ZapIcon,
  ArrowRight as ArrowRightIcon,
  AlertCircle as AlertCircleIcon
} from "lucide-vue-next";
import { authApi } from "@/api/auth";
import mascotImg from "@/assets/images/Mascot robot-otter với tablet hologram.png";

const router = useRouter();
const { locale } = useI18n();

const currentLocale = computed(() => locale.value);
const changeLanguage = (lang: "en" | "vi") => {
  setLanguage(lang);
};
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  let finalEmail = email.value.trim();
  if (finalEmail && !finalEmail.includes('@')) {
    finalEmail = `${finalEmail}@gmail.com`;
  }

  const role = finalEmail.includes("admin") ? "admin" : "user";
  const result = await authApi.login({
    email: finalEmail,
    role: role,
  });

  if (result.status === 200 || result.status === 201) {
    saveAuth(result.data);

    if (result.data.user.language) {
      setLanguage(result.data.user.language);
    }

    const userRole = result.data.user.role || "";
    if (["super_admin", "admin", "moderator", "manager", "lawyer"].includes(userRole.toLowerCase())) {
      if (userRole.toLowerCase() === "super_admin") {
        router.push("/sp-ad");
      } else {
        router.push("/ad");
      }
    } else {
      router.push("/home");
    }
  } else {
    error.value = result.message || "Invalid credentials.";
  }
  loading.value = false;
};

const handleTrial = async () => {
  router.push("/welcome-trial");
};

const saveAuth = (data: any) => {
  localStorage.setItem("token", data.access_token);
  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
  localStorage.setItem("user", JSON.stringify(data.user));
};
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.1); }
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

.slide-in-from-bottom-6 {
  animation: slide-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

input:focus {
  background-color: rgba(255, 215, 0, 0.05);
}
</style>
