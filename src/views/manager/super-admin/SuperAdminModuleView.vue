<template>
  <div class="flex h-screen bg-[#f3f4f9] p-6 lg:p-10 overflow-hidden">
    <!-- 1. Symbolic Symbolic Sidebar -->
    <CgCard
      type="glass-frost"
      :shadow="true"
      class="w-20 lg:w-28 flex flex-col items-center py-10 rounded-[3.5rem] border border-white/50 mr-8"
    >
      <nav class="flex-1 flex flex-col gap-10">
        <CgButton
          variant="ghost"
          @click="router.push('/sp-ad')"
          class="p-4 rounded-2xl transition-all active:scale-95 group mb-6"
        >
          <ChevronLeftIcon
            class="w-6 h-6 group-hover:-translate-x-1 transition-transform text-gray-400 group-hover:text-brand-600"
          />
        </CgButton>
        <CgButton
          v-for="sub in allSubs"
          :key="sub.id"
          variant="ghost"
          @click="activeSubId = sub.id"
          class="w-14 h-14 p-0 rounded-2xl transition-all flex items-center justify-center overflow-hidden group/btn"
          :class="{
            'shadow-lg scale-110 !border-white/40': activeSubId === sub.id,
          }"
        >
          <div
            class="absolute inset-0 transition-all duration-500"
            :class="[
              activeSubId === sub.id ? sub.colorClass : 'bg-transparent'
            ]"
          ></div>
          <component 
            :is="sub.icon" 
            class="w-6 h-6 z-10 transition-all duration-300" 
            :class="[
              activeSubId === sub.id ? 'text-white scale-110' : 'text-gray-400 group-hover/btn:text-gray-600'
            ]"
          />
        </CgButton>
      </nav>

      <div class="mt-8">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          class="w-12 h-12 rounded-2xl border-2 border-white/50 shadow-xl"
        />
      </div>
    </CgCard>

    <!-- 2. Main High-Fidelity Content Area -->
    <CgCard
      type="heavy-frost"
      :shadow="true"
      class="flex-1 rounded-[4rem] border border-white/50 p-12 lg:p-16 flex flex-col relative overflow-hidden"
    >
      <div v-if="!activeSubId" class="flex flex-col h-full">
        <!-- Breadcrumb / Header -->
        <header class="flex items-center justify-between mb-12">
          <div
            @click="router.push('/sp-ad')"
            class="flex items-center gap-4 txt-gray-400 font-black group cursor-pointer hover:txt-brand-900 transition-colors"
          >
            <span class="text-xl uppercase tracking-tighter"
              >Super Admin Hub</span
            >
            <span class="opacity-30">/</span>
            <span class="text-xl txt-brand-900 uppercase tracking-tighter">{{
              moduleName
            }}</span>
          </div>

          <div class="flex items-center gap-8">
            <div class="flex items-center gap-3">
              <ActivityIcon class="w-5 h-5 txt-brand-600" />
              <span class="text-xl font-black txt-brand-900">98% Uptime</span>
            </div>
            <CgButton
              variant="ghost"
              class="w-10 h-10 flex items-center justify-center rounded-full"
            >
              <MoreHorizontalIcon class="w-5 h-5 txt-gray-300" />
            </CgButton>
          </div>
        </header>

        <h1
          class="text-4xl lg:text-5xl font-black txt-brand-900 tracking-tighter mb-8 bg-clip-text"
        >
          Module <span class="txt-orange-500">Analytics</span>
        </h1>

        <!-- Gauge Widget (Smart Dashboard Style) -->
        <div class="flex-1 flex flex-col items-center justify-center relative">
          <div
            class="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center"
          >
            <!-- Circular Gauge Background -->
            <svg class="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="rgba(243, 244, 249, 0.5)"
                stroke-width="12"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="#5c59f0"
                stroke-width="12"
                fill="transparent"
                stroke-dasharray="283"
                stroke-dashoffset="60"
                stroke-linecap="round"
                style="transition: stroke-dashoffset 2s ease-in-out"
              />
            </svg>

            <div class="z-10 text-center">
              <p
                class="text-xs font-black txt-gray-400 uppercase tracking-widest mb-1"
              >
                Active Users
              </p>
              <h2
                class="text-7xl lg:text-8xl font-black txt-brand-900 tracking-tighter"
              >
                1,240
              </h2>
              <div
                class="flex items-center justify-center gap-2 mt-4 text-green-500"
              >
                <TrendingUpIcon class="w-4 h-4" />
                <span class="text-xs font-black tracking-widest"
                  >+12% VS LAST WEEK</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Status Grid -->
        <div class="mt-auto grid grid-cols-3 gap-10">
          <CgCard
            v-for="stat in ['Load Index', 'Latency', 'Error Rate']"
            :key="stat"
            type="fine-frost"
            class="p-6 rounded-3xl border border-white/50"
          >
            <p
              class="text-[10px] font-black txt-gray-400 uppercase tracking-[0.2em] mb-2"
            >
              {{ stat }}
            </p>
            <h4 class="text-2xl font-black txt-brand-900">
              {{ Math.floor(Math.random() * 100) }}%
            </h4>
          </CgCard>
        </div>
      </div>

      <!-- Specific Sub-Unit Content -->
      <div
        v-else
        class="flex flex-col h-full overflow-y-auto pr-4 scrollbar-hide"
      >
        <header class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <CgButton
              variant="ghost"
              @click="activeSubId = null"
              class="p-3 text-gray-400 rounded-2xl hover:text-brand-900 transition-all"
            >
              <ChevronLeftIcon class="w-5 h-5" />
            </CgButton>
            <div>
              <h3
                class="text-xs font-black uppercase tracking-[0.2em] text-gray-400"
              >
                Unit Control
              </h3>
              <h2 class="text-2xl font-black text-brand-900">
                {{ currentSub?.name }}
              </h2>
            </div>
          </div>
        </header>

        <div class="flex-1">
          <SuperAdminOrganizationView :module="moduleName" v-if="activeSubId === 'organizations'" />
          <div
            v-else
            class="flex flex-col items-center justify-center h-full text-center"
          >
            <CgCard
              type="glass-frost"
              class="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
            >
              <component
                :is="currentSub?.icon"
                class="w-10 h-10 text-brand-600/50"
              />
            </CgCard>
            <h3 class="text-2xl font-black text-brand-900 mb-2">
              {{ currentSub?.name }}
            </h3>
            <p class="text-gray-400 max-w-sm font-bold uppercase text-[10px] tracking-widest leading-loose">
              Chúng tôi đang hoàn thiện các chức năng cho đơn vị điều khiển này.
              Vui lòng quay lại sau.
            </p>
          </div>
        </div>
      </div>
    </CgCard>

    <!-- 3. Right Sidebar (Module Shortcuts) -->
    <aside
      class="w-80 lg:w-96 pl-12 flex flex-col gap-12 py-8 overflow-y-auto scrollbar-hide"
    >
      <section>
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-xs font-bold uppercase tracking-widest txt-brand-900">
            Control Units
          </h3>
          <span
            class="px-2 py-1 bg-orange-100 txt-orange-600 text-[9px] font-bold rounded-full"
            >9 ACTIVE</span
          >
        </div>

        <div class="space-y-4">
          <CgCard
            v-for="sub in allSubs"
            :key="sub.id"
            type="glass-frost"
            :shadow="true"
            @click="activeSubId = sub.id"
            class="p-5 rounded-[2.5rem] transition-all cursor-pointer group hover:translate-x-[-8px]"
            :class="{
              'ring-2 ring-brand-500 shadow-xl': activeSubId === sub.id,
            }"
          >
            <div class="flex items-center gap-5">
              <div
                class="w-14 h-14 rounded-3xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
                :class="sub.colorClass"
              >
                <component :is="sub.icon" class="w-6 h-6" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-[#1a1c3d] truncate">
                  {{ sub.name }}
                </h4>
                <p
                  class="text-[10px] text-gray-400 font-medium uppercase tracking-widest"
                >
                  {{ sub.desc }}
                </p>
              </div>
              <ChevronRightIcon class="w-4 h-4 text-gray-300" />
            </div>
          </CgCard>
        </div>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CgCard, CgButton } from "glass-studio-ui-pro";
