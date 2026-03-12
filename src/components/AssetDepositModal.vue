<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-in fade-in"
  >
    <div
      class="bg-[#0a0a0f] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
    >
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors"
      >
        <XIcon class="w-6 h-6" />
      </button>
      <h3 class="text-xl md:text-2xl font-bold mb-6">Nạp Tài Sản</h3>

      <form @submit.prevent="$emit('submit')" class="space-y-5">
        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Loại Tài Sản</label
          >
          <input
            type="text"
            :value="selectedAsset"
            disabled
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none cursor-not-allowed opacity-70"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
              >Số Lượng</label
            >
            <input
              type="text"
              inputmode="decimal"
              v-model="displayQuantity"
              @input="handleInput('quantity', displayQuantity)"
              required
              placeholder="0.00"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
            />
          </div>
          <div v-if="selectedAsset !== 'VND'">
            <div class="flex items-center justify-between mb-2">
              <label
                class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                >Đơn Giá ($/₫)</label
              >
              <button
                v-if="selectedAsset === 'USDT'"
                type="button"
                @click="fetchP2pPrice"
                class="text-[10px] text-purple-400 font-bold uppercase hover:text-purple-300 transition-colors flex items-center gap-1"
                :disabled="isLoadingPrice"
              >
                <RefreshCcwIcon
                  v-if="isLoadingPrice"
                  class="w-3 h-3 animate-spin"
                />
                <ZapIcon v-else class="w-3 h-3" />
                {{ isLoadingPrice ? "Đang lấy giá..." : "Lấy giá P2P" }}
              </button>
            </div>
            <input
              type="text"
              inputmode="decimal"
              v-model="displayPrice"
              @input="handleInput('price', displayPrice)"
              required
              placeholder="0.00"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
            />
          </div>
          <div v-else>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
              >Đơn giá cố định</label
            >
            <input
              type="text"
              value="1.00 ₫"
              disabled
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 focus:outline-none cursor-not-allowed opacity-70 font-mono"
            />
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Nguồn Tiền (Ngân hàng / Ví)</label
          >
          <select
            :value="formData.source"
            @change="
              handleInput('source', ($event.target as HTMLSelectElement).value)
            "
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          >
            <option :value="null">-- Chọn nguồn tiền --</option>
            <optgroup label="Ví Điện Tử">
              <option value="Momo">Momo</option>
              <option value="ZaloPay">ZaloPay</option>
              <option value="Viettel Money">Viettel Money</option>
            </optgroup>
            <optgroup label="Ngân Hàng Phối (API)">
              <option
                v-for="bank in bankList"
                :key="bank.code"
                :value="bank.shortName"
              >
                {{ bank.shortName }} - {{ bank.name }}
              </option>
            </optgroup>
            <option value="Other">Khác</option>
          </select>
        </div>

        <div
          class="p-4 md:p-5 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl mt-6 md:mt-8"
        >
          <p
            class="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"
          >
            Tổng Tiền Thanh Toán
          </p>
          <p class="text-2xl md:text-3xl font-black text-white">
            {{ formatNumber(totalAmount) }}
            <span class="text-base md:text-lg text-gray-400">{{
              selectedAsset === "USDT"
                ? "₫"
                : selectedAsset === "VND"
                  ? "₫"
                  : "$"
            }}</span>
          </p>
        </div>

        <button
          type="submit"
          class="w-full py-4 mt-8 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-bold transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
        >
          Xác Nhận Nạp
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  X as XIcon,
  Zap as ZapIcon,
  RefreshCcw as RefreshCcwIcon,
} from "lucide-vue-next";
import { getUsdtVndP2pPrice } from "../api/market";

const props = defineProps<{
  selectedAsset: string | null;
  formData: {
    quantity: number | null;
    price: number | null;
    source: string | null;
  };
  totalAmount: number;
}>();

const emit = defineEmits(["close", "submit", "update:formData"]);
const isLoadingPrice = ref(false);
const bankList = ref<{ name: string; code: string; shortName: string }[]>([]);

const displayQuantity = ref(props.formData.quantity?.toString() || "");
const displayPrice = ref(props.formData.price?.toString() || "");

watch(
  () => props.formData.quantity,
  (newVal) => {
    if (newVal === null) displayQuantity.value = "";
    else if (Number(displayQuantity.value) !== newVal) {
      displayQuantity.value = newVal.toString();
    }
  },
);

watch(
  () => props.formData.price,
  (newVal) => {
    if (newVal === null) displayPrice.value = "";
    else if (Number(displayPrice.value) !== newVal) {
      displayPrice.value = newVal.toString();
    }
  },
);


onMounted(async () => {
  try {
    const response = await fetch("https://api.vietqr.io/v2/banks");
    const data = await response.json();
    if (data.code === "00") {
      bankList.value = data.data;
    }
  } catch (error) {
    console.error("Failed to fetch banks", error);
  }
});

const fetchP2pPrice = async () => {
  if (isLoadingPrice.value) return;
  isLoadingPrice.value = true;
  try {
    const price = await getUsdtVndP2pPrice();
    handleInput("price", price.toString());
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingPrice.value = false;
  }
};

const handleInput = (
  field: "quantity" | "price" | "source",
  value: string | null,
) => {
  let finalValue: any = value;

  if (field === "quantity" || field === "price") {
    const normalizedValue = (value || "").replace(",", ".");
    
    if (field === "quantity") displayQuantity.value = normalizedValue;
    else displayPrice.value = normalizedValue;
    
    finalValue = normalizedValue === "" || normalizedValue === null ? null : Number(normalizedValue);
  }

  emit("update:formData", {
    ...props.formData,
    [field]: finalValue,
  });
};

const formatNumber = (num: number) => {
  if (num === undefined || num === null) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};
</script>
