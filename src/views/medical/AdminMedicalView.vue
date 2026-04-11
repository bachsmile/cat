<template>
  <div class="p-4 md:p-8 lg:p-12 max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-visible">
    <!-- Global Admin Header -->
    <CgCard type="heavy-frost" :shadow="true" class="flex flex-col lg:flex-row items-center justify-between p-8 rounded-[3.5rem] border border-white/5 gap-8">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-rose-500/30 scale-110">
          <StethoscopeIcon class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-3xl font-black italic tracking-tighter text-white tracking-widest bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
            MEDICAL <span class="text-red-400">CENTER</span>
          </h2>
          <div class="flex items-center gap-3 mt-1">
            <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
              HỆ THỐNG QUẢN LÝ Y TẾ AI
            </p>
          </div>
        </div>
      </div>
    </CgCard>

    <div class="flex items-center gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/5 w-fit">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-nowrap"
        :class="activeTab === tab.id ? 'bg-red-600 text-white shadow-xl shadow-red-500/30' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
        {{ tab.label }}
      </button>
    </div>

    <CgCard type="heavy-frost" class="p-20 text-center rounded-[3rem]">
      <ActivityIcon class="w-16 h-16 mx-auto mb-6 text-red-400 opacity-30" />
      <h3 class="text-2xl font-black text-white mb-4 italic">MODULE Y TẾ</h3>
      <p class="text-gray-500">Đang đồng bộ hóa dữ liệu bệnh án và lịch khám.</p>
    </CgCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Stethoscope as StethoscopeIcon, Activity as ActivityIcon } from 'lucide-vue-next';
import { CgCard } from 'glass-studio-ui-pro';

const activeTab = ref('records');
const tabs = [
  { id: 'records', label: 'Hồ sơ bệnh án' },
  { id: 'appointments', label: 'Lịch khám' },
  { id: 'consult', label: 'Tư vấn AI' },
];
</script>
