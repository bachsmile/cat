<template>
  <div class="h-full p-8 overflow-y-auto custom-scrollbar text-white">
    <div class="flex justify-between items-end mb-12">
      <div class="text-left">
        <h2
          class="text-3xl font-black uppercase text-[#FFD700] tracking-tighter italic"
        >
          Cho Vay & Thu Hồi
        </h2>
        <p
          class="text-gray-500 font-bold mt-2 text-[10px] tracking-[0.3em] uppercase opacity-60"
        >
          Tổ chức Dòng tiền Tín dụng Nội bộ v.1.2
        </p>
      </div>
      <button
        @click="showAddModal = true"
        class="bg-[#FFD700] text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_15px_40px_rgba(255,215,0,0.3)] hover:-translate-y-1 active:scale-95"
      >
        + Thêm khoản vay
      </button>
    </div>

    <!-- 📊 Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div
        class="glass-vibrant p-10 rounded-[40px] flex flex-col justify-center relative overflow-hidden group border-white/5 shadow-2xl"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <p class="text-[9px] text-gray-500 uppercase font-black tracking-[0.4em] mb-4 relative z-10 opacity-60">Tổng cho vay</p>
        <div class="flex items-end gap-2 relative z-10">
          <p class="text-4xl font-black text-white italic tracking-tighter leading-none">
            {{ fmtNumber(totalLoaned) }}
          </p>
          <span class="text-[10px] font-bold text-gray-700 mb-1 italic">₫</span>
        </div>
      </div>
      <div
        class="glass-vibrant p-10 rounded-[40px] flex flex-col justify-center relative overflow-hidden group border-white/5 shadow-2xl"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <p class="text-[9px] text-emerald-500/60 uppercase font-black tracking-[0.4em] mb-4 relative z-10">Đã thu hồi</p>
        <div class="flex items-end gap-2 relative z-10">
          <p class="text-4xl font-black text-emerald-400 italic tracking-tighter leading-none">
            {{ fmtNumber(totalCollected) }}
          </p>
          <span class="text-[10px] font-bold text-emerald-600/40 mb-1 italic">₫</span>
        </div>
      </div>
      <div
        class="glass-vibrant p-10 rounded-[40px] flex flex-col justify-center relative overflow-hidden group border-white/5 shadow-2xl"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <p class="text-[9px] text-red-500/60 uppercase font-black tracking-[0.4em] mb-4 relative z-10">Dư nợ Hiện tại</p>
        <div class="flex items-end gap-2 relative z-10">
          <p class="text-4xl font-black text-red-400 italic tracking-tighter leading-none">
            {{ fmtNumber(totalRemaining) }}
          </p>
          <span class="text-[10px] font-bold text-red-600/40 mb-1 italic">₫</span>
        </div>
      </div>
    </div>

    <!-- 📋 Interface Cluster -->
    <div class="glass-vibrant rounded-[40px] border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
       <!-- Dynamic State Handler -->
       <div v-if="isLoading" class="py-32 flex flex-col items-center justify-center">
          <div class="w-16 h-16 border-[6px] border-[#FFD700]/10 border-t-[#FFD700] rounded-full animate-spin mb-8 shadow-[0_0_40px_rgba(255,215,0,0.2)]"></div>
          <p class="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700] animate-pulse">Khởi tạo Intelligence Stream...</p>
       </div>

       <div v-else-if="loadError" class="py-32 flex flex-col items-center justify-center">
          <div class="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
             <ShieldAlertIcon class="w-8 h-8 text-red-400" />
          </div>
          <h4 class="text-sm font-black text-white uppercase tracking-widest mb-4 italic">Giao thức tải dữ liệu bị chặn</h4>
          <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-10 max-w-[300px] leading-relaxed">{{ loadError }}</p>
          <button @click="loadLoans" class="px-10 py-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] transition-all">Tái khởi tạo (Retry)</button>
       </div>

       <div v-else class="animate-in fade-in duration-700">
          <table v-if="loans.length" class="w-full border-separate border-spacing-y-4 px-10 pb-10 text-left">
            <thead>
              <tr class="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] italic">
                <th class="py-6 px-4">Đối tác / Borrower</th>
                <th class="py-6 px-4">Thông số Tín dụng</th>
                <th class="py-6 px-4 text-right">Dư nợ Chốt</th>
                <th class="py-6 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="loan in loans" 
                :key="loan.id"
                class="bg-white/[0.015] hover:bg-white/[0.05] transition-all group/loan"
              >
                <td class="py-8 px-8 rounded-l-[32px] border-l border-y border-white/5">
                  <div class="flex items-center gap-6">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover/loan:scale-110 group-hover/loan:border-[#FFD700]/30 transition-all duration-500">
                      <span class="text-xl font-black text-white italic">{{ loan.borrower.charAt(0).toUpperCase() }}</span>
                    </div>
                    <div class="text-left">
                      <h4 class="text-base font-black text-white uppercase tracking-tight italic">{{ loan.borrower }}</h4>
                      <p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1.5">{{ new Date(loan.createdAt || loan.date).toLocaleDateString('vi-VN') }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-8 px-6 border-y border-white/5">
                   <div class="flex items-center gap-10">
                      <div class="text-left">
                         <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 opacity-60">Trạng thái</p>
                         <span v-if="loan.hasInterest" class="text-[10px] font-black text-[#FFD700] uppercase italic">Lãi suất {{ loan.interestRate }}%</span>
                         <span v-else class="text-[10px] font-black text-gray-600 uppercase italic">Miễn lãi suất</span>
                      </div>
                      <div class="bg-white/5 h-8 w-px"></div>
                      <div class="text-left">
                         <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 opacity-60">Nguồn vốn (Slot)</p>
                         <p class="text-[10px] font-black text-[#FFD700] uppercase italic tracking-wider">{{ loan.slots || '---' }}</p>
                      </div>
                      <div class="bg-white/5 h-8 w-px"></div>
                      <div class="text-left">
                         <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 opacity-60">Tổng vay Gốc</p>
                         <p class="text-[13px] font-black text-white italic tracking-tighter">{{ fmtNumber(loan.amount) }} <span class="text-[9px] text-gray-700">₫</span></p>
                      </div>
                   </div>
                </td>
                <td class="py-8 px-6 text-right border-y border-white/5">
                   <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 opacity-60">Khối nợ hiện hành</p>
                   <p class="text-xl font-black text-red-400 italic tracking-tighter" :class="{ 'text-emerald-400 grayscale opacity-40': loan.collected >= loan.amount }">
                      {{ fmtNumber(loan.amount - loan.collected) }}
                      <span class="text-[10px] font-sans ml-1">₫</span>
                   </p>
                </td>
                <td class="py-8 px-10 rounded-r-[32px] border-r border-y border-white/5 text-right">
                   <button 
                    v-if="loan.amount > loan.collected"
                    @click="openCollectModal(loan)"
                    class="px-8 py-3 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                   >
                     Thu hồi nợ
                   </button>
                   <div v-else class="flex items-center justify-end gap-2 text-emerald-400 opacity-60 scale-90">
                      <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"></div>
                      <span class="text-[10px] font-black uppercase tracking-[0.2em] italic">Đã thanh khoản</span>
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-else class="py-40 flex flex-col items-center justify-center opacity-20">
             <div class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <HandCoins class="w-10 h-10 text-white" />
             </div>
             <p class="text-[10px] font-black uppercase tracking-[0.5em] text-white">Chưa phát hiện dữ liệu tín dụng</p>
          </div>
       </div>
    </div>

    <!-- Add Loan Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div class="glass-vibrant p-10 rounded-[40px] w-[500px]">
        <h3 class="text-2xl font-black text-white uppercase mb-8">
          Thêm Khoản Vay
        </h3>
        <div class="space-y-6">
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Người vay</label
            >
            <input
              v-model="newLoan.borrower"
              type="text"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              placeholder="Trần Văn A"
            />
          </div>
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Số tiền ({{ assetSymbol }})</label>
              <span class="text-[10px] font-black text-[#FFD700] uppercase tracking-widest italic opacity-80 cursor-pointer hover:opacity-100 transition-opacity" @click="newLoan.amount = assetBalance">Khả dụng: {{ fmtNumber(assetBalance) }} {{ assetSymbol }}</span>
            </div>
            <input
              v-model.number="newLoan.amount"
              type="number"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              :class="{ 'border-red-500/50 text-red-400': (newLoan.amount || 0) > assetBalance }"
              placeholder="0.00"
            />
            <p v-if="(newLoan.amount || 0) > assetBalance" class="text-[9px] font-bold text-red-500 uppercase mt-2 italic">Vượt quá thanh khoản ví (Chỉ còn {{ fmtNumber(assetBalance) }} {{ assetSymbol }})</p>
          </div>

          <div
            class="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer"
            @click="newLoan.hasInterest = !newLoan.hasInterest"
          >
            <div
              class="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-colors"
              :class="
                newLoan.hasInterest
                  ? 'bg-[#FFD700] border-[#FFD700]'
                  : 'bg-transparent'
              "
            >
              <div
                v-if="newLoan.hasInterest"
                class="w-2 h-2 bg-black rounded-full"
              ></div>
            </div>
            <label
              class="text-sm font-bold text-white uppercase tracking-wider cursor-pointer"
              >Tính lãi định kỳ</label
            >
          </div>

          <div
            v-if="newLoan.hasInterest"
            class="animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Lãi suất (%)</label
            >
            <input
              v-model.number="newLoan.interestRate"
              type="number"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Ví dụ: 10"
            />
          </div>
        </div>
        <div class="flex gap-4 mt-10">
          <button
            @click="showAddModal = false"
            class="flex-1 py-4 rounded-2xl border border-white/10 text-white font-black uppercase hover:bg-white/5 transition-all"
          >
            Hủy
          </button>
          <button
            @click="handleAddLoan"
            class="flex-1 py-4 rounded-2xl bg-[#FFD700] text-black font-black uppercase shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] transition-all"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>

    <!-- Collect Debt Modal -->
    <div
      v-if="showCollectModal"
      class="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div class="glass-vibrant p-10 rounded-[40px] w-[500px]">
        <h3 class="text-2xl font-black text-white uppercase mb-8">
          Thu Hồi Nợ
        </h3>
        <p class="text-gray-400 mb-6">
          Đang thu nợ từ:
          <strong class="text-white">{{ activeLoan?.borrower }}</strong>
        </p>
        <div class="space-y-6">
          <div>
            <label
              class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2"
              >Số tiền thu (VNĐ)</label
            >
            <input
              v-model.number="collectAmount"
              type="number"
              class="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Nhập số tiền thu hồi"
            />
            <p class="text-xs text-gray-500 mt-2">
              Gợi ý dư nợ: ₫{{
                fmtNumber(
                  (activeLoan?.amount || 0) - (activeLoan?.collected || 0),
                )
              }}
            </p>
          </div>
        </div>
        <div class="flex gap-4 mt-10">
          <button
            @click="showCollectModal = false"
            class="flex-1 py-4 rounded-2xl border border-white/10 text-white font-black uppercase hover:bg-white/5 transition-all"
          >
            Hủy
          </button>
          <button
            @click="handleCollectDebt"
            class="flex-1 py-4 rounded-2xl bg-emerald-500 text-black font-black uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { HandCoins, ShieldAlert as ShieldAlertIcon } from "lucide-vue-next";
import { getLoans, collectLoan, createLoan } from "@/api/wallet";
import { useToast } from "@/composables/useToast";

const props = defineProps<{
  asset: string | null;
  assetBalance: number;
  assetSymbol: string;
}>();

const emit = defineEmits(["updated"]);
const { showToast } = useToast();
const loans = ref<any[]>([]);
const showAddModal = ref(false);
const showCollectModal = ref(false);

const newLoan = ref({
  borrower: "",
  amount: 0,
  hasInterest: false,
  interestRate: 0,
});
const collectAmount = ref(0);
const activeLoan = ref<any>(null);
const isLoading = ref(false);
const loadError = ref<string | null>(null);

const openAddModal = () => {
  showAddModal.value = true;
};

defineExpose({ openAddModal });

const fmtNumber = (val: number) => {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return new Intl.NumberFormat("vi-VN").format(Math.floor(val));
};

const getWalletToken = (asset?: string | null) => {
  const target = asset || props.asset || 'ALL';
  // If we have a specific asset, try THAT first
  if (target && target.toUpperCase() !== 'ALL') {
    const t = localStorage.getItem(`wallet_token_${target}`);
    if (t) return t;
  }
  
  // Otherwise, or if target token not found, find ANY active wallet token in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('wallet_token_')) {
      const token = localStorage.getItem(key);
      if (token) return token;
    }
  }
  return undefined;
};