import {
  Users as UsersIcon,
  ShieldCheck as ShieldCheckIcon,
  Globe as GlobeIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Activity as ActivityIcon,
  Cpu as CpuIcon,
  BarChart3 as BarChartIcon,
  Key as KeyIcon,
  FileText as FileTextIcon,
  TrendingUp as TrendingUpIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Building2 as BuildingIcon,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const moduleName = computed(
  () => (route.params.module as string) || "overview",
);

const activeSubId = ref<string | null>(
  moduleName.value === "law" ? "organizations" : null,
);
const currentSub = computed(() =>
  allSubs.value.find((s) => s.id === activeSubId.value),
);

import SuperAdminOrganizationView from "./SuperAdminOrganizationView.vue";

const allSubs = computed(() => {
  const base = [
    {
      id: "users",
      name: "User Management",
      desc: "Accounts & Roles",
      icon: UsersIcon,
      colorClass: "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/20",
    },
    {
      id: "license",
      name: "License System",
      desc: "Keys & Trials",
      icon: KeyIcon,
      colorClass: "bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-500/20",
    },
    {
      id: "finance",
      name: "Financial Insights",
      desc: "Revenue Tracking",
      icon: BarChartIcon,
      colorClass: "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/20",
    },
    {
      id: "global",
      name: "Global Config",
      desc: "Constants & Flags",
      icon: SettingsIcon,
      colorClass: "bg-gradient-to-br from-[#1a1c3d] to-[#434343] shadow-gray-500/20",
    },
    {
      id: "logs",
      name: "System Logs",
      desc: "Audit Trails",
      icon: ActivityIcon,
      colorClass: "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/20",
    },
    {
      id: "api",
      name: "API Gateways",
      desc: "3rd Party Links",
      icon: GlobeIcon,
      colorClass: "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/20",
    },
    {
      id: "health",
      name: "Health Monitor",
      desc: "Server Nodes",
      icon: CpuIcon,
      colorClass: "bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/20",
    },
    {
      id: "content",
      name: "Content Control",
      desc: "Templates & Static",
      icon: FileTextIcon,
      colorClass: "bg-gradient-to-br from-slate-500 to-slate-700 shadow-slate-500/20",
    },
    {
      id: "policy",
      name: "Security Policies",
      desc: "Firewalls & Auth",
      icon: ShieldCheckIcon,
      colorClass: "bg-gradient-to-br from-teal-400 to-emerald-600 shadow-teal-500/20",
    },
  ];

  if (moduleName.value === "law") {
    return [
      {
        id: "organizations",
        name: "Quản lý tổ chức",
        desc: "Khách hàng Module Law",
        icon: BuildingIcon,
        colorClass:
          "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-blue-500/20",
      },
      ...base,
    ];
  }

  return base;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
