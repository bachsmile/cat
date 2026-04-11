<template>
  <div class="animate-in fade-in duration-500 space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl md:text-5xl font-black tracking-tighter text-white mb-2">
          Báo cáo Hệ thống
        </h1>
        <p class="text-gray-500 font-medium">
          Phân tích chuyên sâu về hiệu suất, tài chính và người dùng
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white/5 border border-white/10 rounded-2xl p-1 flex items-center">
          <button 
            v-for="range in ['Day', 'Week', 'Month', 'Year']" 
            :key="range"
            @click="selectedRange = range"
            class="px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
            :class="selectedRange === range ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-gray-500 hover:text-gray-300'"
          >
            {{ range }}
          </button>
        </div>
        <button class="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all">
          <DownloadIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Overview KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="kpi in kpis" :key="kpi.label" 
           class="bg-[#0a0a0f] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all">
        <div class="relative z-10">
          <p class="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">{{ kpi.label }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-3xl font-black text-white tracking-tighter">{{ kpi.value }}</h3>
            <span class="text-xs font-bold" :class="kpi.trend >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ kpi.trend >= 0 ? '+' : '' }}{{ kpi.trend }}%
            </span>
          </div>
          <div class="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r transition-all duration-1000" 
                 :class="kpi.color"
                 :style="{ width: kpi.progress + '%' }"></div>
          </div>
        </div>
        <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
          <component :is="kpi.icon" class="w-24 h-24" />
        </div>
      </div>
    </div>

    <!-- Main Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Revenue Breakdown -->
      <div class="lg:col-span-2 bg-[#0a0a0f] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h3 class="text-xl font-black text-white tracking-tight uppercase">Tăng trưởng tài chính</h3>
            <p class="text-xs text-gray-500 font-medium mt-1">Dữ liệu doanh thu thực tế so với mục tiêu</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-purple-500"></div>
              <span class="text-[10px] text-gray-400 font-bold uppercase">Revenue</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span class="text-[10px] text-gray-400 font-bold uppercase">Profit</span>
            </div>
          </div>
        </div>

        <div class="h-72 flex items-end justify-between gap-3 px-4 relative">
          <div v-for="(val, i) in revenueData" :key="i" class="flex-1 flex flex-col gap-1 group/bar relative">
            <div class="flex-1 flex items-end gap-1">
              <div class="flex-1 bg-gradient-to-t from-purple-600/20 to-purple-600 rounded-t-lg transition-all duration-500 group-hover/bar:brightness-125"
                   :style="{ height: val.revenue + '%' }"></div>
              <div class="flex-1 bg-gradient-to-t from-indigo-600/20 to-indigo-600 rounded-t-lg transition-all duration-500 group-hover/bar:brightness-125"
                   :style="{ height: val.profit + '%' }"></div>
            </div>
            <span class="text-[8px] text-gray-600 font-black mt-4 text-center group-hover/bar:text-white transition-colors uppercase tracking-widest">
              {{ val.month }}
            </span>
            <!-- Tooltip -->
            <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all pointer-events-none shadow-2xl z-20 whitespace-nowrap">
              Rev: ${{ val.revenue }}k / Prf: ${{ val.profit }}k
            </div>
          </div>
          <!-- Grid Lines -->
          <div v-for="l in 4" :key="l" class="absolute inset-x-0 bg-white/5 h-px" :style="{ top: (l-1)*25 + '%' }"></div>
        </div>
      </div>

      <!-- User Distribution -->
      <div class="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col shadow-2xl">
        <h3 class="text-xl font-black text-white tracking-tight uppercase mb-8">Phân bổ người dùng</h3>
        <div class="flex-1 flex flex-col justify-center gap-10">
          <div class="relative w-48 h-48 mx-auto">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" stroke-width="20" fill="transparent" class="text-white/5" />
              <circle cx="96" cy="96" r="80" stroke="currentColor" stroke-width="20" fill="transparent" 
                      class="text-purple-600" stroke-dasharray="502.4" stroke-dashoffset="125.6" />
              <circle cx="96" cy="96" r="80" stroke="currentColor" stroke-width="20" fill="transparent" 
                      class="text-indigo-500" stroke-dasharray="502.4" stroke-dashoffset="350.4" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-black text-white">2.4k</span>
              <span class="text-[8px] text-gray-500 font-black uppercase tracking-widest">Active Users</span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <div v-for="seg in segments" :key="seg.name" class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full" :class="seg.color"></div>
                <span class="text-[10px] text-gray-300 font-bold uppercase tracking-widest">{{ seg.name }}</span>
              </div>
              <span class="text-xs font-black text-white">{{ seg.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Detailed Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Tech Performance -->
      <div v-for="tech in techStats" :key="tech.label" 
           class="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2.5rem] group hover:border-white/10 transition-all shadow-xl relative overflow-hidden">
        <div class="flex items-center justify-between mb-6">
          <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <component :is="tech.icon" class="w-6 h-6" />
          </div>
          <span class="text-xs font-black" :class="tech.statusColor">{{ tech.status }}</span>
        </div>
        <h4 class="text-lg font-black text-white tracking-tight uppercase mb-2">{{ tech.label }}</h4>
        <div class="flex items-baseline gap-2 mb-6">
          <span class="text-2xl font-black text-white tracking-tighter">{{ tech.value }}</span>
          <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{{ tech.unit }}</span>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between text-[10px] font-black uppercase tracking-widest">
            <span class="text-gray-500">Stability</span>
            <span class="text-white">{{ tech.stability }}%</span>
          </div>
          <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-600 to-indigo-600" :style="{ width: tech.stability + '%' }"></div>
          </div>
        </div>
        <!-- Decoration blur -->
        <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  Download as DownloadIcon,
  TrendingUp as TrendingIcon,
  Users as UsersIcon,
  Wallet as WalletIcon,
  Layers as LayersIcon,
  Cpu as CpuIcon,
  Zap as ZapIcon,
  Activity as ActivityIcon
} from 'lucide-vue-next';

const selectedRange = ref('Month');

const kpis = [
  { label: 'Tổng doanh thu', value: '$840,249', trend: 12.5, progress: 85, color: 'from-purple-500 to-purple-800', icon: WalletIcon },
  { label: 'Người dùng mới', value: '2,840', trend: 8.2, progress: 62, color: 'from-indigo-500 to-indigo-800', icon: UsersIcon },
  { label: 'Tỷ lệ chuyển đổi', value: '18.4%', trend: -2.4, progress: 45, color: 'from-blue-500 to-blue-800', icon: TrendingIcon },
  { label: 'Giá trị trung bình', value: '$295.4', trend: 4.1, progress: 78, color: 'from-emerald-500 to-emerald-800', icon: LayersIcon }
];

const revenueData = [
  { month: 'Jan', revenue: 65, profit: 45 },
  { month: 'Feb', revenue: 80, profit: 55 },
  { month: 'Mar', revenue: 45, profit: 30 },
  { month: 'Apr', revenue: 90, profit: 65 },
  { month: 'May', revenue: 70, profit: 50 },
  { month: 'Jun', revenue: 100, profit: 75 },
  { month: 'Jul', revenue: 85, profit: 60 }
];

const segments = [
  { name: 'Enterprise', value: 45, color: 'bg-purple-600' },
  { name: 'Professional', value: 30, color: 'bg-indigo-500' },
  { name: 'Basic', value: 25, color: 'bg-white/10' }
];

const techStats = [
  { label: 'Server Load', value: '42.8', unit: '% capacity', icon: CpuIcon, status: 'Healthy', statusColor: 'text-emerald-400', stability: 94 },
  { label: 'Response Time', value: '245', unit: 'ms average', icon: ZapIcon, status: 'Optimal', statusColor: 'text-blue-400', stability: 98 },
  { label: 'Network Inbound', value: '1.2', unit: 'gbps peak', icon: ActivityIcon, status: 'Stable', statusColor: 'text-purple-400', stability: 88 }
];
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
