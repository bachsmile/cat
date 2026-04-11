<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop with Elite Blur -->
    <div 
      class="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl transition-opacity duration-500"
      @click="$emit('close')"
    ></div>

    <!-- Modal Content: Strategic Swap Nexus -->
    <div 
      class="relative w-full max-w-[460px] bg-[#0a0a10] border border-white/5 rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]"
    >
      <!-- Premium Header -->
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-white/[0.02] to-transparent">
        <div class="flex items-center gap-4">
          <div class="w-1 h-6 bg-gold-vibrant rounded-full shadow-[0_0_15px_#FFD700]"></div>
          <div>
            <h3 class="text-lg font-black text-white uppercase tracking-tighter italic">Nghiệp vụ Chuyển đổi</h3>
            <p class="text-[8px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-0.5 italic">Hoán đổi tài sản chiến lược</p>
          </div>
        </div>
        <button 
          @click="$emit('close')"
          class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all active:scale-90"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <!-- Swap Interface: From -> To -->
        <div class="relative space-y-2">
          <!-- From Asset -->
          <div class="p-5 rounded-[24px] bg-white/[0.03] border border-white/5 group focus-within:border-gold-vibrant/40 transition-all">
            <div class="flex justify-between items-center mb-3">
              <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Chuyển từ</span>
              <span class="text-[9px] font-bold text-gold-vibrant uppercase">Khả dụng: {{ formatNumber(availableBalance) }} {{ selectedAsset }}</span>
            </div>
            <div class="flex items-center gap-3">
              <input 
                type="number" 
                v-model="formData.quantity"
                placeholder="0.00"
                class="flex-1 bg-transparent border-0 p-0 text-2xl font-black text-white focus:ring-0 placeholder:text-white/10 italic"
              />
              <div class="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
                <span class="text-sm font-black text-white italic tracking-tighter">{{ selectedAsset }}</span>
              </div>
            </div>
          </div>

          <!-- Swap Icon Anchor -->
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div class="w-12 h-12 rounded-2xl bg-[#FFD700] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.5)] border-4 border-[#0a0a10] hover:scale-110 active:rotate-180 transition-all cursor-pointer">
              <ArrowDownIcon class="w-6 h-6" />
            </div>
          </div>

          <!-- To Asset (Locked to VND for now) -->
          <div class="p-5 rounded-[24px] bg-white/[0.03] border border-white/5">
            <div class="flex justify-between items-center mb-3">
              <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Nhận về ước tính</span>
              <span class="text-[9px] font-bold text-gray-600 uppercase italic">Giá tỷ giá thực tế</span>
            </div>
            <div class="flex items-center justify-between gap-3">
              <div class="text-2xl font-black" :class="estimatedVnd > 0 ? 'text-emerald-400 italic' : 'text-white/10'">
                {{ estimatedVnd > 0 ? formatNumber(estimatedVnd) : '0' }}
              </div>
              <div class="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                <span class="text-sm font-black uppercase tracking-widest italic">VND</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Conversion Details -->
        <div class="p-5 rounded-[24px] bg-black/40 border border-white/5 space-y-4">
          <!-- Price Mode Toggle -->
          <div class="flex justify-between items-center mb-2">
            <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">Chế độ tỷ giá</span>
            <div class="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                @click="priceMode = 'auto'"
                class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all"
                :class="priceMode === 'auto' ? 'bg-gold-vibrant text-black shadow-lg' : 'text-gray-500 hover:text-white'"
              >Tự động</button>
              <button 
                @click="priceMode = 'manual'"
                class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all"
                :class="priceMode === 'manual' ? 'bg-gold-vibrant text-black shadow-lg' : 'text-gray-500 hover:text-white'"
              >Tùy chỉnh</button>
            </div>
          </div>

          <div class="flex justify-between items-center h-10">
            <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Tỷ giá quy đổi</span>
            <div class="flex items-center gap-2">
              <template v-if="priceMode === 'auto'">
                <span class="text-[11px] font-black text-white italic">1 {{ selectedAsset }} = {{ formatNumber(currentPrice) }} ₫</span>
              </template>
              <template v-else>
                <div class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <span class="text-[9px] font-bold text-gray-500">1 {{ selectedAsset }} = </span>
                  <input 
                    type="number" 
                    v-model="manualPrice"
                    class="w-24 bg-transparent border-0 p-0 text-[11px] font-black text-gold-vibrant focus:ring-0 text-right italic"
                  />
                  <span class="text-[9px] font-bold text-gray-500">₫</span>
                </div>
              </template>
            </div>
          </div>
          <div class="flex justify-between items-center pt-3 border-t border-white/5">
            <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Lợi nhuận dự kiến</span>
            <span class="text-[11px] font-black italic" :class="estimatedProfit >= 0 ? 'text-emerald-400' : 'text-red-400'">
              {{ estimatedProfit >= 0 ? '+' : '' }}{{ formatNumber(estimatedProfit) }} ₫
            </span>
          </div>
        </div>

        <!-- Strategy Options -->
        <div class="space-y-3">
          <p class="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] italic ml-2">Nền tảng thanh khoản</p>
          <div class="grid grid-cols-2 gap-4">
            <button 
              v-for="p in ['P2P Merchant', 'Internal OTC']" 
              :key="p"
              @click="formData.platform = p"
              class="py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all italic"
              :class="formData.platform === p ? 'bg-gold-vibrant text-black border-gold-vibrant shadow-[0_0_20px_#FFD700]/20' : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'"
            >
              {{ p }}
            </button>
          </div>
        </div>
      </div>

      <!-- Tactical Execution Button -->
      <div class="p-6 border-t border-white/5 bg-black/40">
        <button 
          @click="handleSubmit"
          :disabled="!isValid"
          class="w-full py-4 rounded-2xl bg-[#FFD700] disabled:bg-gray-800 disabled:text-gray-600 text-black text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(255,215,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 italic"
        >
          <RefreshCwIcon class="w-5 h-5" /> CHẤP NHẬN CHUYỂN ĐỔI
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { X as XIcon, ArrowDown as ArrowDownIcon, RefreshCw as RefreshCwIcon } from 'lucide-vue-next';

