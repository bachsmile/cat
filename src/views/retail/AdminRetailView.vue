<template>
  <div class="p-4 md:p-8 lg:p-12 max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-visible">
    <!-- SVG Gooey Filter -->
    <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
      <defs>
        <filter id="retail-liquid-gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <!-- Global Admin Header -->
    <CgCard type="heavy-frost" :shadow="true" class="flex flex-col lg:flex-row items-center justify-between p-8 rounded-[3.5rem] border border-white/5 gap-8">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-orange-500/30 scale-110">
          <StoreIcon class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-3xl font-black italic tracking-tighter text-white tracking-widest bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            RETAIL <span class="text-amber-400">HUB</span>
          </h2>
          <div class="flex items-center gap-3 mt-1">
            <div class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
              TRÌNH QUẢN LÝ CỬA HÀNG & KHO VẬN
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="router.push('/store')" class="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-amber-600 border border-white/10 hover:border-amber-500 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-amber-500/20 active:scale-95">
          <div class="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-all transform group-hover:rotate-12">
            <UserIcon class="w-5 h-5" />
          </div>
          <div class="text-left">
            <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-amber-100">Chuyển sang</p>
            <span class="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Giao diện khách</span>
          </div>
        </button>
      </div>
    </CgCard>

    <!-- Tab Switcher -->
    <div class="flex items-center gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/5 w-fit overflow-visible max-w-full">
      <div v-for="tab in tabs" :key="tab.id" class="relative flex flex-col items-center cursor-pointer group" @click="activeTab = tab.id">
        <div v-if="activeTab === tab.id" class="absolute inset-0 z-0 pointer-events-none" style="filter: url(#retail-liquid-gooey);">
          <div class="absolute inset-0 bg-amber-500 rounded-2xl animate-liquid-morph scale-110 opacity-40 shadow-inner shadow-white/40"></div>
        </div>
        <button class="relative z-10 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-nowrap"
          :class="activeTab === tab.id ? 'bg-amber-600 text-white shadow-xl shadow-amber-500/30' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="space-y-8">
      <template v-if="activeTab === 'overview'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CgCard v-for="stat in stats" :key="stat.label" type="grain-frost" class="p-6 rounded-3xl border border-white/5">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-white/5 rounded-2xl">
                <component :is="stat.icon" class="w-6 h-6 text-amber-400" />
              </div>
              <span class="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">+{{ stat.trend }}%</span>
            </div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">{{ stat.label }}</p>
            <h3 class="text-2xl font-black text-white italic">{{ stat.value }}</h3>
          </CgCard>
        </div>
      </template>

      <template v-else>
        <CgCard type="heavy-frost" class="p-20 text-center rounded-[3rem]">
          <LayoutGridIcon class="w-16 h-16 mx-auto mb-6 text-amber-400 opacity-30" />
          <h3 class="text-2xl font-black text-white mb-4 italic">MODULE ĐANG PHÁT TRIỂN</h3>
          <p class="text-gray-500">Chúng tôi đang hoàn thiện bộ công cụ quản lý Retail Pro.</p>
        </CgCard>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Store as StoreIcon, 
  User as UserIcon, 
  Users as UsersIcon, 
  ShoppingCart as ShoppingCartIcon,
  Boxes as BoxesIcon,
  LayoutGrid as LayoutGridIcon,
  CreditCard as CreditCardIcon
} from 'lucide-vue-next';
import { CgCard } from 'glass-studio-ui-pro';

const router = useRouter();
const activeTab = ref('overview');

const tabs = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'pos', label: 'Bán hàng (POS)' },
  { id: 'products', label: 'Sản phẩm' },
  { id: 'inventory', label: 'Kho hàng' },
  { id: 'customers', label: 'Khách hàng' },
  { id: 'revenue', label: 'Báo cáo' },
];

const stats = [
  { label: 'Doanh thu ngày', value: '25.8M', icon: CreditCardIcon, trend: 5.4 },
  { label: 'Đơn hàng mới', value: '84', icon: ShoppingCartIcon, trend: 10.2 },
  { label: 'Sản phẩm sắp hết', value: '12', icon: BoxesIcon, trend: -2.1 },
  { label: 'Khách hàng mới', value: '15', icon: UsersIcon, trend: 8.5 },
];
</script>

<style scoped>
@keyframes liquid-morph {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
  67% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}
.animate-liquid-morph {
  animation: liquid-morph 8s ease-in-out infinite;
}
</style>
