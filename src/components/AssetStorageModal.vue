<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-in fade-in"
  >
    <div
      class="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
    >
      <button
        @click="$emit('close')"
        class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
      >
        <XIcon class="w-6 h-6" />
      </button>
      <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
        <div class="p-2 bg-purple-500/10 rounded-xl">
          <WalletIcon class="w-6 h-6 text-purple-400" />
        </div>
        Thêm Ví Lưu Trữ
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-5">
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

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Nền tảng lưu trữ</label
          >
          <select
            v-model="form.platform"
            required
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          >
            <option :value="null" disabled>-- Chọn nền tảng --</option>
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
              <option value="Metamask">Metamask</option>
              <option value="TrustWallet">Trust Wallet</option>
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
              <option value="PersonalWallet">Ví Cá Nhân (Lưu trữ ngoài)</option>
              <option value="Other">Khác</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Số Lượng Chuyển</label
          >
          <input
            type="number"
            v-model.number="form.quantity"
            step="any"
            min="0"
            :max="availableBalance"
            required
            placeholder="0.00"
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
          />
          <p class="text-[10px] text-gray-500 mt-1">
            Khả dụng:
            <span class="text-white font-bold">{{
              formatNumber(availableBalance)
            }}</span>
            {{ selectedAsset }}
          </p>
        </div>

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Ghi chú (tuỳ chọn)</label
          >
          <input
            type="text"
            v-model="form.note"
            placeholder="Ví dụ: Ví lạnh Ledger 1"
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        <button
          type="submit"
          :disabled="!form.quantity || !form.platform || loading"
          class="w-full py-4 mt-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
        >
          <div
            v-if="loading"
            class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></div>
          <template v-else>
            <PlusIcon class="w-5 h-5" />
            Tạo Ví Lưu Trữ
          </template>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  X as XIcon,
  Wallet as WalletIcon,
  Plus as PlusIcon,
} from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string | null;
  availableBalance: number;
}>();

const emit = defineEmits(["close", "submit"]);
const loading = ref(false);

const form = ref({
  quantity: null as number | null,
  platform: null as string | null,
  note: "",
});

const handleSubmit = async () => {
  if (!form.value.quantity || !form.value.platform) return;
  loading.value = true;
  try {
    await emit("submit", {
      assetSymbol: props.selectedAsset,
      quantity: form.value.quantity,
      platform: form.value.platform,
      note: form.value.note || null,
    });
  } finally {
    loading.value = false;
  }
};

const formatNumber = (num: number) => {
  if (num === undefined || num === null) return "0.00";
  const fractionDigits = num > 0 && num < 0.1 ? 6 : 2;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionDigits,
  });
};
</script>
