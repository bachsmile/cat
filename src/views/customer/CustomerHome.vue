<template>
  <div class="min-h-screen bg-[#050508] text-white selection:bg-[#FFD700]/30 selection:text-white">
    <!-- Simple Navbar - Now Gold/Black Style -->
    <nav class="border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <TerminalIcon class="w-4 h-4 text-black" />
          </div>
          <span class="text-lg font-black italic tracking-tighter uppercase">NovaClient</span>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <a href="#" class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FFD700] transition-colors">{{ $t('commonHome') }}</a>
          <a href="#" class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FFD700] transition-colors">{{ $t('commonServices') }}</a>
          <a href="#" class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FFD700] transition-colors">{{ $t('commonSupport') }}</a>
          <a href="#" class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FFD700] transition-colors">{{ $t('commonNews') }}</a>
        </div>

        <div class="flex items-center gap-4">
          <!-- Language Switcher (Gold Accent) -->
          <div class="flex bg-white/5 rounded-lg p-1 border border-white/10 mr-2">
            <button 
              v-for="lang in (['en', 'vi'] as const)" 
              :key="lang"
              @click="setLanguage(lang)"
              class="px-2 py-1 rounded-md text-[10px] font-black uppercase transition-all"
              :class="locale === lang ? 'bg-[#FFD700] text-black shadow-lg shadow-yellow-500/20' : 'text-gray-500 hover:text-gray-300'"
            >
              {{ lang }}
            </button>
          </div>

          <button @click="logout" class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-400 flex items-center gap-2 transition-colors">
            <LogOutIcon class="w-4 h-4" />
            <span class="hidden sm:inline">{{ $t('commonLogout') }}</span>
          </button>
          <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group hover:border-[#FFD700]/30 transition-all cursor-pointer">
            <UserIcon class="w-4 h-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div class="space-y-8">
          <h1 class="text-6xl font-black italic tracking-tighter uppercase leading-[0.9] text-white">
            {{ $t('homeTitleMain') }} <br />
            <span class="bg-gradient-to-r from-[#FFD700] via-[#F0E68C] to-[#B8860B] bg-clip-text text-transparent">{{ $t('homeTitleSub') }}</span>
          </h1>
          <p class="text-gray-500 text-lg leading-relaxed font-medium">
            {{ $t('homeSubtitle') }}
          </p>
          
          <div class="space-y-6">
            <p class="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] pl-1">{{ $t('homeExploreTitle') }}</p>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <button 
                v-for="cat in categories" 
                :key="cat.name"
                @click="navigate(cat)"
                class="flex flex-col items-center gap-3 p-5 bg-[#0a0a0b] border border-white/5 rounded-3xl hover:border-[#FFD700]/40 hover:bg-[#FFD700]/5 transition-all group relative overflow-hidden active:scale-95"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
                  <component :is="cat.icon" class="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </div>
                <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors text-center">{{ $t(cat.name) }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="relative group">
          <div class="absolute inset-0 bg-[#FFD700]/10 blur-[120px] rounded-full group-hover:bg-[#FFD700]/20 transition-all"></div>
          <img :src="mascotImage" class="w-full h-auto relative z-10 animate-pulse drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style="animation-duration: 8s" />
          <!-- Decorative element -->
          <div class="absolute -top-5 -left-5 w-24 h-24 border border-[#FFD700]/10 rounded-full animate-spin-slow"></div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(feat, index) in features" :key="index" class="p-10 bg-[#0a0a0b] border border-white/5 rounded-[2.5rem] hover:border-[#FFD700]/30 transition-all group overflow-hidden relative">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 blur-3xl rounded-full"></div>
          <div class="w-14 h-14 bg-[#FFD700]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#FFD700]/10 group-hover:bg-[#FFD700] transition-all">
            <component :is="feat.icon" class="w-7 h-7 text-[#FFD700] group-hover:text-black transition-colors" />
          </div>
          <h3 class="text-2xl font-black italic uppercase tracking-tighter mb-4 text-white group-hover:text-[#FFD700] transition-colors">{{ $t('homeFeatureTitle' + (index + 1)) }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed font-medium">{{ $t('homeFeatureDesc' + (index + 1)) }}</p>
        </div>
      </div>
    </main>

    <!-- Ambient Blobs -->
    <div class="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-500/5 blur-[150px] -z-10 pointer-events-none"></div>
    <!-- Grain overlay -->
    <div class="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { setLanguage } from "../../i18n";
import mascotImage from "../../assets/images/Mascot robot-otter với tablet hologram.png";
import {
  Terminal as TerminalIcon,
  LogOut as LogOutIcon,
  User as UserIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Cpu as CpuIcon,
  Scale as ScaleIcon,
  Banknote as FinanceIcon,
  HardDrive as TechIcon,
  ShoppingBag as CommerceIcon,
  HeartPulse as HealthIcon,
  Heart as WeddingIcon,
  BookOpen as EducationIcon,
  Truck as LogisticsIcon,
} from "lucide-vue-next";

const { locale } = useI18n();
const router = useRouter();

const categories = [
  { name: "dashboardCategoriesLaw", icon: ScaleIcon, route: "/law" },
  { name: "dashboardCategoriesFinance", icon: FinanceIcon, route: "/finance" },
  { name: "dashboardCategoriesTech", icon: TechIcon, route: "/tech" },
  { name: "dashboardCategoriesService", icon: CommerceIcon, route: "/service" },
  { name: "dashboardCategoriesHealth", icon: HealthIcon, route: "/health" },
  { name: "dashboardCategoriesWedding", icon: WeddingIcon, route: "/wedding" },
  { name: "dashboardCategoriesEducation", icon: EducationIcon, route: "/education" },
  { name: "dashboardCategoriesLogistics", icon: LogisticsIcon, route: "/logistics" },
  { name: "dashboardCategoriesNpm", icon: TerminalIcon, route: "/npm" },
  { name: "dashboardCategoriesOthers", icon: CpuIcon, route: "/others" },
];

const features = [
  { icon: ZapIcon },
  { icon: ShieldIcon },
  { icon: CpuIcon },
];

const navigate = async (cat: any) => {
  if ((window as any).$pageTransition) {
    await (window as any).$pageTransition.trigger(cat.route, {
      icon: cat.icon,
      color: cat.hexColor || '#FFD700',
      label: cat.name,
    });
  } else {
    router.push(cat.route);
  }
};

const logout = () => {
  localStorage.clear();
  router.push("/");
};
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}
</style>
