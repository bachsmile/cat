<template>
  <div class="p-4 md:p-8 lg:p-12 max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-visible">
    <!-- SVG Gooey Filter -->
    <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
      <defs>
        <filter id="wedding-liquid-gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <!-- Global Admin Header -->
    <CgCard type="heavy-frost" :shadow="true" class="flex flex-col lg:flex-row items-center justify-between p-8 rounded-[3.5rem] border border-white/5 gap-8">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-rose-500/30 scale-110">
          <HeartIcon class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-3xl font-black italic tracking-tighter text-white tracking-widest bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            WEDDING <span class="text-pink-400">MANAGEMENT</span>
          </h2>
          <div class="flex items-center gap-3 mt-1">
            <div class="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
              TRÌNH QUẢN LÝ DỊCH VỤ CƯỚI HỎI
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="router.push('/wedding')" class="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-pink-600 border border-white/10 hover:border-pink-500 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-pink-500/20 active:scale-95">
          <div class="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-all transform group-hover:rotate-12">
            <UserIcon class="w-5 h-5" />
          </div>
          <div class="text-left">
            <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-pink-100">Chuyển sang</p>
            <span class="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Giao diện khách</span>
          </div>
        </button>
      </div>
    </CgCard>

    <!-- Tab Switcher -->
    <div class="flex items-center gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/5 w-fit overflow-visible max-w-full">
      <div v-for="tab in tabs" :key="tab.id" class="relative flex flex-col items-center cursor-pointer group" @click="activeTab = tab.id">
        <div v-if="activeTab === tab.id" class="absolute inset-0 z-0 pointer-events-none" style="filter: url(#wedding-liquid-gooey);">
          <div class="absolute inset-0 bg-pink-500 rounded-2xl animate-liquid-morph scale-110 opacity-40 shadow-inner shadow-white/40"></div>
        </div>
        <button class="relative z-10 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-nowrap"
          :class="activeTab === tab.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-500/30' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="space-y-8">
      <template v-if="activeTab === 'overview'">
        <!-- Hero Section with Domain Title -->
        <div class="mb-10">
           <h1 class="text-4xl font-black text-white italic tracking-tighter mb-2">QUẢN LÝ WEDDING</h1>
           <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.4em]">Toàn cảnh hệ thống dịch vụ cưới hỏi</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <!-- LEFT: Dedicated Vertical Menu (The "Trang Riêng" request) -->
           <div class="lg:col-span-4 space-y-4">
              <CgCard v-for="item in MENU_ITEMS" :key="item.id" type="grain-frost" 
                 class="p-6 rounded-[1.8rem] border border-white/5 hover:border-pink-500/30 cursor-pointer group transition-all duration-500"
                 @click="navigateTo(item.id)">
                 <div class="flex items-center justify-between">
                    <div class="flex items-center gap-5">
                       <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110" :class="[item.bg]">
                          <component :is="item.icon" class="w-6 h-6" :class="[item.color]" />
                       </div>
                       <div>
                          <h4 class="text-sm font-black text-white group-hover:text-pink-400 transition-colors uppercase tracking-widest">{{ item.name }}</h4>
                          <p class="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">{{ item.sub }}</p>
                       </div>
                    </div>
                    <ChevronRightIcon class="w-5 h-5 text-gray-700 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                 </div>
              </CgCard>
           </div>

           <!-- RIGHT: Statistics & Orders -->
           <div class="lg:col-span-8 space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CgCard v-for="stat in stats" :key="stat.label" type="grain-frost" class="p-6 rounded-3xl border border-white/5">
                  <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-white/5 rounded-2xl">
                      <component :is="stat.icon" class="w-6 h-6 text-pink-400" />
                    </div>
                    <span class="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">+{{ stat.trend }}%</span>
                  </div>
                  <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">{{ stat.label }}</p>
                  <h3 class="text-2xl font-black text-white italic">{{ stat.value }}</h3>
                </CgCard>
              </div>

              <CgCard type="heavy-frost" class="p-8 rounded-[2.5rem] min-h-[300px]">
                <h3 class="text-xl font-bold italic mb-8 flex items-center gap-3">
                  <TrendingUpIcon class="w-6 h-6 text-pink-400" />
                  Khu vực phân tích xu hướng
                </h3>
                <div class="h-48 flex items-center justify-center text-gray-600 border border-dashed border-white/10 rounded-3xl italic text-xs">
                  Dữ liệu tăng trưởng theo thời gian thực...
                </div>
              </CgCard>
           </div>
        </div>
      </template>

      <template v-else-if="activeTab === 'cards'">
        <WeddingCardListView />
      </template>

      <template v-else-if="activeTab === 'website'">
        <WeddingWebsiteEditor />
      </template>

      <template v-else-if="activeTab === 'orders'">
        <CgCard type="heavy-frost" class="p-8 rounded-[3rem]">
           <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-bold italic flex items-center gap-3">
              <PackageIcon class="w-6 h-6 text-pink-400" />
              Danh sách đơn hàng
            </h3>
            <div class="flex gap-4">
              <div class="relative">
                <SearchIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" placeholder="Tìm kiếm đơn hàng..." class="bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-xs focus:outline-none focus:border-pink-500/50 w-64" />
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  <th class="pb-2 px-6">ID Đơn</th>
                  <th class="pb-2 px-6">Khách hàng</th>
                  <th class="pb-2 px-6">Dịch vụ</th>
                  <th class="pb-2 px-6">Tổng tiền</th>
                  <th class="pb-2 px-6 text-center">Trạng thái</th>
                  <th class="pb-2 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 5" :key="i" class="bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <td class="py-5 px-6 rounded-l-2xl">
                    <span class="text-xs font-mono font-bold text-pink-400">#ORD-{{ 2024 + i }}</span>
                  </td>
                  <td class="py-5 px-6">
                    <p class="text-xs font-bold text-white">Nguyễn Văn {{ i }}</p>
                    <p class="text-[9px] text-gray-500">090 123 456{{ i }}</p>
                  </td>
                  <td class="py-5 px-6">
                    <span class="text-[10px] font-black text-gray-400 uppercase bg-white/5 px-2 py-1 rounded-md">Thiệp cưới Silver</span>
                  </td>
                  <td class="py-5 px-6">
                    <span class="text-xs font-black text-white">1,500,000đ</span>
                  </td>
                  <td class="py-5 px-6 text-center">
                    <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Hoàn tất</span>
                  </td>
                  <td class="py-5 px-6 text-right rounded-r-2xl">
                    <button class="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all">
                      <MoreVerticalIcon class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CgCard>
      </template>

      <template v-else-if="activeTab === 'revenue'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <CgCard type="heavy-frost" class="p-8 rounded-[3rem]">
            <h3 class="text-xl font-bold italic mb-8">Báo cáo doanh thu tháng</h3>
             <div class="h-80 flex items-center justify-center text-gray-600 border border-dashed border-white/10 rounded-3xl">
              [Biểu đồ doanh thu]
            </div>
           </CgCard>
           <CgCard type="grain-frost" class="p-8 rounded-[3rem]">
            <h3 class="text-xl font-bold italic mb-8">Tỉ lệ chuyển đổi</h3>
             <div class="h-80 flex items-center justify-center text-gray-600 border border-dashed border-white/10 rounded-3xl">
              [Biểu đồ tỉ lệ]
            </div>
           </CgCard>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  Heart as HeartIcon, 
  User as UserIcon, 
  Globe as GlobeIcon, 
  Package as PackageIcon, 
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  Search as SearchIcon,
  MoreVertical as MoreVerticalIcon,
  Activity as ActivityIcon,
  CreditCard as CreditCardIcon,
  Mail as MailIcon,
  LayoutDashboard as DashIcon,
  ChevronRight as ChevronRightIcon
} from 'lucide-vue-next';
import { CgCard } from 'glass-studio-ui-pro';
import WeddingCardListView from './WeddingCardListView.vue';
import WeddingWebsiteEditor from './WeddingWebsiteEditor.vue';

