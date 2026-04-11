<template>
  <div class="animate-in fade-in duration-700 space-y-10 pb-20">
    <!-- Header with Net Worth -->
    <div class="relative overflow-hidden bg-[#0a0a0f] rounded-[3rem] border border-white/5 p-10 shadow-2xl">
      <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h2 class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Tổng Tài Sản (Net Worth) - {{ periods.find(p => p.id === selectedPeriod)?.label }}
          </h2>
          <div class="flex items-baseline gap-4">
            <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter">
              {{ formatVND(summary?.totalVndValue || 0) }}
            </h1>

            <div class="flex flex-col">
              <span class="text-xs font-black text-gray-500 uppercase tracking-widest">VNĐ</span>
              <span 
                class="text-sm font-bold flex items-center gap-1"
                :class="summary?.dailyChangeVnd >= 0 ? 'text-emerald-400' : 'text-rose-400'"
              >
                <TrendingUpIcon v-if="summary?.dailyChangeVnd >= 0" class="w-4 h-4" />
                <TrendingDownIcon v-else class="w-4 h-4" />
                {{ (summary?.dailyChangePercent * periodMultiplier).toFixed(2) }}% ({{ formatVND(Number(summary?.dailyChangeVnd || 0) * periodMultiplier) }})
              </span>
            </div>
          </div>
        </div>



        <div class="flex gap-4">
          <button @click="reloadData" class="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <RefreshIcon :class="{ 'animate-spin': loading }" class="w-6 h-6 text-gray-400 group-hover:text-white" />
          </button>
          <button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-purple-500/20 hover:scale-105 transition-all">
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      <!-- background decoration -->
      <div class="absolute -right-20 -top-20 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full"></div>
      <div class="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full"></div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- 1. Asset Allocation Card -->
      <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
        <h3 class="text-sm font-black text-white uppercase tracking-widest mb-8">Phân Bổ Tài Sản</h3>
        <div class="flex flex-col items-center gap-8">
          <div class="relative w-48 h-48">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" stroke-width="15" fill="transparent" class="text-white/5" />
              <template v-for="(asset, i) in allocationData" :key="asset.symbol">
                <circle 
                  cx="96" cy="96" r="80" 
                  stroke="currentColor" stroke-width="15" fill="transparent" 
                  :class="asset.color"
                  :stroke-dasharray="2 * Math.PI * 80"
                  :stroke-dashoffset="(1 - Number(asset.percent) / 100) * (2 * Math.PI * 80)"
                  :style="{ transform: `rotate(${getRotation(Number(i))}deg)`, transformOrigin: 'center' }"
                />
              </template>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-2xl font-black text-white">100%</span>
              <span class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Phân bổ</span>
            </div>
          </div>
          <div class="w-full space-y-3">
            <div v-for="asset in allocationData" :key="asset.symbol" class="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :class="asset.color.replace('text-', 'bg-')"></div>
                <span class="text-[10px] font-black text-gray-300 uppercase">{{ asset.symbol }}</span>
              </div>
              <span class="text-xs font-black text-white">{{ asset.percent.toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Profit Performance Card -->
      <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
        <h3 class="text-sm font-black text-white uppercase tracking-widest mb-8">Hiệu Suất Lợi Nhuận</h3>
        <div class="space-y-8">
          <div v-for="metric in profitMetrics" :key="metric.label" class="group">
            <div class="flex justify-between items-end mb-3">
              <div>
                <p class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{{ metric.label }}</p>
                <h4 class="text-xl font-black text-white tracking-tighter">{{ formatVND(Number(metric.value)) }}</h4>

              </div>
              <span class="text-xs font-bold" :class="metric.trend >= 0 ? 'text-emerald-400' : 'text-rose-400'">
                {{ metric.trend >= 0 ? '+' : '' }}{{ metric.percent }}%
              </span>
            </div>
            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r transition-all duration-1000"
                :class="metric.color"
                :style="{ width: metric.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Cash Flow Summary -->
      <div class="bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
        <h3 class="text-sm font-black text-white uppercase tracking-widest mb-8">Dòng Tiền Hệ Thống</h3>
        <div class="space-y-6">
          <div class="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
            <p class="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mb-2">Dòng Tiền Vào (Inflow)</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ArrowDownRightIcon class="w-5 h-5" />
              </div>
              <h4 class="text-2xl font-black text-white tracking-tighter">{{ formatVND(Number(cashFlow.inflow)) }}</h4>
            </div>
          </div>
          <div class="p-6 bg-rose-500/5 border border-rose-500/10 rounded-3xl">
            <p class="text-[10px] font-black text-rose-500/60 uppercase tracking-widest mb-2">Dòng Tiền Ra (Outflow)</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                <ArrowUpRightIcon class="w-5 h-5" />
              </div>
              <h4 class="text-2xl font-black text-white tracking-tighter">{{ formatVND(Number(cashFlow.outflow)) }}</h4>
            </div>
          </div>
          <div class="pt-4 flex justify-between items-center px-4">
            <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Số Dư Ròng</span>
            <span class="text-lg font-black text-white tracking-tighter">{{ formatVND(Number(cashFlow.net)) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Growth Chart -->
    <div class="bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h3 class="text-2xl font-black text-white tracking-tight uppercase">Tăng trưởng danh mục</h3>
          <p class="text-xs text-gray-500 font-medium mt-1">Phân tích đa lớp trong {{ periods.find(p => p.id === selectedPeriod)?.label.toLowerCase() }} qua</p>
        </div>
        
        <div class="flex items-center gap-8">
          <!-- Legend -->
          <div class="hidden lg:flex items-center gap-6 mr-4">
             <div class="flex items-center gap-2">
               <div class="w-2.5 h-0.5 bg-yellow-500 rounded-full"></div>
               <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tổng tiền</span>
             </div>
             <div class="flex items-center gap-2">
               <div class="w-2.5 h-0.5 bg-blue-500 rounded-full"></div>
               <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Vốn nạp</span>
             </div>
             <div class="flex items-center gap-2">
               <div class="w-2.5 h-0.5 bg-emerald-500 rounded-full"></div>
               <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lợi nhuận</span>
             </div>
          </div>

          <!-- Period Selector -->
          <div class="flex items-center gap-1 p-1 bg-white/5 border border-white/5 rounded-2xl w-fit backdrop-blur-xl shrink-0">
            <button 
              v-for="period in periods" 
              :key="period.id"
              @click="setPeriod(period.id)"
              class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              :class="selectedPeriod === period.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:text-gray-300'"
            >
              {{ period.id }}
            </button>
          </div>
        </div>
      </div>

      <div 
        class="h-64 relative w-full"
        @mousemove="handleChartHover"
        @mouseleave="hoveredPoint = null"
      >
        <!-- SVG Line Chart -->
        <svg class="w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <!-- Gradients -->
          <defs>
            <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(234, 179, 8, 0.2)" />
              <stop offset="100%" stop-color="rgba(234, 179, 8, 0)" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <!-- Area Fill (Total) -->
          <path :d="fillPath" fill="url(#totalFill)" />
          
          <!-- Vertical Selection Line -->
          <line 
            v-if="hoveredPoint"
            :x1="hoveredPoint.x" 
            y1="0" 
            :x2="hoveredPoint.x" 
            y2="200" 
            stroke="rgba(255,255,255,0.15)" 
            stroke-width="1" 
            stroke-dasharray="6,6"
          />

          <!-- Capital Line (Blue) -->
          <path 
            :d="capitalPath" 
            fill="none" 
            stroke="rgb(29, 78, 216)" 
            stroke-width="2" 
            opacity="0.8"
          />

          <!-- Profit Line (Emerald) -->
          <path 
            :d="profitPath" 
            fill="none" 
            stroke="rgb(5, 150, 105)" 
            stroke-width="2" 
            opacity="0.9"
          />

          <!-- Total Value Line (Yellow) -->
          <path 
            :d="chartPath" 
            fill="none" 
            stroke="rgb(234, 179, 8)" 
            stroke-width="3" 
            filter="url(#glow)"
          />
          
          <!-- Grid Lines -->
          <line v-for="i in 4" :key="i" x1="0" :y1="i*50" x2="1000" :y2="i*50" stroke="rgba(255,255,255,0.03)" stroke-width="1" />

          <!-- Dynamic Hover Points for all 3 lines -->
          <template v-if="hoveredPoint">
             <!-- Capital Point -->
             <circle :cx="hoveredPoint.x" :cy="180 - (hoveredPoint.capital / 100) * 140" r="4" fill="rgb(29, 78, 216)" stroke="#0a0a0f" stroke-width="2" />
             <!-- Profit Point -->
             <circle :cx="hoveredPoint.x" :cy="180 - (hoveredPoint.profit / 100) * 140" r="4" fill="rgb(5, 150, 105)" stroke="#0a0a0f" stroke-width="2" />
             <!-- Total Point -->
             <circle :cx="hoveredPoint.x" :cy="hoveredPoint.y" r="6" fill="rgb(234, 179, 8)" stroke="#0a0a0f" stroke-width="2" filter="url(#glow)" />
          </template>
        </svg>

        <!-- Tooltip -->
        <div 
          v-if="hoveredPoint"
          class="absolute z-50 bg-white text-black p-4 rounded-[1.5rem] shadow-2xl animate-in zoom-in-95 pointer-events-none min-w-[200px]"
          :style="{ 
            left: `${(hoveredPoint.x / 1000) * 100}%`,
            top: `${(hoveredPoint.y / 200) * 100}%`,
            transform: 'translate(-50%, calc(-100% - 40px))'
          }"
        >


          <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 border-b border-gray-100 pb-2">{{ hoveredPoint.date }}</p>
          <div class="space-y-2">
            <div class="flex justify-between items-center gap-4">
              <span class="text-[9px] font-bold text-yellow-600 uppercase">Tổng tài sản</span>
              <span class="text-xs font-black">{{ formatVND(Number(summary?.totalVndValue || 0) * (hoveredPoint.value / 100)) }}</span>
            </div>
            <div class="flex justify-between items-center gap-4">
              <span class="text-[9px] font-bold text-blue-700 uppercase">Vốn nạp</span>
              <span class="text-xs font-bold text-gray-700">{{ formatVND(Number(summary?.totalVndValue || 0) * (hoveredPoint.capital / 100)) }}</span>
            </div>
            <div class="flex justify-between items-center gap-4 pt-1 border-t border-gray-50">
              <span class="text-[9px] font-bold text-emerald-600 uppercase">Lợi nhuận</span>
              <span class="text-xs font-black text-emerald-700">+{{ formatVND(Number(summary?.totalVndValue || 0) * (hoveredPoint.profit / 100)) }}</span>
            </div>
          </div>
          <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
        </div>
      </div>






      <div class="flex justify-between mt-6 px-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
        <span>30 Ngày Trước</span>
        <span>15 Ngày Trước</span>
        <span>Hôm nay</span>
      </div>
    </div>


    <!-- Asset Details Table -->
    <div class="bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h3 class="text-2xl font-black text-white tracking-tight uppercase">Chi Tiết Danh Mục</h3>
          <p class="text-xs text-gray-500 font-medium mt-1">Phân tích chi tiết từng tài sản đang nắm giữ</p>
        </div>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-white transition-all">Sắp xếp</button>
          <button class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-white transition-all">Lọc</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-separate border-spacing-y-4">
          <thead>
            <tr class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-left">
              <th class="px-6 py-4">Tài sản</th>
              <th class="px-6 py-4">Số dư</th>
              <th class="px-6 py-4">Giá hiện tại</th>
              <th class="px-6 py-4">Giá trị tài sản</th>
              <th class="px-6 py-4 text-right">Lợi nhuận (24h)</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="asset in summary?.assets" 
              :key="asset.symbol"
              class="group hover:bg-white/5 transition-all"
            >
              <td class="px-6 py-6 rounded-l-3xl bg-white/[0.02] group-hover:bg-transparent">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-lg group-hover:scale-110 transition-transform">
                    {{ asset.symbol.charAt(0) }}
                  </div>
                  <div>
                    <h4 class="text-sm font-black text-white uppercase">{{ asset.symbol }}</h4>
                    <p class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Network Token</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-6 bg-white/[0.02] group-hover:bg-transparent">
                <div class="flex flex-col">
                  <span class="text-sm font-black text-white">{{ asset.totalBalance?.toLocaleString() || asset.balance.toLocaleString() }}</span>
                  <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{{ asset.symbol }}</span>
                </div>
              </td>
              <td class="px-6 py-6 bg-white/[0.02] group-hover:bg-transparent">
                <div class="flex flex-col">
                  <span class="text-sm font-black text-white">{{ formatVND(Number(asset.price)) }}</span>
                  <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Cập nhật 1m ago</span>
                </div>
              </td>
              <td class="px-6 py-6 bg-white/[0.02] group-hover:bg-transparent">
                <span class="text-sm font-black text-white">{{ formatVND(Number(asset.vndValue)) }}</span>
              </td>
              <td class="px-6 py-6 rounded-r-3xl bg-white/[0.02] group-hover:bg-transparent text-right">
                <div class="flex flex-col items-end">
                  <span class="text-sm font-black" :class="asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'">
                    {{ asset.change24h >= 0 ? '+' : '' }}{{ asset.change24h }}%
                  </span>
                  <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Biến động ngày</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { 
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  RotateCcw as RefreshIcon,
  ArrowDownRight as ArrowDownRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
} from 'lucide-vue-next';
import { getPortfolioSummary } from '@/api/wallet';

const loading = ref(false);
const summary = ref<any>(null);
const hoveredPoint = ref<any>(null);
const growthHistory = ref<any[]>([]);
const selectedPeriod = ref('1M');

const periods = [
  { id: '1D', label: 'Ngày', days: 1 },
  { id: '1W', label: 'Tuần', days: 7 },
  { id: '1M', label: 'Tháng', days: 30 },
  { id: '3M', label: 'Quý', days: 90 },
  { id: '1Y', label: 'Năm', days: 365 },
];const setPeriod = (id: string) => {
  selectedPeriod.value = id;
  const p = periods.find(x => x.id === id);
  if (p) generateDailyData(p.days);
};

const generateDailyData = (daysCount: number = 30) => {

  const data = [];
  const baseCapital = 60;
  const steps = daysCount <= 7 ? daysCount * 4 : daysCount; 
  
  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    // Vốn nạp tăng trưởng nhẹ (giả lập nạp thêm tiền định kỳ)
    const capitalValue = baseCapital + (progress * 15);
    
    const wave = Math.sin(i / (steps / 6)) * 4;
    const noise = (Math.random() - 0.5) * 3;
    // Tổng tài sản = Vốn + Lợi nhuận (giả lập lợi nhuận tăng dần có biến động)
    const totalValue = Math.min(100, Math.max(0, capitalValue + 10 + (progress * 10) + wave + noise));
    const profitValue = totalValue - capitalValue;
    
    let dateLabel = '';
    if (daysCount === 1) {
      dateLabel = `${Math.floor(i * (24/steps))} giờ trước`;
    } else {
      const day = Math.floor(daysCount * (1 - progress));
      dateLabel = day === 0 ? 'Hôm nay' : `${day} ngày trước`;
    }

    data.push({
      date: dateLabel,
      value: totalValue,
      capital: capitalValue,
      profit: profitValue,
      x: progress * 1000,
      y: 180 - (totalValue / 100) * 140
    });
  }
  growthHistory.value = data;
};

const chartPath = computed(() => {
  if (growthHistory.value.length === 0) return '';
  return growthHistory.value.reduce((path, point, i) => {
    return path + (i === 0 ? `M${point.x},${point.y}` : ` L${point.x},${point.y}`);
  }, '');
});

const capitalPath = computed(() => {
  if (growthHistory.value.length === 0) return '';
  return growthHistory.value.reduce((path, point, i) => {
    const yCapital = 180 - (point.capital / 100) * 140;
    return path + (i === 0 ? `M${point.x},${yCapital}` : ` L${point.x},${yCapital}`);
  }, '');
});

const profitPath = computed(() => {
  if (growthHistory.value.length === 0) return '';
  return growthHistory.value.reduce((path, point, i) => {
    const yProfit = 180 - (point.profit / 100) * 140;
    return path + (i === 0 ? `M${point.x},${yProfit}` : ` L${point.x},${yProfit}`);
  }, '');
});

const fillPath = computed(() => {
  if (growthHistory.value.length === 0) return '';
  return `${chartPath.value} L1000,200 L0,200 Z`;
});

const handleChartHover = (event: MouseEvent) => {

  const container = event.currentTarget as HTMLElement;
  if (!container || growthHistory.value.length === 0) return;
  
  const rect = container.getBoundingClientRect();
  const xPercent = (event.clientX - rect.left) / rect.width;
  const xSvg = xPercent * 1000;
  
  let nearest = growthHistory.value[0];
  let minDiff = Math.abs(nearest.x - xSvg);
  
  for (const point of growthHistory.value) {
    const diff = Math.abs(point.x - xSvg);
    if (diff < minDiff) {
      minDiff = diff;
      nearest = point;
    }
  }
  hoveredPoint.value = nearest;
};





const allocationData = computed(() => {
  if (!summary.value) return [];
  const colors = ['text-purple-600', 'text-indigo-500', 'text-blue-400', 'text-emerald-400', 'text-amber-400'];
  return summary.value.assets.slice(0, 5).map((a: any, i: number) => ({
    symbol: String(a.symbol),
    percent: Number((Number(a.vndValue) / Number(summary.value.totalVndValue)) * 100),
    color: colors[i % colors.length]
  }));
});


const getRotation = (index: number) => {
  let prevSum = 0;
  for (let i = 0; i < index; i++) {
    prevSum += allocationData.value[i].percent;
  }
  return (prevSum / 100) * 360;
};

const periodMultiplier = computed(() => {
  const p = periods.find(x => x.id === selectedPeriod.value);
  if (!p) return 1;
  return p.days / 30;
});

const profitMetrics = computed(() => [
  { label: `Lợi nhuận ước tính (${selectedPeriod.value})`, value: (summary.value?.totalVndValue || 0) * 0.12 * periodMultiplier.value, trend: 15.2 * periodMultiplier.value, percent: (15.2 * periodMultiplier.value).toFixed(1), progress: 85, color: 'from-purple-500 to-indigo-600' },
  { label: `Lãi gửi tiết kiệm (${selectedPeriod.value})`, value: 12500000 * periodMultiplier.value, trend: 5.4, percent: 5.4, progress: 62, color: 'from-blue-500 to-emerald-500' },
  { label: `Biến động Vốn (${selectedPeriod.value})`, value: (summary.value?.dailyChangeVnd || 0) * periodMultiplier.value, trend: (summary.value?.dailyChangePercent || 0) * periodMultiplier.value, percent: Math.abs((summary.value?.dailyChangePercent || 0) * periodMultiplier.value).toFixed(2), progress: 45, color: 'from-rose-500 to-amber-500' }
]);


const cashFlow = ref({
  inflow: 840000000,
  outflow: 320000000,
  net: 520000000
});

const reloadData = async () => {
  loading.value = true;
  try {
    const data = await getPortfolioSummary();
    summary.value = data;
  } catch (error) {
    console.error('Failed to load summary', error);
  } finally {
    loading.value = false;
  }
};

const formatVND = (value: number) => {
  if (!value && value !== 0) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
};

onMounted(() => {
  generateDailyData();
  reloadData();
});

</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Custom scrollbar for deep dark theme */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a0a0f;
}
::-webkit-scrollbar-thumb {
  background: #1a1a24;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #252533;
}
</style>
