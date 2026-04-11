<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-in fade-in"
  >
    <div
      class="bg-[#0a0a0f] border border-white/10 rounded-[20px] md:rounded-[24px] p-4 md:p-5 max-w-lg w-full relative shadow-[0_40px_100px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 flex flex-col max-h-[75vh]"
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-50"
      >
        <XIcon class="w-4 h-4" />
      </button>

      <div class="overflow-y-auto pr-1 custom-modal-scrollbar flex-1 flex flex-col gap-3">
        <h3 class="text-xl md:text-2xl font-black text-orange-500 uppercase tracking-tighter italic">Rút Tài Sản</h3>

        <form @submit.prevent="$emit('submit')" class="space-y-4">
          <div>
            <label
              class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5"
              >Loại Tài Sản</label
            >
            <input
              type="text"
              :value="selectedAsset"
              disabled
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white font-black tracking-widest focus:outline-none cursor-not-allowed opacity-70"
            />
          </div>

          <div
            class="p-3 bg-orange-500/5 border border-orange-500/10 rounded-xl"
          >
            <div
              class="flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]"
            >
              <span>Số dư khả dụng</span>
              <span class="text-sm text-orange-400 font-black"
                >{{ formatNumber(availableBalance) }} {{ selectedAsset }}</span
              >
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5"
                >Số Lượng Rút</label
              >
              <input
                type="text"
                inputmode="decimal"
                v-model="displayQuantity"
                @input="handleInput('quantity', displayQuantity)"
                required
                placeholder="0.00"
                class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2 text-base text-white focus:outline-none focus:border-orange-500/50 transition-all font-mono"
              />
            </div>
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label
                  class="block text-[9px] font-black text-gray-400 uppercase tracking-widest"
                  >Đơn Giá ($/₫)</label
                >
                <button
                  v-if="selectedAsset === 'USDT' || selectedAsset === 'VND'"
                  type="button"
                  @click="fetchP2pPrice"
                  class="text-[8px] text-orange-400 font-black uppercase hover:text-orange-300 transition-colors flex items-center gap-1.5"
                  :disabled="isLoadingPrice"
                >
                  <RefreshCcwIcon
                    v-if="isLoadingPrice"
                    class="w-3 h-3 animate-spin"
                  />
                  <ZapIcon v-else class="w-3 h-3" />
                  {{ isLoadingPrice ? "FETCHING" : "P2P" }}
                </button>
              </div>
              <input
                type="text"
                inputmode="decimal"
                v-model="displayPrice"
                @input="handleInput('price', displayPrice)"
                required
                placeholder="0.00"
                class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2 text-base text-white focus:outline-none focus:border-orange-500/50 transition-all font-mono"
              />
            </div>
          </div>

          <div
            class="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl mt-2"
          >
            <p
              class="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em] mb-1"
            >
              TỔNG GIÁ TRỊ QUY ĐỔI
            </p>
            <p class="text-xl font-black text-white italic tracking-tighter">
              ≈ {{ formatNumber(totalAmount) }}
              <span class="text-sm text-gray-600 font-black not-italic ml-1">{{
                selectedAsset === "USDT" ? "₫" : "$"
              }}</span>
            </p>
          </div>

          <div class="relative">
            <label
              class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5"
              >Nơi Rút Về</label
            >
            <div 
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold cursor-pointer transition-all flex justify-between items-center"
              :class="isDropdownOpen ? 'border-orange-500/50' : ''"
            >
              <span :class="formData.platform ? 'text-white' : 'text-gray-600'">
                {{ formData.platform || '-- Chọn nơi rút về --' }}
              </span>
              <ChevronDownIcon 
                class="w-4 h-4 text-gray-500 transition-transform duration-300"
                :class="isDropdownOpen ? 'rotate-180 text-orange-500' : ''" 
              />
            </div>

            <!-- Custom Dropdown Menu -->
            <transition name="fade-slide">
              <div v-if="isDropdownOpen" class="absolute left-0 right-0 mt-2 bg-[#0A0A0B] border border-white/10 rounded-xl shadow-2xl z-[100] overflow-hidden max-h-[200px] overflow-y-auto custom-modal-scrollbar">
                <div v-for="group in platformGroups" :key="group.label">
                  <div class="px-4 py-1.5 bg-white/5 text-[7px] font-black text-gray-500 uppercase tracking-[0.2em]">
                    {{ group.label }}
                  </div>
                  <div 
                    v-for="opt in group.options" 
                    :key="opt"
                    @click="selectPlatform(opt)"
                    class="px-4 py-2 hover:bg-orange-500/10 hover:text-orange-500 text-sm text-gray-400 cursor-pointer transition-colors"
                  >
                    {{ opt }}
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- HIFO Settlement Preview -->
          <div v-if="withdrawalPreview.length" class="space-y-2 pt-2">
            <div class="flex justify-between items-center px-1">
               <span class="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em]">Dự kiến đối soát lô HIFO</span>
               <span class="text-[9px] font-black uppercase italic" :class="totalEstimatedProfit >= 0 ? 'text-emerald-400' : 'text-red-400'">
                 Lãi: {{ totalEstimatedProfit >= 0 ? '+' : '' }}{{ formatNumber(totalEstimatedProfit) }} ₫
               </span>
            </div>
            <div class="max-h-[120px] overflow-y-auto custom-modal-scrollbar space-y-1.5 pr-1">
              <div v-for="(p, idx) in withdrawalPreview" :key="idx" 
                   class="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex justify-between items-center gap-3 transition-all">
                <div class="flex flex-col">
                  <span class="text-[7px] text-gray-600 uppercase font-black tracking-widest mb-0.5">MÃ LÔ</span>
                  <span class="text-xs text-white font-black tracking-widest">{{ p.contractCode }}</span>
                </div>
                <div class="flex flex-col text-right">
                  <span class="text-[7px] text-gray-600 uppercase font-black tracking-widest mb-0.5">SL</span>
                  <span class="text-xs text-white font-black">{{ formatNumber(p.quantity) }}</span>
                </div>
                <div class="flex flex-col text-right min-w-[80px]">
                  <span class="text-[7px] text-gray-600 uppercase font-black tracking-widest mb-0.5">LỢI NHUẬN</span>
                  <span class="text-xs font-black italic" :class="p.profit >= 0 ? 'text-emerald-400' : 'text-red-400'">
                    {{ p.profit >= 0 ? '+' : '' }}{{ formatNumber(p.profit) }} ₫
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="!formData.quantity || !formData.price || !formData.platform"
            class="w-full py-3 mt-4 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 rounded-lg text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20"
          >
            XÁC NHẬN RÚT
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import {
  X as XIcon,
  Zap as ZapIcon,
  RefreshCcw as RefreshCcwIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-vue-next";
import { getUsdtVndP2pPrice } from "../api/market";

const props = defineProps<{
  selectedAsset: string | null;
  formData: {
    quantity: number | null;
    price: number | null;
    platform: string | null;
  };
  totalAmount: number;
  availableBalance: number;
  capitalPackages?: any[]; // Passed from parent (already sorted by price DESC)
}>();

const isDropdownOpen = ref(false);

const platformGroups = [
  {
    label: "Sàn Giao Dịch",
    options: ["Binance", "OKX", "MEXC", "Bybit", "Gate.io", "Bitget", "HTX", "KuCoin"]
  },
  {
    label: "Ví Điện Tử",
    options: ["Momo", "ZaloPay", "ViettelMoney", "ShopeePay"]
  },
  {
    label: "Ngân Hàng",
    options: ["TPBank", "Vietcombank", "Techcombank", "VPBank", "MB Bank", "ACB", "BIDV", "Agribank"]
  },
  {
    label: "Khác",
    options: ["Tiền Mặt", "Khác"]
  }
];

const selectPlatform = (platform: string) => {
  handleInput('platform', platform);
  isDropdownOpen.value = false;
};

// Computed for HIFO Preview
const withdrawalPreview = computed(() => {
  if (!props.formData.quantity || !props.capitalPackages?.length || !props.formData.price) return [];
  
  let remaining = Number(props.formData.quantity);
  const currentPrice = Number(props.formData.price);
  const preview = [];

  for (const pkg of props.capitalPackages) {
    if (remaining <= 0) break;
    const taken = Math.min(pkg.quantity, remaining);
    const profit = taken * (currentPrice - pkg.price);
    
    preview.push({
      contractCode: pkg.contractCode || 'HỆ THỐNG',
      quantity: taken,
      lotPrice: pkg.price,
      profit
    });
    
    remaining -= taken;
  }
  return preview;
});

const totalEstimatedProfit = computed(() => {
  return withdrawalPreview.value.reduce((sum, p) => sum + p.profit, 0);
});

const displayQuantity = ref("");
const displayPrice = ref("");
const isLoadingPrice = ref(false);

const emit = defineEmits(["update:formData", "submit", "close"]);

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("vi-VN").format(num);
};

const handleInput = (field: string, value: any) => {
  emit("update:formData", { ...props.formData, [field]: value });
};

const fetchP2pPrice = async () => {
  try {
    isLoadingPrice.value = true;
    const price = await getUsdtVndP2pPrice();
    displayPrice.value = price.toString();
    handleInput("price", Number(price));
  } catch (error) {
    console.error("Failed to fetch P2P price:", error);
  } finally {
    isLoadingPrice.value = false;
  }
};

watch(
  () => props.formData.quantity,
  (newVal) => {
    if (newVal === null) displayQuantity.value = "";
  }
);

watch(
  () => props.formData.price,
  (newVal) => {
    if (newVal === null) displayPrice.value = "";
  }
);
</script>

<style scoped>
.custom-modal-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-modal-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-modal-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-modal-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