const props = defineProps<{
  selectedAsset: string;
  availableBalance: number;
  currentPrice: number;
  capitalPackages: any[];
  formatNumber: (v: number) => string;
}>();

const emit = defineEmits(['close', 'submit']);

const priceMode = ref<'auto' | 'manual'>('auto');
const manualPrice = ref(props.currentPrice);

const formData = ref({
  quantity: null as number | null,
  platform: 'P2P Merchant',
});

const effectivePrice = computed(() => {
  return priceMode.value === 'auto' ? props.currentPrice : (manualPrice.value || 0);
});

const estimatedVnd = computed(() => {
  if (!formData.value.quantity) return 0;
  return formData.value.quantity * effectivePrice.value;
});

const estimatedProfit = computed(() => {
  if (!formData.value.quantity || !props.capitalPackages.length) return 0;
  
  // High-Level P&L Estimation (HIFO sequence)
  let remaining = Number(formData.value.quantity);
  let totalCost = 0;
  const sortedPkgs = [...props.capitalPackages].sort((a, b) => b.price - a.price);
  
  for (const pkg of sortedPkgs) {
    const take = Math.min(remaining, pkg.quantity);
    totalCost += take * pkg.price;
    remaining -= take;
    if (remaining <= 0) break;
  }
  
  return estimatedVnd.value - totalCost;
});

const isValid = computed(() => {
  return formData.value.quantity && formData.value.quantity > 0 && formData.value.quantity <= props.availableBalance;
});

const handleSubmit = () => {
  if (!isValid.value) return;
  emit('submit', {
    quantity: formData.value.quantity,
    price: effectivePrice.value,
    platform: formData.value.platform,
    targetAsset: 'VND'
  });
};
</script>

<style scoped>
/* Hide Chrome, Safari, Edge, Opera number arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide Firefox number arrows */
input[type=number] {
  -moz-appearance: textfield;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
}
</style>
