<template>
  <div
    class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in"
  >
    <div
      class="bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
    >
      <!-- Header -->
      <div class="p-8 border-b border-white/5 flex justify-between items-center">
        <div>
          <h3 class="text-3xl font-black text-white tracking-tighter">
            Chi Tiết Tiền Gửi
          </h3>
          <p class="text-gray-500 font-medium text-sm mt-1">
            Danh sách toàn bộ các sổ tiết kiệm đang hoạt động
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
        >
          <XIcon class="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <!-- Filters & Actions -->
      <div class="px-8 py-6 bg-white/[0.02] border-b border-white/5 flex flex-wrap gap-4 items-center">
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Lọc Ví:</span>
          <div class="flex gap-2">
            <button
              @click="filterAsset = null"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
              :class="!filterAsset ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'"
            >
              Tất cả
            </button>
            <button
              v-for="asset in availableAssets"
              :key="asset"
              @click="filterAsset = asset"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
              :class="filterAsset === asset ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'"
            >
              {{ asset }}
            </button>
          </div>
        </div>
        
        <div class="flex items-center gap-3 ml-auto">
          <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Loại hình:</span>
          <div class="flex gap-2">
            <button
              v-for="type in [{id: null, label: 'Tất cả'}, {id: 'flexible', label: 'Linh hoạt'}, {id: 'fixed', label: 'Cố định'}]"
              :key="type.label"
              @click="filterType = type.id"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
              :class="filterType === type.id ? 'bg-purple-500 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'"
            >
              {{ type.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div v-if="filteredList.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="saving in filteredList"
            :key="saving.id"
            class="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
          >
            <div class="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-xl">
                    {{ saving.assetSymbol === "USDT" ? "₮" : saving.assetSymbol === "BTC" ? "₿" : saving.assetSymbol === "ETH" ? "Ξ" : "₫" }}
                  </div>
                  <div>
                    <h4 class="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">{{ saving.assetSymbol }}</h4>
                    <p class="text-[10px] text-gray-500 font-black uppercase tracking-widest">{{ saving.platform }}</p>
                  </div>
                </div>
                <div class="flex flex-col items-end">
                  <div class="px-2 py-1 bg-emerald-500/10 rounded-lg mb-1">
                    <span class="text-[10px] text-emerald-400 font-black">{{ Number(saving.annualRate).toFixed(2) }}%/năm</span>
                  </div>
                  <span 
                    class="text-[9px] font-black uppercase px-2 py-0.5 rounded border"
                    :class="saving.savingsType === 'fixed' ? 'border-purple-500/30 text-purple-400 bg-purple-500/5' : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'"
                  >
                    {{ saving.savingsType === 'fixed' ? 'Cố định' : 'Linh hoạt' }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5">Số lượng gửi</p>
                  <p class="text-xl font-black text-white">
                    {{ formatNumber(Number(saving.quantity)) }}
                    <span class="text-xs text-gray-500">{{ saving.assetSymbol }}</span>
                  </p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5">
                    {{ saving.savingsType === 'flexible' && saving.lastDailyInterest > 0 ? 'Lãi hôm qua' : 'Lãi ước tính/ngày' }}
                  </p>
                  <p class="text-xl font-black text-emerald-400">
                    +{{ 
                      formatNumber(
                        saving.savingsType === 'flexible' && saving.lastDailyInterest > 0
                          ? Number(saving.lastDailyInterest)
                          : (Number(saving.quantity) * Number(saving.annualRate)) / 100 / 365
                      )
                    }}
                    <span class="text-xs text-gray-500">{{ saving.assetSymbol }}</span>
                  </p>
                </div>
              </div>

              <div class="pt-6 border-t border-white/5 flex items-center justify-between">
                <div class="space-y-1">
                  <p class="text-[10px] text-gray-500 flex items-center gap-1.5">
                    <CalendarIcon class="w-3 h-3" />
                    Bắt đầu: {{ new Date(saving.startDate).toLocaleDateString("vi-VN") }}
                  </p>
                  <p v-if="saving.savingsType === 'fixed' && saving.endDate" class="text-[10px] text-purple-400 flex items-center gap-1.5">
                    <ClockIcon class="w-3 h-3" />
                    Đáo hạn: {{ new Date(saving.endDate).toLocaleDateString("vi-VN") }}
                  </p>
                </div>
                <button
                  v-if="saving.status === 'active' && saving.savingsType === 'flexible'"
                  @click="$emit('withdraw', saving.id)"
                  class="px-4 py-2 bg-white/5 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20"
                >
                  Rút Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <SearchIcon class="w-10 h-10 text-gray-600" />
          </div>
          <h4 class="text-white font-bold text-lg mb-2">Không tìm thấy sổ gửi nào</h4>
          <p class="text-gray-500 text-sm">Thử thay đổi bộ lọc để xem các kết quả khác.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  X as XIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Search as SearchIcon,
} from "lucide-vue-next";

const props = defineProps<{
  savingsList: any[];
}>();

const emit = defineEmits(["close", "withdraw"]);

const filterAsset = ref<string | null>(null);
const filterType = ref<string | null>(null);

const availableAssets = computed(() => {
  const assets = new Set<string>();
  props.savingsList.forEach(s => assets.add(s.assetSymbol));
  return Array.from(assets).sort();
});

const filteredList = computed(() => {
  return props.savingsList.filter(s => {
    const matchAsset = !filterAsset.value || s.assetSymbol === filterAsset.value;
    const matchType = !filterType.value || s.savingsType === filterType.value;
    return matchAsset && matchType;
  });
});

const formatNumber = (num: number) => {
  if (num === undefined || num === null) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
