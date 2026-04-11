<template>
  <div class="animate-in fade-in duration-700">
    <div class="glass-vibrant p-12 rounded-[50px] flex flex-col relative overflow-hidden border-orange-500/10 text-left min-h-[700px] shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
      <div class="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
        <div class="flex items-center gap-7">
          <div class="w-3.5 h-16 bg-orange-500 rounded-full shadow-[0_0_30px_#f97316] animate-pulse"></div>
          <div>
            <h4 class="text-2xl font-black text-white uppercase tracking-[0.4em] italic shadow-orange-500/20 text-glow">HỆ THỐNG LƯU TRỮ LẠNH (COLD)</h4>
            <p class="text-[11px] text-orange-400/80 font-black uppercase tracking-[0.6em] mt-3 italic shadow-inner">TÀI LIỆU LƯU TRỮ LẠNH AN TOÀN</p>
          </div>
        </div>
        <button 
          @click="$emit('openModal')"
          class="px-14 py-5 rounded-[28px] bg-orange-600 text-black text-sm font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-all italic border border-white/10 hover:shadow-orange-500/80"
        >
          + THÊM VÍ LƯU TRỮ
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 overflow-y-auto max-h-[850px] custom-scrollbar pr-4">
        <div v-for="wallet in filteredWallets" :key="wallet.id" class="p-10 rounded-[50px] bg-white/[0.012] border border-white/5 hover:border-orange-500/50 transition-all group/store shadow-2xl text-left active:scale-[0.98]">
          <div class="flex items-center gap-6 mb-12 italic">
            <div class="w-18 h-18 rounded-[30px] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner group-hover/store:rotate-12 transition-transform border-white/5 italic shadow-2xl">
              <StorageIcon class="w-9 h-9" />
            </div>
            <div>
              <p class="text-2xl font-black text-white italic tracking-tighter leading-none">{{ wallet.platform }}</p>
              <p class="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-2 italic shadow-inner">NÚT LƯU TRỮ LẠNH BẢO MẬT</p>
            </div>
          </div>
          <div class="border-t border-white/5 pt-10 mb-14">
            <p class="text-5xl font-black text-white italic tracking-tighter leading-none shadow-orange-500/5 drop-shadow-2xl">
              {{ formatNumber(wallet.quantity) }}
              <span class="text-sm text-gray-700 italic not-italic font-black uppercase ml-3 font-sans shadow-inner leading-none">{{ selectedAsset }}</span>
            </p>
            <div class="w-full h-2.5 bg-white/5 rounded-full mt-10 overflow-hidden shadow-inner p-0.5">
              <div class="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_20px_#f97316]" style="width: 100%"></div>
            </div>
          </div>
          <button @click="$emit('withdraw', wallet.id)" class="w-full py-6 rounded-[28px] bg-white/[0.03] border border-white/5 text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 hover:bg-orange-600 hover:text-black hover:shadow-2xl transition-all italic font-bold">YÊU CẦU GIẢI PHÓNG TÀI SẢN</button>
        </div>
        <div v-if="!filteredWallets.length" class="col-span-12 py-44 flex flex-col items-center justify-center opacity-10 italic">
          <StorageIcon class="w-32 h-32 mb-12 text-gray-600 border-transparent shadow-2xl" />
          <p class="text-base font-black uppercase tracking-[1em] text-gray-600">KHÔNG CÓ BẢN GHI LƯU TRỮ LẠNH</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Database as StorageIcon } from "lucide-vue-next";

const props = defineProps<{
  selectedAsset: string;
  storageWallets: any[];
  formatNumber: (val: number) => string;
}>();

defineEmits(['openModal', 'withdraw']);

const filteredWallets = computed(() => {
  return props.storageWallets?.filter((w: any) => w.assetSymbol === props.selectedAsset) || [];
});
</script>
