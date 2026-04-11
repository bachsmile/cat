<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 pb-32 animate-in fade-in"
  >
    <div
      class="bg-[#0a0a0f] border border-white/10 rounded-[24px] p-5 max-w-lg w-full relative shadow-[0_40px_100px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 flex flex-col max-h-[78vh] overflow-hidden"
    >
      <button
        @click="$emit('close')"
        class="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-50"
      >
        <XIcon class="w-5 h-5" />
      </button>

      <div class="overflow-y-auto pr-1 custom-modal-scrollbar flex-1 flex flex-col gap-4 min-h-0">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-8 bg-[#FFD700] rounded-full shadow-[0_0_15px_#FFD700]"></div>
          <h3 class="text-xl md:text-2xl font-black text-[#FFD700] uppercase tracking-tighter italic">Gửi Tiết Kiệm</h3>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 pb-12">
          <div>
            <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5">Loại Tài Sản</label>
            <input
              type="text"
              :value="selectedAsset"
              disabled
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-black tracking-widest focus:outline-none cursor-not-allowed opacity-70"
            />
          </div>

          <div>
            <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5">Nguồn Tiền</label>
            <select
              v-model="form.sourceCombined"
              @change="handleSourceChange"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-base text-white font-bold focus:outline-none focus:border-[#FFD700]/50 transition-all appearance-none cursor-pointer"
            >
              <option value="main" class="bg-[#0a0a0f] text-white">
                Ví Gốc - {{ formatNumber(availableBalance) }} {{ selectedAsset }}
              </option>
              <optgroup v-if="storageWallets?.length" label="Ví Lưu Trữ" class="bg-[#0a0a0f] text-gray-500 font-bold uppercase text-[9px]">
                <option v-for="w in storageWallets" :key="w.id" :value="`storage:${w.id}`" class="bg-[#0a0a0f] text-white">
                  {{ w.platform }} - {{ formatNumber(w.quantity) }} {{ selectedAsset }}
                </option>
              </optgroup>
            </select>
          </div>

          <div>
            <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2.5">Hình thức gửi</label>
            <div class="grid grid-cols-2 gap-3">
              <label
                class="flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all"
                :class="form.savingsType === 'flexible' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/5 bg-white/5 hover:bg-white/10'"
              >
                <input type="radio" value="flexible" v-model="form.savingsType" class="hidden" />
                <span class="text-xs font-black italic uppercase" :class="form.savingsType === 'flexible' ? 'text-[#FFD700]' : 'text-gray-500'">Linh Hoạt</span>
                <span class="text-[8px] text-gray-600 font-bold mt-1">Lãi hàng ngày</span>
              </label>
              <label
                class="flex flex-col items-center justify-center p-3 border rounded-xl cursor-pointer transition-all"
                :class="form.savingsType === 'fixed' ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/5 bg-white/5 hover:bg-white/10'"
              >
                <input type="radio" value="fixed" v-model="form.savingsType" class="hidden" />
                <span class="text-xs font-black italic uppercase" :class="form.savingsType === 'fixed' ? 'text-[#FFD700]' : 'text-gray-500'">Cố Định</span>
                <span class="text-[8px] text-gray-600 font-bold mt-1">Lãi cuối kỳ</span>
              </label>
            </div>
          </div>

          <div v-if="form.savingsType === 'fixed'" class="animate-in slide-in-from-top-2 duration-300">
            <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5">Thời Gian Gửi (Ngày)</label>
            <input
              type="number"
              v-model.number="form.durationDays"
              min="1"
              required
              placeholder="30"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-[#FFD700]/50 transition-all font-mono"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5">Số Lượng Gửi</label>
              <input
                type="number"
                v-model.number="form.quantity"
                step="any"
                min="0"
                :max="currentAvailableBalance"
                required
                placeholder="0.00"
                class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-[#FFD700]/50 transition-all font-mono"
              />
              <p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1.5">
                K.Dụng: <span class="text-[#FFD700]">{{ formatNumber(currentAvailableBalance) }}</span>
              </p>
            </div>
            <div>
              <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5">Lãi Suất (%/Năm)</label>
              <input
                type="number"
                v-model.number="form.annualRate"
                step="0.01"
                min="0"
                max="100"
                required
                placeholder="5.5"
                class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2.5 text-base text-white focus:outline-none focus:border-[#FFD700]/50 transition-all font-mono"
              />
            </div>
          </div>

          <!-- Nơi Gửi Lãi - Custom Dropdown for better scroll & style -->
          <div class="relative">
            <label class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5">Nơi Gửi Lãi</label>
            <div
              @click="showPlatformDropdown = !showPlatformDropdown"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-base font-bold text-white focus:outline-none cursor-pointer flex justify-between items-center transition-all"
              :class="{ 'border-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]': showPlatformDropdown }"
            >
              <span>{{ form.platform || '-- Chọn nơi gửi --' }}</span>
              <ChevronDownIcon 
                class="w-4 h-4 text-gray-500 transition-transform duration-300"
                :class="{ 'rotate-180 text-[#FFD700]': showPlatformDropdown }"
              />
            </div>

            <div
              v-if="showPlatformDropdown"
              class="absolute bottom-full mb-2 left-0 w-full bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110] overflow-hidden animate-in slide-in-from-bottom-2 duration-300 flex flex-col max-h-[250px]"
            >
              <div class="overflow-y-auto p-2 custom-modal-scrollbar">
                <!-- Group: Exchanges -->
                <div class="px-3 py-2 text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 mb-1">Sàn Giao Dịch</div>
                <div 
                  v-for="p in ['Binance', 'OKX', 'MEXC', 'Bybit']" 
                  :key="p"
                  @click="form.platform = p; showPlatformDropdown = false"
                  class="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition-all cursor-pointer flex items-center gap-3"
                  :class="{ 'bg-[#FFD700]/5 text-[#FFD700]': form.platform === p }"
                >
                  <div class="w-1.5 h-1.5 rounded-full" :class="form.platform === p ? 'bg-[#FFD700]' : 'bg-gray-700'"></div>
                  {{ p }}
                </div>

                <!-- Group: Banks -->
                <div class="px-3 py-2 text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] border-b border-white/5 mt-4 mb-1">Ngân Hàng</div>
                <div 
                  v-for="p in ['TPBank', 'VietcomBank', 'Techcombank', 'MBBank', 'ACB', 'BIDV', 'Agribank', 'Vikki']" 
                  :key="p"
                  @click="form.platform = p; showPlatformDropdown = false"
                  class="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition-all cursor-pointer flex items-center gap-3"
                  :class="{ 'bg-[#FFD700]/5 text-[#FFD700]': form.platform === p }"
                >
                  <div class="w-1.5 h-1.5 rounded-full" :class="form.platform === p ? 'bg-[#FFD700]' : 'bg-gray-700'"></div>
                  {{ p }}
                </div>
              </div>
            </div>
          </div>

          <!-- Interest Estimation -->
          <div
            v-if="form.quantity && form.annualRate"
            class="p-4 bg-gradient-to-br from-[#FFD700]/10 to-[#B8860B]/5 border border-[#FFD700]/20 rounded-2xl animate-in fade-in duration-500"
          >
            <div class="flex justify-between items-center mb-3">
              <p class="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">ƯỚC TÍNH CHIẾN LƯỢC</p>
              <div class="flex gap-2">
                <button
                  v-for="p in ['day', 'month', 'year']"
                  :key="p"
                  type="button"
                  @click="estimatePeriod = p"
                  class="px-2 py-0.5 text-[7px] font-black uppercase tracking-widest rounded transition-all"
                  :class="estimatePeriod === p ? 'bg-[#FFD700] text-black' : 'bg-white/5 text-gray-500'"
                >
                  {{ p === 'day' ? 'N' : p === 'month' ? 'T' : 'Y' }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-[8px] text-gray-500 font-bold uppercase mb-1">Lãi {{ periodLabel }}</p>
                <p class="text-lg font-black text-[#FFD700] italic">+{{ formatNumber(estimatedProfit) }}</p>
              </div>
              <div>
                <p class="text-[8px] text-gray-500 font-bold uppercase mb-1">Tổng Portfolio</p>
                <p class="text-lg font-black text-white italic">{{ formatNumber((form.quantity || 0) + estimatedProfit) }}</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="!form.quantity || !form.annualRate || !form.platform || form.quantity > currentAvailableBalance"
            class="w-full py-4 mt-2 bg-[#FFD700] hover:bg-[#FFD700]/90 disabled:opacity-30 rounded-xl text-black text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#FFD700]/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <TrendingUpIcon class="w-4 h-4" />
            Xác Nhận Gửi Lãi
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  X as XIcon,
  TrendingUp as TrendingUpIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string | null;
  availableBalance: number;
  storageWallets?: any[];
}>();

const emit = defineEmits(["close", "submit"]);

const showPlatformDropdown = ref(false);
const form = ref({
  quantity: null as number | null,
  annualRate: null as number | null,
  platform: null as string | null,
  savingsType: "flexible" as "flexible" | "fixed",
  durationDays: null as number | null,
  note: "",
  sourceType: "main",
  storageId: null as string | null,
  sourceCombined: "main",
});

const handleSourceChange = () => {
  if (form.value.sourceCombined === "main") {
    form.value.sourceType = "main";
    form.value.storageId = null;
  } else if (form.value.sourceCombined?.startsWith("storage:")) {
    form.value.sourceType = "storage";
    const id = form.value.sourceCombined.split(":")[1];
    form.value.storageId = id || null;
  }
};

const currentAvailableBalance = computed(() => {
  if (form.value.sourceType === "main") return props.availableBalance;
  if (form.value.sourceType === "storage" && form.value.storageId) {
    const w = props.storageWallets?.find((w) => w.id === form.value.storageId);
    return w ? w.quantity : 0;
  }
  return 0;
});

const estimatePeriod = ref("day");

const periodLabel = computed(() => {
  switch (estimatePeriod.value) {
    case "day": return "1 ngày";
    case "month": return "1 tháng";
    case "year": return "1 năm";
    default: return "";
  }
});

const estimatedProfit = computed(() => {
  if (!form.value.quantity || !form.value.annualRate) return 0;
  const dailyRate = form.value.annualRate / 100 / 365;
  const qty = form.value.quantity;

  switch (estimatePeriod.value) {
    case "day": return qty * dailyRate;
    case "month": return qty * dailyRate * 30;
    case "year": return qty * (form.value.annualRate / 100);
    default: return 0;
  }
});

const handleSubmit = () => {
  if (!form.value.quantity || !form.value.annualRate || !form.value.platform) return;
  if (form.value.savingsType === "fixed" && !form.value.durationDays) return;

  emit("submit", {
    assetSymbol: props.selectedAsset,
    quantity: form.value.quantity,
    annualRate: form.value.annualRate,
    platform: form.value.platform,
    savingsType: form.value.savingsType,
    durationDays: form.value.durationDays,
    note: form.value.note || null,
    storageId: form.value.sourceType === "storage" ? form.value.storageId : undefined,
  });
};

const formatNumber = (num: number) => {
  if (num === undefined || num === null) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: num > 0 && num < 0.1 ? 6 : 2,
  });
};
</script>

<style scoped>
.custom-modal-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-modal-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-modal-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.05);
  border-radius: 10px;
}
.custom-modal-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.2);
}

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}
</style>
