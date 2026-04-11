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

      <div
        class="overflow-y-auto pr-1 custom-modal-scrollbar flex-1 flex flex-col gap-3"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-1.5 h-8 bg-gold-vibrant rounded-full shadow-[0_0_10px_#FFD700]"
          ></div>
          <h3
            class="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic"
          >
            Giao Thức Nạp
          </h3>
        </div>

        <form @submit.prevent="$emit('submit')" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5"
                >Loại Tài Sản</label
              >
              <div
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white font-black tracking-widest uppercase opacity-50 cursor-not-allowed"
              >
                {{ selectedAsset }}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label
                  class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1.5"
                  >Số Lượng</label
                >
                <input
                  type="text"
                  inputmode="decimal"
                  v-model="displayQuantity"
                  @input="handleInput('quantity', displayQuantity)"
                  required
                  placeholder="0.00"
                  class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2 text-base text-white focus:outline-none focus:border-[#FFD700]/30 transition-all font-mono"
                />
              </div>

              <div v-if="selectedAsset !== 'VND'">
                <div class="flex items-center justify-between mb-1.5">
                  <label
                    class="block text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]"
                    >Đơn Giá</label
                  >
                  <button
                    v-if="selectedAsset === 'USDT'"
                    type="button"
                    @click="fetchP2pPrice"
                    class="text-[8px] text-[#FFD700] font-black uppercase hover:text-white transition-colors flex items-center gap-1"
                    :disabled="isLoadingPrice"
                  >
                    <RefreshCcwIcon
                      v-if="isLoadingPrice"
                      class="w-3 h-3 animate-spin"
                    />
                    <ZapIcon v-else class="w-3 h-3" />
                  </button>
                </div>
                <input
                  type="text"
                  inputmode="decimal"
                  v-model="displayPrice"
                  @input="handleInput('price', displayPrice)"
                  required
                  placeholder="0.00"
                  class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2 text-base text-white focus:outline-none focus:border-[#FFD700]/30 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5"
              >Nguồn Chuyển Đến</label
            >
            <div
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-2.5 text-white flex justify-between items-center cursor-pointer hover:border-[#FFD700]/20 transition-all group"
              :class="isDropdownOpen ? 'border-[#FFD700]/40' : ''"
            >
              <span
                class="text-xs font-black tracking-widest uppercase"
                :class="!formData.source ? 'text-gray-700' : 'text-[#FFD700]'"
              >
                {{
                  formData.source
                    ? getSourceLabel(formData.source)
                    : "-- CHỌN NGUỒN TIỀN --"
                }}
              </span>
              <ChevronDownIcon
                class="w-4 h-4 text-gray-600 group-hover:text-[#FFD700] transition-colors"
                :class="isDropdownOpen ? 'rotate-180' : ''"
              />
            </div>

            <div
              v-if="isDropdownOpen"
              class="mt-2 bg-[#0A0A0B] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20"
            >
              <div
                v-for="source in sources"
                :key="source.id"
                @click="selectSource(source.id)"
                class="px-4 py-2.5 hover:bg-white/5 cursor-pointer flex justify-between items-center group/opt"
              >
                <div class="flex flex-col">
                  <span
                    class="text-xs font-black tracking-widest uppercase group-hover/opt:text-[#FFD700] transition-colors"
                    >{{ source.name }}</span
                  >
                  <span class="text-[8px] text-gray-600 font-bold uppercase">{{
                    source.description
                  }}</span>
                </div>
                <div
                  v-if="source.id === 'VND'"
                  class="text-[9px] font-black text-emerald-400"
                >
                  BALANCE: {{ formatNumber(vndBalance) }} ₫
                </div>
              </div>
            </div>
          </div>

          <div
            class="p-4 bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/20 rounded-xl mt-4 relative overflow-hidden"
          >
            <p
              class="text-[8px] font-black text-[#FFD700] uppercase tracking-[0.4em] mb-1"
            >
              TOTAL_SETTLEMENT
            </p>
            <div class="flex items-baseline gap-2">
              <p
                class="text-xl font-black text-white italic tracking-tighter truncate px-2"
              >
                {{ formatNumber(totalAmount) }}
              </p>
              <span class="text-sm font-black text-gray-600 italic shrink-0">{{
                selectedAsset === "USDT" || selectedAsset === "VND" ? "₫" : "$"
              }}</span>
            </div>
          </div>

          <button
            type="submit"
            :disabled="formData.source === 'VND' && vndBalance < totalAmount"
            class="w-full py-3 mt-4 bg-gold-vibrant hover:scale-[1.01] active:scale-[0.98] disabled:opacity-30 disabled:grayscale rounded-xl text-black text-xs font-black uppercase tracking-[0.3em] transition-all shadow-md shadow-[#FFD700]/20 flex items-center justify-center gap-2"
          >
            <ZapIcon class="w-3.5 h-3.5" />
            {{
              formData.source === "VND" && vndBalance < totalAmount
                ? "INSUFFICIENT"
                : "Execute Settlement"
            }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  X as XIcon,
  Zap as ZapIcon,
  RefreshCcw as RefreshCcwIcon,
  ChevronDown as ChevronDownIcon,
} from "lucide-vue-next";
import { getUsdtVndP2pPrice } from "../api/market";

const props = defineProps<{
  selectedAsset: string;
  formData: {
    quantity: number | null;
    price: number | null;
    source: string | null;
  };
  totalAmount: number;
  vndBalance: number;
}>();

const emit = defineEmits(["update:formData", "submit", "close"]);

const displayQuantity = ref("");
const displayPrice = ref("");
const isLoadingPrice = ref(false);
const isDropdownOpen = ref(false);

const sources = [
  {
    id: "VND",
    name: "Số dư VND hệ thống",
    description: "Sử dụng nguồn tiền mặt VND đang có",
  },
  {
    id: "P2P",
    name: "Giao dịch P2P",
    description: "Mua USDT trực tiếp từ sàn Binance/OKX",
  },
  {
    id: "DIRECT",
    name: "Nạp trực tiếp",
    description: "Chuyển từ ví cá nhân bên ngoài",
  },
];

const getSourceLabel = (id: string) => {
  return sources.find((s) => s.id === id)?.name || id;
};

const selectSource = (id: string) => {
  emit("update:formData", { ...props.formData, source: id });
  isDropdownOpen.value = false;
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("vi-VN").format(num);
};

const handleInput = (field: string, value: any) => {
  const numValue = value === "" ? null : Number(value.replace(/,/g, ""));
  emit("update:formData", { ...props.formData, [field]: numValue });
};

const fetchP2pPrice = async () => {
  try {
    isLoadingPrice.value = true;
    const price = await getUsdtVndP2pPrice();
    displayPrice.value = price.toString();
    handleInput("price", displayPrice.value);
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
  },
);

watch(
  () => props.formData.price,
  (newVal) => {
    if (newVal === null) displayPrice.value = "";
  },
);

onMounted(() => {
  if (props.selectedAsset === "VND") {
    handleInput("price", "1");
    displayPrice.value = "1";
  }
});
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
</style>
