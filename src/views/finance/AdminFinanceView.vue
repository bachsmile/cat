<template>
  <div class="p-4 md:p-8 lg:p-12 max-w-[1700px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- SVG Gooey Filter -->
    <svg style="position: absolute; width: 0; height: 0;" aria-hidden="true">
      <defs>
        <filter id="finance-liquid-gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <!-- Global Admin Header -->
    <CgCard type="heavy-frost" :shadow="true" class="flex flex-col lg:flex-row items-center justify-between p-8 rounded-[3.5rem] border border-white/5 gap-8">
      <div class="flex items-center gap-6">
        <div class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 scale-110">
          <BriefcaseIcon class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-3xl font-black italic tracking-tighter text-white tracking-widest bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            FINANCIAL <span class="text-indigo-400">COMMAND</span>
          </h2>
          <div class="flex items-center gap-3 mt-1">
            <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
              TRÌNH QUẢN TRỊ NGUỒN VỐN & CHIẾN LƯỢC
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="router.push('/finance/user/home')" class="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 rounded-[2rem] transition-all duration-500 shadow-2xl hover:shadow-indigo-500/20 active:scale-95">
          <div class="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-white transition-all transform group-hover:rotate-12">
            <UserIcon class="w-5 h-5" />
          </div>
          <div class="text-left">
            <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:text-indigo-100">Chuyển sang</p>
            <span class="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-white">Giao diện khách</span>
          </div>
        </button>
      </div>
    </CgCard>

    <!-- Tab Switcher -->
    <div class="flex items-center gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/5 w-fit overflow-visible max-w-full">
      <div v-for="tab in tabs" :key="tab.id" class="relative flex flex-col items-center cursor-pointer group" @click="activeTab = tab.id">
        <div v-if="activeTab === tab.id" class="absolute inset-0 z-0 pointer-events-none" style="filter: url(#finance-liquid-gooey);">
          <div class="absolute inset-0 bg-indigo-500 rounded-2xl animate-liquid-morph scale-110 opacity-40 shadow-inner shadow-white/40"></div>
        </div>
        <button class="relative z-10 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all text-nowrap"
          :class="activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'">
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="space-y-8">
      <template v-if="activeTab === 'loans'">
        <LoansManagementView :asset="null" :assetSymbol="'VND'" :assetBalance="0" />
      </template>

      <template v-else-if="activeTab === 'assets'">
        <AssetsView />
      </template>

      <template v-else-if="activeTab === 'vault'">
        <WalletsVaultView />
      </template>

      <template v-else-if="activeTab === 'reports'">
        <AssetReportsView />
      </template>

      <template v-else-if="activeTab === 'blockchain'">
        <BlockchainView />
      </template>

      <template v-else>
        <CgCard type="heavy-frost" class="p-12 text-center rounded-[3rem]">
          <h3 class="text-2xl font-black text-white mb-4 italic">COMMING SOON</h3>
          <p class="text-gray-400">Phân hệ này đang được tối ưu hóa dữ liệu thực tế.</p>
        </CgCard>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Briefcase as BriefcaseIcon, 
  User as UserIcon, 
} from 'lucide-vue-next';
import { CgCard } from 'glass-studio-ui-pro';
import LoansManagementView from '../manager/admin/LoansManagementView.vue';
import AssetsView from '../manager/admin/AssetsView.vue';
import WalletsVaultView from '../manager/admin/WalletsVaultView.vue';
import AssetReportsView from '../manager/admin/AssetReportsView.vue';
import BlockchainView from '../manager/admin/BlockchainView.vue';

const router = useRouter();
const activeTab = ref('loans');

const tabs = [
  { id: 'loans', label: 'Quản lý Nợ' },
  { id: 'assets', label: 'Tài sản' },
  { id: 'vault', label: 'Vault' },
  { id: 'reports', label: 'Báo cáo' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'ai-market', label: 'Thị trường AI' },
];
</script>

<style scoped>
@keyframes liquid-morph {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
  67% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}
.animate-liquid-morph {
  animation: liquid-morph 8s ease-in-out infinite;
}
</style>