const router = useRouter();
const route = useRoute();
const activeTab = ref('overview');

const tabs = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'cards', label: 'Thiệp cưới' },
  { id: 'website', label: 'Website' },
  { id: 'orders', label: 'Đơn hàng' },
  { id: 'revenue', label: 'Doanh thu' },
];

const MENU_ITEMS = [
  { id: 'overview', name: 'TỔNG QUAN WEDDING', sub: 'WED-HOME', icon: DashIcon, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'cards', name: 'TẠO THIỆP CƯỚI', sub: 'WED-CARD', icon: MailIcon, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { id: 'website', name: 'THIẾT KẾ WEBSITE', sub: 'WED-WEB', icon: GlobeIcon, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'orders', name: 'QUẢN LÝ ĐƠN HÀNG', sub: 'WED-ORD', icon: PackageIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'revenue', name: 'THỐNG KÊ DOANH THU', sub: 'WED-REV', icon: TrendingUpIcon, color: 'text-orange-400', bg: 'bg-orange-400/10' },
];

const stats = [
  { label: 'Tổng đơn hàng', value: '1,284', icon: PackageIcon, trend: 12.5 },
  { label: 'Doanh thu tháng', value: '450.5M', icon: CreditCardIcon, trend: 8.2 },
  { label: 'Khách hàng mới', value: '342', icon: UsersIcon, trend: 15.1 },
  { label: 'Tỉ lệ hài lòng', value: '98.5%', icon: ActivityIcon, trend: 0.5 },
];

const syncTab = () => {
  const tab = route.params.tab as string;
  if (tab && tabs.find(t => t.id === tab)) {
    activeTab.value = tab;
  } else {
    activeTab.value = 'overview';
  }
};

watch(() => route.params.tab, syncTab);
onMounted(syncTab);

const navigateTo = (tabId: string) => {
  router.push(`/ad/wedding/${tabId}`);
};
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
