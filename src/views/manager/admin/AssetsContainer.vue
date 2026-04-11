<template>
  <div class="animate-in fade-in duration-500">
    <!-- Sub-navigation Tabs -->
    <div class="flex items-center gap-1 p-1 bg-white/5 border border-white/5 rounded-2xl w-fit mb-10 backdrop-blur-xl">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeSubTab = tab.id"
        class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative overflow-hidden group"
        :class="activeSubTab === tab.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:text-gray-300'"
      >
        <div class="flex items-center gap-2 relative z-10">
          <component :is="tab.icon" class="w-3.5 h-3.5" />
          {{ tab.name }}
        </div>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="transition-all duration-500">
      <AssetReportsView v-if="activeSubTab === 'reports'" />
      <AssetsView v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  BarChart3 as ChartIcon, 
  Wallet as WalletIcon 
} from 'lucide-vue-next';
import AssetReportsView from './AssetReportsView.vue';
import AssetsView from './AssetsView.vue';

const activeSubTab = ref('management');

const tabs = [
  { id: 'management', name: 'Quản lý danh mục', icon: WalletIcon },
  { id: 'reports', name: 'Báo cáo tổng quan', icon: ChartIcon },
];

</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
