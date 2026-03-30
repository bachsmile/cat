<template>
  <div class="min-h-screen bg-[#050508] text-white font-['Inter',_sans-serif]">
    <!-- Simple Navbar for Customers -->
    <nav class="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TerminalIcon class="w-4 h-4 text-white" />
          </div>
          <span class="text-lg font-bold">NovaClient</span>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <a v-for="item in navItems" :key="item" href="#" class="text-sm text-gray-400 hover:text-white transition-colors">{{ item }}</a>
        </div>

        <div class="flex items-center gap-4">
          <button @click="logout" class="text-sm text-gray-400 hover:text-red-400 flex items-center gap-2">
            <LogOutIcon class="w-4 h-4" />
            <span>Thoát</span>
          </button>
          <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <UserIcon class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 class="text-5xl font-extrabold leading-tight mb-6">
            Nền tảng dịch vụ <br />
            <span class="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Kỹ thuật số Thế hệ mới</span>
          </h1>
          <p class="text-gray-400 text-lg mb-8 leading-relaxed">
            Trải nghiệm các module dành cho khách hàng với giao diện hiện đại, tốc độ vượt trội và hỗ trợ chuyên nghiệp 24/7.
          </p>
          
          <div class="space-y-4">
            <p class="text-sm font-bold text-gray-500 uppercase tracking-widest pl-1">Bạn muốn tìm hiểu lĩnh vực nào?</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <button 
                v-for="cat in categories" 
                :key="cat.name"
                @click="navigate(cat)"
                class="flex flex-col items-center gap-3 p-4 bg-[#0a0a0f] border border-white/5 rounded-2xl hover:border-purple-500/50 hover:bg-white/5 transition-all group relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <component :is="cat.icon" class="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <span class="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{{ cat.name }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full"></div>
          <img :src="dogImage" class="w-full h-auto relative z-10 animate-pulse" style="animation-duration: 8s" />
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="feat in features" :key="feat.title" class="p-8 bg-[#0a0a0f] border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all group">
          <div class="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <component :is="feat.icon" class="w-6 h-6 text-purple-400" />
          </div>
          <h3 class="text-xl font-bold mb-3">{{ feat.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ feat.desc }}</p>
        </div>
      </div>
    </main>

    <!-- Footer Blobs -->
    <div class="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-600/5 blur-[150px] -z-10 pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import dogImage from "../../assets/images/dog.png";
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
} from "lucide-vue-next";

const router = useRouter();
const navItems = ["Trang chủ", "Dịch vụ", "Hỗ trợ", "Tin tức"];

const categories = [
  { name: "Luật pháp", icon: ScaleIcon, route: "/law" },
  { name: "Tài chính", icon: FinanceIcon, route: "/finance" },
  { name: "Công nghệ", icon: TechIcon, route: "/tech" },
  { name: "Dịch vụ", icon: CommerceIcon, route: "/service" },
  { name: "Y tế", icon: HealthIcon, route: "/health" },
  { name: "Khác", icon: TerminalIcon, route: "/others" },
];

const features = [
  {
    title: "Hiệu năng Cao",
    desc: "Hệ thống được tối ưu hóa cho tốc độ xử lý nhanh nhất, đảm bảo trải nghiệm mượt mà.",
    icon: ZapIcon,
  },
  {
    title: "Bảo mật Tuyệt đối",
    desc: "Dữ liệu của khách hàng được mã hóa và bảo vệ bởi các tiêu chuẩn an ninh hàng đầu.",
    icon: ShieldIcon,
  },
  {
    title: "Trí tuệ Nhân tạo",
    desc: "Tích hợp AI để hỗ trợ giải đáp thắc mắc và xử lý hồ sơ tự động.",
    icon: CpuIcon,
  },
];

const navigate = async (cat: any) => {
  if ((window as any).$pageTransition) {
     await (window as any).$pageTransition.trigger(cat.route, {
       icon: cat.icon,
       color: cat.hexColor,
       label: cat.name
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