const loadLoans = async () => {
  const asset = props.asset || 'ALL';
  isLoading.value = true;
  loadError.value = null;
  console.log(`[Loans] Loading for asset: ${asset}`);
  
  try {
    const token = getWalletToken(asset);
    const data = await getLoans(asset, token);
    loans.value = data;
    console.log(`[Loans] Loaded ${data?.length || 0} loans`);
  } catch (e: any) {
    console.error("Load Loans Error:", e);
    loadError.value = e.response?.data?.message || e.message || "Lỗi tải danh sách";
    loans.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadLoans();
});

watch(
  () => props.asset,
  () => {
    loadLoans();
  },
);

const totalLoaned = computed(() =>
  loans.value.reduce((acc, l) => acc + (Number(l.amount) || 0), 0),
);
const totalCollected = computed(() =>
  loans.value.reduce((acc, l) => acc + (Number(l.collected) || 0), 0),
);
const totalRemaining = computed(() => Math.max(0, totalLoaned.value - totalCollected.value));

const handleAddLoan = async () => {
  if (!newLoan.value.borrower || !newLoan.value.amount || newLoan.value.amount <= 0) return;

  if (newLoan.value.amount > props.assetBalance) {
    showToast(`Số dư ${props.assetSymbol} không đủ để thực hiện khoản vay này`, "error");
    return;
  }

  try {
    await createLoan({
      assetSymbol: props.assetSymbol,
      borrower: newLoan.value.borrower,
      amount: Number(newLoan.value.amount),
      hasInterest: newLoan.value.hasInterest,
      interestRate: newLoan.value.hasInterest
        ? Number(newLoan.value.interestRate)
        : 0,
    }, getWalletToken());

    await loadLoans(); // Reload from server
    showAddModal.value = false;
    newLoan.value = {
      borrower: "",
      amount: 0,
      hasInterest: false,
      interestRate: 0,
    };
    showToast("Đã thêm khoản vay hệ thống!");
  } catch (error: any) {
    showToast(error.response?.data?.message || "Lỗi khi thêm", "error");
  }
};

const openCollectModal = (loan: any) => {
  activeLoan.value = loan;
  collectAmount.value = loan.amount - loan.collected;
  showCollectModal.value = true;
};

const handleCollectDebt = async () => {
  if (!activeLoan.value || collectAmount.value <= 0) return;

  try {
    await collectLoan(activeLoan.value.id, collectAmount.value, getWalletToken());
    showCollectModal.value = false;
    emit("updated");
    activeLoan.value = null;
    collectAmount.value = 0;
    showToast("Thu hồi nợ thành công!");
  } catch (error: any) {
    showToast(error.response?.data?.message || "Lỗi khi thu nợ", "error");
  }
};
</script>

<style scoped>
.glass-vibrant {
  background: rgba(13, 13, 16, 0.85);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
