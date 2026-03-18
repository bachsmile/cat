<template>
  <div
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-in fade-in"
  >
    <div
      class="bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
    >
      <button
        @click="$emit('close')"
        class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
      >
        <XIcon class="w-6 h-6" />
      </button>
      <h3 class="text-2xl font-bold mb-6">
        <PiggyBankIcon class="w-6 h-6 inline mr-2 text-emerald-400" />
        Gửi Lãi
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
            >Nguồn Tiền</label
          >
          <select
            v-model="form.sourceCombined"
            @change="handleSourceChange"
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-bold"
          >
            <option value="main">
              Ví Gốc (Ví Khả Dụng) - {{ formatNumber(availableBalance) }} {{ selectedAsset }}
            </option>
            <optgroup v-if="storageWallets?.length" label="Ví Lưu Trữ">
              <option
                v-for="w in storageWallets"
                :key="w.id"
                :value="`storage:${w.id}`"
              >
                {{ w.platform }} - {{ formatNumber(w.quantity) }} {{ selectedAsset }}
              </option>
            </optgroup>
          </select>
        </div>

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3"
            >Loại Hình Gửi Lãi</label
          >
          <div class="grid grid-cols-2 gap-4">
            <label
              class="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all"
              :class="
                form.savingsType === 'flexible'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              "
            >
              <input
                type="radio"
                value="flexible"
                v-model="form.savingsType"
                class="hidden"
              />
              <span
                class="text-sm font-bold block"
                :class="
                  form.savingsType === 'flexible'
                    ? 'text-emerald-400'
                    : 'text-gray-300'
                "
                >Linh Hoạt</span
              >
              <span class="text-[10px] text-gray-500 mt-1 text-center"
                >Cộng lãi hàng ngày</span
              >
            </label>
            <label
              class="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all"
              :class="
                form.savingsType === 'fixed'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              "
            >
              <input
                type="radio"
                value="fixed"
                v-model="form.savingsType"
                class="hidden"
              />
              <span
                class="text-sm font-bold block"
                :class="
                  form.savingsType === 'fixed'
                    ? 'text-emerald-400'
                    : 'text-gray-300'
                "
                >Cố Định</span
              >
              <span class="text-[10px] text-gray-500 mt-1 text-center"
                >Cộng lãi cuối kỳ</span
              >
            </label>
          </div>
        </div>

        <div v-if="form.savingsType === 'fixed'">
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Thời Gian Gửi (Ngày)</label
          >
          <input
            type="number"
            v-model.number="form.durationDays"
            min="1"
            required
            placeholder="Ví dụ: 30"
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
              >Số Lượng Gửi</label
            >
            <input
              type="number"
              v-model.number="form.quantity"
              step="any"
              min="0"
              :max="currentAvailableBalance"
              required
              placeholder="0.00"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
            <p class="text-[10px] text-gray-500 mt-1">
              Khả dụng:
              <span class="text-white font-bold">{{
                formatNumber(currentAvailableBalance)
              }}</span>
              {{ selectedAsset }}
            </p>
          </div>
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
              >Lãi Suất (%/Năm)</label
            >
            <input
              type="number"
              v-model.number="form.annualRate"
              step="0.01"
              min="0"
              max="100"
              required
              placeholder="5.5"
              class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Nơi Gửi Lãi</label
          >
          <select
            v-model="form.platform"
            required
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          >
            <option :value="null" disabled>-- Chọn nơi gửi --</option>
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

        <div>
          <label
            class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >Ghi chú (tuỳ chọn)</label
          >
          <input
            type="text"
            v-model="form.note"
            placeholder="Ví dụ: Flexible Savings 30 ngày"
            class="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        <!-- Interest Estimation -->
        <div
          v-if="form.quantity && form.annualRate"
          class="p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl"
        >
          <p
            class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2"
          >
            <TrendingUpIcon class="w-4 h-4" />
            Ước Tính Lãi Suất
          </p>

          <!-- Time filter -->
          <div class="flex items-center gap-2 mb-4">
            <button
              v-for="period in ['day', 'month', 'year']"
              :key="period"
              type="button"
              @click="estimatePeriod = period"
              class="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
              :class="
                estimatePeriod === period
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              "
            >
              {{
                period === "day" ? "Ngày" : period === "month" ? "Tháng" : "Năm"
              }}
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">
                Lãi {{ periodLabel }}
              </p>
              <p class="text-xl font-black text-emerald-400">
                +{{ formatNumber(estimatedProfit) }}
                <span class="text-xs text-gray-500">{{ selectedAsset }}</span>
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">
                Tổng sau {{ periodLabel }}
              </p>
              <p class="text-xl font-black text-white">
                {{ formatNumber((form.quantity || 0) + estimatedProfit) }}
                <span class="text-xs text-gray-500">{{ selectedAsset }}</span>
              </p>
            </div>
          </div>
        </div>

          <button
            type="submit"
            :disabled="
              !form.quantity ||
              !form.annualRate ||
              !form.platform ||
              (form.savingsType === 'fixed' && !form.durationDays) ||
              form.quantity > currentAvailableBalance ||
              (form.sourceType === 'storage' && !form.storageId)
            "
          class="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
        >
          <PiggyBankIcon class="w-5 h-5" />
          Xác Nhận Gửi Lãi
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  X as XIcon,
  PiggyBank as PiggyBankIcon,
  TrendingUp as TrendingUpIcon,
} from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string | null;
  availableBalance: number;
  storageWallets?: any[];
}>();

const emit = defineEmits(["close", "submit"]);

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
    const w = props.storageWallets?.find(w => w.id === form.value.storageId);
    return w ? w.quantity : 0;
  }
  return 0;
});

const estimatePeriod = ref("day");

const periodLabel = computed(() => {
  switch (estimatePeriod.value) {
    case "day":
      return "1 ngày";
    case "month":
      return "1 tháng";
    case "year":
      return "1 năm";
    default:
      return "";
  }
});

const estimatedProfit = computed(() => {
  if (!form.value.quantity || !form.value.annualRate) return 0;
  const dailyRate = form.value.annualRate / 100 / 365;
  const qty = form.value.quantity;

  switch (estimatePeriod.value) {
    case "day":
      return qty * dailyRate;
    case "month":
      return qty * dailyRate * 30;
    case "year":
      return qty * (form.value.annualRate / 100);
    default:
      return 0;
  }
});

const handleSubmit = () => {
  if (!form.value.quantity || !form.value.annualRate || !form.value.platform)
    return;
  if (form.value.savingsType === "fixed" && !form.value.durationDays) return;

  emit("submit", {
    assetSymbol: props.selectedAsset,
    quantity: form.value.quantity,
    annualRate: form.value.annualRate,
    platform: form.value.platform,
    savingsType: form.value.savingsType,
    durationDays: form.value.durationDays,
    note: form.value.note || null,
    storageId: form.value.sourceType === 'storage' ? form.value.storageId : undefined,
  });
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
