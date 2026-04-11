<template>
  <div class="animate-in fade-in duration-700">
    <div
      class="glass-vibrant p-10 rounded-[40px] flex flex-col relative overflow-hidden border-[#FFD700]/10 text-left min-h-[600px] shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
    >
      <div class="flex justify-between items-center mb-12">
        <div class="flex items-center gap-5">
          <div
            class="w-2.5 h-12 bg-[#FFD700] rounded-full shadow-[0_0_20px_#FFD700] animate-pulse"
          ></div>
          <div>
            <h4
              class="text-xl font-black text-white uppercase tracking-[0.3em] italic text-glow"
            >
              HỢP ĐỒNG GỬI LÃI
            </h4>
            <p
              class="text-[9px] text-[#FFD700]/70 font-black uppercase tracking-[0.5em] mt-2 italic"
            >
              KHO LÃI SUẤT CHIẾN LƯỢC
            </p>
          </div>
        </div>
        <button
          @click="$emit('openModal')"
          class="px-8 py-3.5 rounded-2xl bg-[#FFD700] text-black text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(255,215,0,0.3)] hover:scale-105 active:scale-95 transition-all italic border border-white/10 hover:shadow-[#FFD700]/50"
        >
          + GỬI LÃI MỚI
        </button>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[750px] custom-scrollbar pr-2"
      >
        <div
          v-for="item in filteredSavings"
          :key="item.id"
          class="flip-card h-[320px] group cursor-pointer"
        >
          <div class="flip-card-inner">
            <!-- FRONT SIDE -->
            <div
              class="flip-card-front p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col justify-between shadow-xl"
            >
              <div class="flex justify-between items-start italic">
                <div
                  class="w-12 h-12 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] border border-[#FFD700]/20"
                >
                  <component
                    :is="item.savingsType === 'fixed' ? ClockIcon : ActivityIcon"
                    class="w-6 h-6"
                  />
                </div>
                <span
                  class="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-[11px] font-black text-emerald-400 italic border border-emerald-500/20"
                  >+{{ item.annualRate }}%/N</span
                >
              </div>

              <div>
                <p
                  class="text-xl font-black text-white italic tracking-tighter leading-none mb-2"
                >
                  {{ item.platform }}
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p class="text-[8px] font-bold text-gray-500 uppercase tracking-widest">ĐANG HOẠT ĐỘNG</p>
                </div>
              </div>

              <div class="pt-6 border-t border-white/5 mt-4">
                <p class="text-3xl font-black text-white tracking-tighter italic">
                  {{ formatNumber(item.quantity) }}
                  <span class="text-[10px] text-gray-600 ml-1">{{ selectedAsset }}</span>
                </p>
                <div class="flex justify-between items-end mt-4">
                  <p class="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Lợi nhuận hiện tại</p>
                  <p class="text-xl font-black text-emerald-400 italic">
                    +{{ formatNumber(item.accruedInterest || 0) }}
                    <span class="text-[10px] ml-0.5">₫</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- BACK SIDE -->
            <div
              class="flip-card-back p-8 rounded-[32px] bg-[#0A0A0B] border border-[#FFD700]/30 flex flex-col justify-between shadow-2xl"
            >
              <div class="space-y-4">
                <div>
                  <p class="text-[8px] font-bold text-[#FFD700] uppercase tracking-widest mb-1.5">Thời gian bắt đầu</p>
                  <p class="text-xs font-black text-white italic">{{ formatDateTime(item.startDate) }}</p>
                </div>
                <div v-if="item.endDate">
                  <p class="text-[8px] font-bold text-[#FFD700] uppercase tracking-widest mb-1.5">Ngày đáo hạn</p>
                  <p class="text-xs font-black text-white italic">{{ formatDateTime(item.endDate) }}</p>
                </div>
                <div>
                  <p class="text-[8px] font-bold text-[#FFD700] uppercase tracking-widest mb-1.5">Ghi chú</p>
                  <p class="text-[10px] text-gray-400 italic leading-relaxed">{{ item.note || 'Không có ghi chú' }}</p>
                </div>
              </div>

              <div class="space-y-3 mt-4">
                <button
                  @click.stop="$emit('withdraw', item.id)"
                  class="w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCwIcon class="w-3.5 h-3.5" /> TẤT TOÁN VÀO VÍ
                </button>
                <button
                  @click.stop="$emit('delete', item.id)"
                  class="w-full py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Trash2Icon class="w-3.5 h-3.5" /> XOÁ HỢP ĐỒNG
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!filteredSavings.length"
          class="col-span-full py-32 flex flex-col items-center justify-center opacity-20 italic"
        >
          <PiggyBankIcon class="w-20 h-20 mb-8 text-gray-500" />
          <p class="text-xs font-black uppercase tracking-[0.8em] text-gray-500">
            CHƯA CÓ HỢP ĐỒNG GỬI LÃI
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  PiggyBank as PiggyBankIcon,
  Activity as ActivityIcon,
  Clock as ClockIcon,
  RefreshCw as RefreshCwIcon,
  Trash2 as Trash2Icon,
} from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string;
  savingsSummary: any;
  formatNumber: (val: number) => string;
  formatDateTime: (ts: any) => string;
}>();

defineEmits(["openModal", "withdraw", "delete"]);

const filteredSavings = computed(() => {
  return (
    props.savingsSummary?.details?.filter(
      (d: any) => d.assetSymbol === props.selectedAsset,
    ) || []
  );
});
</script>

<style scoped>
.flip-card {
  perspective: 1000px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
}
.flip-card-back {
  transform: rotateY(180deg);
}
.text-glow {
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}
</style>
