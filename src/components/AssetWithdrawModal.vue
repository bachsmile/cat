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
      <h3 class="text-xl md:text-2xl font-bold mb-6 text-orange-500">Rút Tài Sản</h3>

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

        <div
          class="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl mb-2"
        >
          <div
            class="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wide"
          >
            <span>Số dư khả dụng</span>
            <span class="text-orange-400"
              >{{ formatNumber(availableBalance) }} {{ selectedAsset }}</span
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
              >Số Lượng Rút</label
            >
            <input
              type="text"
              inputmode="decimal"
              v-model="displayQuantity"
              @input="handleInput('quantity', displayQuantity)"
              required
              placeholder="0.00"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
            />
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <label
                class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                >Đơn Giá ($/₫)</label
              >
              <button
                v-if="selectedAsset === 'USDT' || selectedAsset === 'VND'"
                type="button"
                @click="fetchP2pPrice"
                class="text-[10px] text-orange-400 font-bold uppercase hover:text-orange-300 transition-colors flex items-center gap-1"
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
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
            />
          </div>
        </div>

        <div
          class="p-4 md:p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl mt-6 md:mt-8"
        >
          <p
            class="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1"
          >
            Tổng Giá Trị Quy Đổi
          </p>
          <p class="text-2xl md:text-3xl font-black text-white">
            ≈ {{ formatNumber(totalAmount) }}
            <span class="text-xs md:text-sm text-gray-500 font-bold">{{
              selectedAsset === "USDT" ? "₫" : "$"
            }}</span>
          </p>
        </div>

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Nơi Rút Về</label
          >
          <select
            :value="formData.platform"
            @change="(e: any) => handleInput('platform', e.target.value)"
            required
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          >
            <option :value="null" disabled>-- Chọn nơi rút về --</option>
            <optgroup label="Sàn Giao Dịch">
              <option value="Binance">Binance</option>
              <option value="OKX">OKX</option>
              <option value="MEXC">MEXC</option>
              <option value="Bybit">Bybit</option>
              <option value="Gate.io">Gate.io</option>
              <option value="Bitget">Bitget</option>
              <option value="HTX">HTX (Huobi)</option>
              <option value="KuCoin">KuCoin</option>
            </optgroup>
            <optgroup label="Ví Điện Tử">
              <option value="Momo">Momo</option>
              <option value="ZaloPay">ZaloPay</option>
              <option value="ViettelMoney">Viettel Money</option>
              <option value="ShopeePay">ShopeePay</option>
            </optgroup>
            <optgroup label="Ngân Hàng">
              <option value="TPBank">TPBank</option>
              <option value="VietcomBank">VietcomBank</option>
              <option value="Techcombank">Techcombank</option>
              <option value="VPBank">VPBank</option>
              <option value="MBBank">MB Bank</option>
              <option value="ACB">ACB</option>
              <option value="BIDV">BIDV</option>
              <option value="Agribank">Agribank</option>
            </optgroup>
            <optgroup label="Khác">
              <option value="Cash">Tiền Mặt</option>
              <option value="Other">Khác</option>
            </optgroup>
          </select>
        </div>

        <button
          type="submit"
          :disabled="!formData.quantity || !formData.price || !formData.platform"
          class="w-full py-4 mt-8 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
        >
          Xác Nhận Rút
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
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
    platform: string | null;
  };
  totalAmount: number;
  availableBalance: number;
}>();

const emit = defineEmits(["close", "submit", "update:formData"]);
const isLoadingPrice = ref(false);

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

const handleInput = (
  field: "quantity" | "price" | "platform",
  value: string,
) => {
  if (field === "platform") {
    emit("update:formData", {
      ...props.formData,
      platform: value,
    });
    return;
  }

  const normalizedValue = value.replace(",", ".");

  if (field === "quantity") displayQuantity.value = normalizedValue;
  else displayPrice.value = normalizedValue;

  emit("update:formData", {
    ...props.formData,
    [field]: normalizedValue === "" ? null : Number(normalizedValue),
  });
};

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

const formatNumber = (num: number) => {
  if (num === undefined || num === null) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};
</script>
