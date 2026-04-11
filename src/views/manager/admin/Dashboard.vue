<template>
  <div
    class="h-screen bg-[#050507] text-white flex overflow-hidden font-inter select-none relative"
  >
    <!-- ☄️ Global Atmospheric Radiant Effects -->
    <div
      class="absolute top-[-20%] left-[20%] w-[70%] h-[50%] bg-gradient-to-b from-[#FFD700]/10 to-transparent blur-[180px] pointer-events-none z-0"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[10%] w-[50%] h-[40%] bg-gradient-to-t from-orange-500/5 to-transparent blur-[150px] pointer-events-none z-0"
    ></div>

    <!-- 🏰 Luxury Icon Rail (Sidebar) -->
    <CxSidebar width="60px">
      <!-- Top Profile Section -->
      <div class="mt-4 mb-8 flex flex-col items-center gap-6 relative z-20">
        <div
          class="w-10 h-10 rounded-xl bg-[#0A0A0B] border border-white/5 flex items-center justify-center cursor-pointer hover:border-[#FFD700]/50 transition-all group/grid shadow-inner overflow-hidden"
        >
          <LayoutGridIcon
            class="w-4 h-4 text-gray-600 group-hover:text-[#FFD700] transition-colors"
          />
        </div>
        <div class="relative group cursor-pointer">
          <div
            class="w-10 h-10 rounded-full border-2 border-[#FFD700]/40 p-1 bg-black shadow-[0_0_20px_rgba(255,215,0,0.15)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-500"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=MasterAdmin"
              class="w-full h-full rounded-full"
            />
          </div>
          <div
            class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#070709] rounded-full shadow-[0_0_10px_#10b981]"
          ></div>
        </div>

        <!-- 🌊 Luxury Progress Wave -->
        <div class="flex flex-col items-center gap-1.5 mt-2 opacity-30">
          <div
            v-for="i in 4"
            :key="i"
            class="w-0.5 h-6 rounded-full bg-gradient-to-b from-transparent via-[#FFD700] to-transparent"
          ></div>
        </div>
      </div>

      <!-- Main Navigation Rail -->
      <nav
        class="flex-1 w-full space-y-6 flex flex-col items-center py-2 relative z-20"
      >
        <button
          v-for="item in currentMenuItems"
          :key="item.name"
          @click="selectMenu(item)"
          class="group relative flex flex-col items-center gap-2"
        >
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-700 relative z-10"
            :class="[
              activeTab === item.name || isAnyChildActive(item)
                ? 'bg-gradient-to-br from-[#FFF2B2] via-[#FFD700] to-[#B8860B] text-black shadow-[0_0_20px_rgba(255,215,0,0.6)] scale-110'
                : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10',
            ]"
          >
            <div
              v-if="activeTab === item.name || isAnyChildActive(item)"
              class="absolute inset-[-8px] bg-[#FFD700]/20 blur-[12px] rounded-full -z-10 animate-pulse-slow"
            ></div>
            <component :is="item.icon" class="w-4 h-4" />
          </div>
          <span
            class="text-[6px] font-black uppercase tracking-[0.2em] transition-all duration-500 text-center px-1"
            :class="
              activeTab === item.name || isAnyChildActive(item)
                ? 'text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]'
                : 'text-gray-700 group-hover:text-gray-400'
            "
          >
            {{ item.shortName }}
          </span>
        </button>
      </nav>

      <!-- Sidebar Footer -->
      <div
        class="mt-auto mb-8 space-y-8 flex flex-col items-center relative z-20"
      >
        <SettingsIcon
          class="w-5 h-5 text-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.5)] cursor-pointer"
        />
        <LogOutIcon
          class="w-5 h-5 text-[#FFD700]/60 hover:text-white cursor-pointer"
          @click="logout"
        />
      </div>
    </CxSidebar>

    <!-- 🏙️ Main Workspace -->
    <main
      class="flex-1 ml-[60px] h-full overflow-y-auto custom-scrollbar flex flex-col relative z-10 bg-[#050507]"
    >
      <!-- Premium Floating Header -->
      <div class="px-10 pt-10 sticky top-0 z-50">
        <CxToolbar radius="3rem" class="!m-0 glass-vibrant h-20 px-8">
          <template #left>
            <div class="flex items-center gap-8 text-left">
              <button
                class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <SearchIcon class="w-4 h-4 text-gray-400" />
              </button>
              <div class="flex flex-col">
                <h2
                  class="text-xl font-black text-white uppercase tracking-tighter italic flex items-center gap-3"
                >
                  {{ activeTab }}
                </h2>
                <!-- <span class="text-[9px] font-bold text-gray-500 uppercase tracking-[0.4em]">Integrated Intelligence Nexus v.10.2</span> -->
              </div>
            </div>
          </template>

          <template #right>
            <div class="flex items-center gap-8">
              <div class="flex items-center gap-6">
                <BellIcon class="w-5 h-5 text-gray-400 cursor-pointer" />
                <CommandIcon class="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
              <div class="h-10 w-px bg-white/10"></div>
              <div
                @click="toggleSuperAdminMode"
                class="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all"
                :class="
                  isSuperAdminMode
                    ? 'bg-[#FFD700] border-[#FFD700] text-black shadow-lg shadow-[#FFD700]/40'
                    : 'bg-white/5 border-white/10 text-[#FFD700]'
                "
              >
                <CrownIcon class="w-5 h-5" />
              </div>
            </div>
          </template>
        </CxToolbar>
      </div>

      <!-- View Space (Comprehensive Grid Restoration) -->
      <div class="p-6 max-w-[1800px] mx-auto w-full flex-1 pb-24">
        <template v-if="activeTab === 'Báo cáo tổng quan'">
          <!-- 🔱 Multi-Column Master Interface (Matches Image) -->
          <div class="grid grid-cols-12 gap-8 h-full min-h-[1200px]">
            <!-- 📊 Column 1: Core Metrics & Radar -->
            <div class="col-span-12 lg:col-span-3 flex flex-col gap-8">
              <CxCard
                accent
                class="glass-deep !p-10 h-[650px] relative overflow-hidden group"
              >
                <div class="flex justify-between items-center mb-10">
                  <h4
                    class="text-sm font-black text-[#FFD700] uppercase tracking-[0.3em]"
                  >
                    Quantum Navigation
                  </h4>
                  <MoreVerticalIcon class="w-4 h-4 text-gray-600" />
                </div>
                <!-- 🪙 Circular Gauge/Compass Widget -->
                <div class="flex-1 flex items-center justify-center relative">
                  <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)] opacity-40"
                  ></div>
                  <div
                    class="w-56 h-56 rounded-full border border-[#FFD700]/20 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-1000"
                  >
                    <div
                      class="absolute inset-2 rounded-full border border-[#FFD700]/40 border-dashed animate-spin-slow"
                    ></div>
                    <div
                      class="absolute inset-10 rounded-full bg-gradient-to-tr from-[#FFD700]/20 to-transparent"
                    ></div>
                    <div class="z-10 text-center">
                      <p class="text-4xl font-black text-white">64.9</p>
                      <p
                        class="text-[9px] text-[#FFD700] font-bold uppercase mt-2"
                      >
                        Stability Index
                      </p>
                    </div>
                    <!-- Glowing Pointer -->
                    <div
                      class="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-[#FFD700] rounded-full blur-[4px] shadow-[0_0_20px_#FFD700]"
                    ></div>
                  </div>
                </div>
                <!-- Detailed Metrics List -->
                <div class="mt-auto space-y-4 text-left">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="flex justify-between items-center border-t border-white/5 pt-4"
                  >
                    <span class="text-[10px] text-gray-500 font-bold uppercase"
                      >Node Cluster {{ i }}</span
                    >
                    <span class="text-xs font-black text-[#FFD700]">98.2%</span>
                  </div>
                </div>
              </CxCard>

              <CxCard class="glass-deep !p-8 h-[350px]">
                <h4
                  class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6"
                >
                  Growth Lattice
                </h4>
                <div class="flex-1 flex items-center justify-center">
                  <!-- Tiny Area Trace Chart -->
                  <div class="w-full h-32 flex items-end gap-1 opacity-60">
                    <div
                      v-for="v in [20, 40, 35, 60, 50, 80, 70, 95]"
                      :key="v"
                      class="flex-1 bg-[#FFD700]/30 rounded-full"
                      :style="{ height: v + '%' }"
                    ></div>
                  </div>
                </div>
              </CxCard>
            </div>

            <!-- 🔭 Center Column: Detailed Statistics & Bar Charts -->
            <div class="col-span-12 lg:col-span-5 flex flex-col gap-8">
              <!-- 🏗️ Master Dual-Column Insights Layout -->
              <div class="grid grid-cols-12 gap-8 min-h-[550px]">
                <CxCard
                  v-for="s in [
                    { l: 'Primary Nodes', v: '1025/3' },
                    { l: 'Active Streams', v: '19.8/3' },
                  ]"
                  :key="s.l"
                  class="col-span-6 glass-deep !p-10 text-left"
                >
                  <p
                    class="text-[10px] text-gray-500 font-black uppercase mb-4"
                  >
                    {{ s.l }}
                  </p>
                  <h3
                    class="text-4xl font-black text-white italic tracking-tighter"
                  >
                    {{ s.v }}
                  </h3>
                </CxCard>
              </div>

              <!-- Integrated Bar Visualization (Matches Image Center) -->
              <CxCard class="glass-deep !p-12 flex flex-col h-[400px]">
                <div class="flex justify-between items-center mb-10">
                  <div class="flex flex-col text-left">
                    <h4
                      class="text-xs font-black text-[#FFD700] uppercase tracking-[0.3em]"
                    >
                      TĂNG TRƯỞNG TÀI SẢN
                    </h4>
                    <p
                      class="text-[9px] font-bold text-gray-600 uppercase mt-1 tracking-widest"
                    >
                      BIẾN ĐỘNG DÒNG VỐN THEO THỜI GIAN THỰC
                    </p>
                  </div>
                  <div class="flex gap-4">
                    <button
                      class="text-[9px] font-black text-[#FFD700] border border-[#FFD700]/20 px-3 py-1.5 rounded-full bg-[#FFD700]/5 hover:bg-[#FFD700]/20 transition-all"
                    >
                      1D
                    </button>
                    <button
                      class="text-[9px] font-black text-gray-600 px-3 py-1.5 rounded-full hover:text-[#FFD700] transition-all"
                    >
                      1W
                    </button>
                    <button
                      class="text-[9px] font-black text-gray-600 px-3 py-1.5 rounded-full hover:text-[#FFD700] transition-all"
                    >
                      1M
                    </button>
                  </div>
                </div>
                <div class="flex-1 relative min-h-0 mt-4 rounded-xl">
                  <template v-if="growthStats.length > 0">
                    <div class="absolute inset-0">
                      <Line :data="growthChartData" :options="growthChartOptions" />
                    </div>
                  </template>
                  <template v-else>
                    <div class="h-full flex items-end gap-[1px]">
                      <div v-for="i in 15" :key="i" class="flex-1 h-full relative group/col">
                         <div class="absolute bottom-0 w-full bg-white/5 rounded-t-sm animate-pulse" :style="{ height: [40, 70, 55, 90, 60, 45, 80, 50, 65, 30][i % 10] + '%' }"></div>
                      </div>
                    </div>
                  </template>
                </div>
              </CxCard>

              <!-- 📊 Integrated Asset Overview Hub (Realized Profit & Flow) -->
              <div class="mt-12 mb-20">
                <AssetOverviewHub
                  :selectedAsset="'ALL'"
                  :transactions="transactions"
                  :currentAssetBalance="portfolioSummary?.totalVndValue || 0"
                  :assetStats="assetStats"
                  :profitChartData="[]"
                  :totalCapitalPnl="portfolioSummary?.realizedProfit || 0"
                  :capitalPackages="capitalPackages"
                  :formatNumber="fmtNumber"
                  :formatDateTime="fmtDateTime"
                />
              </div>
            </div>

            <!-- 🗺️ Right Column: Maps & Radial Metrix -->
            <div class="col-span-12 lg:col-span-4 flex flex-col gap-8">
              <!-- World Map Widget 1 -->
              <CxCard
                class="glass-deep !p-0 h-[400px] relative overflow-hidden group"
              >
                <div
                  class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 grayscale scale-110 group-hover:scale-100 transition-transform"
                >
                  <img
                    src="https://api.dicebear.com/7.x/initials/svg?seed=WorldMap&backgroundColor=TRANSPARENT"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="relative z-10 p-10 flex flex-col h-full text-left">
                  <h4
                    class="text-xs font-black text-[#FFD700] uppercase tracking-[0.3em] mb-4"
                  >
                    Global Deployment
                  </h4>
                  <div class="mt-auto flex items-center gap-6">
                    <div
                      class="w-12 h-12 rounded-full bg-[#FFD700] text-black flex items-center justify-center font-black"
                    >
                      A
                    </div>
                    <div class="flex flex-col">
                      <p class="text-xl font-black text-white italic">
                        Primary Hubs
                      </p>
                      <p
                        class="text-[9px] text-gray-500 font-bold uppercase mt-1"
                      >
                        12 Latency Centers Active
                      </p>
                    </div>
                  </div>
                </div>
              </CxCard>

              <!-- Radial Progress Widget (Matches Image Right-Center) -->
              <CxCard
                class="glass-deep !p-12 h-[350px] flex items-center justify-between"
              >
                <div
                  class="relative w-48 h-48 flex items-center justify-center"
                >
                  <svg class="w-full h-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="currentColor"
                      stroke-width="20"
                      fill="transparent"
                      class="text-white/5"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="currentColor"
                      stroke-width="20"
                      fill="transparent"
                      class="text-[#FFD700]"
                      stroke-dasharray="502"
                      stroke-dashoffset="150"
                    />
                  </svg>
                  <div class="absolute text-center">
                    <h3 class="text-4xl font-black text-white italic">
                      33.2<sup>%</sup>
                    </h3>
                    <p
                      class="text-[9px] text-[#FFD700] font-bold uppercase mt-1"
                    >
                      Core Load
                    </p>
                  </div>
                </div>
                <div class="flex flex-col gap-6 text-left">
                  <div v-for="i in 3" :key="i">
                    <p
                      class="text-[9px] text-gray-500 font-black uppercase mb-1"
                    >
                      METRIC_0{{ i }}
                    </p>
                    <div
                      class="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden"
                    >
                      <div
                        class="h-full bg-[#FFD700]"
                        :style="{ width: i * 30 + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </CxCard>

              <!-- World Map Widget 2 (Detailed) -->
              <CxCard
                class="glass-deep !p-0 flex-1 min-h-[300px] relative overflow-hidden group"
              >
                <div class="absolute inset-0 bg-[#FFD700]/5"></div>
                <!-- Particle World Map Representation -->
                <div
                  class="absolute inset-10 grid grid-cols-12 gap-1 opacity-20"
                >
                  <div
                    v-for="p in 72"
                    :key="p"
                    class="w-1.5 h-1.5 rounded-full"
                    :class="
                      Math.random() > 0.7 ? 'bg-[#FFD700]' : 'bg-white/10'
                    "
                  ></div>
                </div>
                <div class="relative z-10 p-10 flex flex-col h-full text-left">
                  <div class="flex justify-between items-start">
                    <h4
                      class="text-xs font-black text-white uppercase tracking-[0.3em]"
                    >
                      Network Intelligence
                    </h4>
                    <p class="text-2xl font-black text-[#FFD700]">
                      6<sup>%</sup>
                    </p>
                  </div>
                  <p
                    class="text-[10px] text-gray-600 font-bold uppercase mt-auto tracking-[0.2em]"
                  >
                    Efficiency Protocol Activated
                  </p>
                </div>
              </CxCard>
            </div>
          </div>
        </template>

        <component v-else :is="getActiveComponent()" />
      </div>

      <!-- 🌈 Floating Module Master Rail (Bottom Center) -->
      <div
        class="fixed bottom-4 left-[calc(50%+30px)] -translate-x-1/2 z-[100] group/dock"
      >
        <div
          class="bg-[#1A1A1C]/90 backdrop-blur-3xl rounded-[28px] px-5 py-3 flex items-center gap-3 shadow-[0_30px_80px_rgba(0,0,0,1)] border-white/5 relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none"
          ></div>

          <button
            v-for="mod in moduleDockItems"
            :key="mod.name"
            @click="selectMenu(mod.target)"
            class="w-11 h-11 rounded-[15px] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl relative group/mod"
            :style="{ background: mod.color }"
          >
            <component
              :is="mod.icon"
              class="w-5 h-5 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            />
            <div
              class="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-[8px] font-black text-white uppercase tracking-widest opacity-0 group-hover/mod:opacity-100 transition-all pointer-events-none whitespace-nowrap"
            >
              {{ mod.name }}
            </div>
          </button>
        </div>
        <div
          class="absolute -inset-8 bg-[#FFD700]/10 blur-[60px] -z-10 rounded-full opacity-0 group-hover/dock:opacity-100 transition-opacity duration-1000"
        ></div>
      </div>
    </main>

    <!-- 📂 Submenu Drawer -->
    <transition name="slide-right">
      <div
        v-if="showSubMenu"
        class="fixed right-0 top-0 bottom-0 w-[450px] bg-[#0A0A0B]/98 backdrop-blur-3xl border-l border-[#FFD700]/10 z-[300] p-16 shadow-[0_0_100px_rgba(0,0,0,1)]"
      >
        <div class="mb-16">
          <span
            class="text-[10px] font-black text-[#FFD700] opacity-60 uppercase tracking-[0.6em]"
            >System Segment</span
          >
          <h4
            class="text-4xl font-extrabold text-white uppercase tracking-tighter mt-4 text-left"
          >
            {{ selectedMenuParent?.name }}
          </h4>
        </div>
        <div class="space-y-6">
          <button
            v-for="sub in selectedMenuChildren"
            :key="sub.name"
            @click="handleSubMenuClick(sub)"
            class="w-full text-left px-10 py-8 rounded-[32px] transition-all border border-white/5 flex items-center justify-between group overflow-hidden relative"
            :class="
              activeTab === sub.name
                ? 'bg-[#FFD700]/5 border-[#FFD700]/30 text-[#FFD700]'
                : 'text-gray-500 hover:text-white hover:bg-white/10'
            "
          >
            <div class="flex items-center gap-6">
              <div
                v-if="sub.icon"
                class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#FFD700]/30 group-hover:bg-[#FFD700]/10 transition-all"
              >
                <component :is="sub.icon" class="w-6 h-6" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-black uppercase tracking-[0.2em]">{{
                  sub.name
                }}</span>
                <span class="text-[9px] font-bold text-gray-700 uppercase mt-2"
                  >PROTOCOL_ID: {{ sub.id || "GEN-X" }}</span
                >
              </div>
            </div>
            <ChevronRightIcon
              class="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
        <button
          @click="showSubMenu = false"
          class="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Users as UsersIcon,
  LayoutGrid as LayoutGridIcon,
  ChevronRight as ChevronRightIcon,
  LogOut as LogOutIcon,
  X as XIcon,
  Database as DBNodesIcon,
  Briefcase as FinanceIcon,
  Settings as SettingsIcon,
  ShieldAlert as LegalIcon,
  Crown as CrownIcon,
  Building as OrgIcon,
  Cpu as CpuIcon,
  Search as SearchIcon,
  Bell as BellIcon,
  Command as CommandIcon,
  Shield as ShieldIcon,
  MoreVertical as MoreVerticalIcon,
  Heart as WeddingIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Package as PackageIcon,
  TrendingUp as TrendingUpIcon,
  UserCheck as UserCheckIcon,
  Boxes as BoxesIcon,
  ShieldCheck as ShieldCheckIcon,
  Activity as ActivityIcon,
  Lock as LockIcon,
  Wallet as WalletIcon,
  BarChart3 as BarChart3Icon,
} from "lucide-vue-next";

// Components
import CxCard from "@/components/common/cx/CxCard.vue";
import CxSidebar from "@/components/common/cx/CxSidebar.vue";
import CxToolbar from "@/components/common/cx/CxToolbar.vue";

// Views
import UserManagementView from "./UserManagementView.vue";
import ModuleManagementView from "./ModuleManagementView.vue";
import LicenseManagementView from "./LicenseManagementView.vue";
import BlockchainView from "./BlockchainView.vue";
import WalletsVaultView from "./WalletsVaultView.vue";
import AssetsView from "./AssetsView.vue";
import AssetReportsView from "./AssetReportsView.vue";
import AdminLawView from "@/views/law/AdminLawView.vue";
import AssetOverviewHub from "@/components/AssetOverviewHub.vue";

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Super Admin
import SuperAdminDashboard from "@/views/manager/super-admin/SuperAdminDashboard.vue";
import SuperAdminOrganizationView from "@/views/manager/super-admin/SuperAdminOrganizationView.vue";
import SuperAdminModuleView from "@/views/manager/super-admin/SuperAdminModuleView.vue";
import {
  getGrowthStats,
  getPortfolioSummary,
  getSavingsSummary,
  getWalletTransactions,
  getWalletLots,
} from "@/api/wallet";

const router = useRouter();
const route = useRoute();

const activeTab = ref("Báo cáo tổng quan");
const showSubMenu = ref(false);
const isSuperAdminMode = ref(false);
const selectedMenuParent = ref<any>(null);
const selectedMenuChildren = ref<any[] | null>(null);

const growthStats = ref<any[]>([]);
const portfolioSummary = ref<any>(null);
const savingsSummary = ref<any>(null);
const transactions = ref<any[]>([]);
const capitalPackages = ref<any[]>([]);

const growthChartData = computed(() => {
  return {
    labels: growthStats.value.map(s => s.dateStr || s.date || ''),
    datasets: [
      {
        label: 'Tăng trưởng tài sản',
        data: growthStats.value.map(s => s.value),
        fill: true,
        borderColor: '#FFD700',
        backgroundColor: (context: any) => {
           const chart = context.chart;
           const {ctx, chartArea} = chart;
           if (!chartArea) {
              return 'rgba(255, 215, 0, 0.2)';
           }
           const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
           gradient.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
           gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
           return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FFD700',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        tension: 0.4
      }
    ]
  }
})

const growthChartOptions = computed(() => {
  const dataVals = growthStats.value.map(s => s.value);
  const minVal = dataVals.length ? Math.min(...dataVals) : 0;
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        min: minVal * 0.9,
      },
      x: {
        display: false
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#888',
        bodyColor: '#FFD700',
        borderColor: 'rgba(255,215,0,0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return '₫' + (context.raw / 1000000).toFixed(1) + 'M';
          }
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  }
});

const fetchGrowthStats = async () => {
  try {
    const [growth, summary, savings] = await Promise.all([
      getGrowthStats(),
      getPortfolioSummary(),
      getSavingsSummary(),
    ]);
    growthStats.value = growth;
    portfolioSummary.value = summary;
    savingsSummary.value = savings;
    transactions.value = [];
    capitalPackages.value = [];
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }
};

const fmtNumber = (val: number) => new Intl.NumberFormat("vi-VN").format(val);
const fmtDateTime = (ts: string | number) => {
  if (!ts) return "N/A";
  return new Date(ts).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const assetStats = computed(() => {
  const total = portfolioSummary.value?.totalVndValue || 0;
  return {
    totalHoldings: total,
    avgBuyPrice: 0,
    realizedProfit: portfolioSummary.value?.realizedProfit || 0,
  };
});

const adminItems = [
  {
    name: "Báo cáo tổng quan",
    shortName: "Home",
    icon: LayoutGridIcon,
    path: "/dashboard",
  },
  {
    name: "Wedding",
    shortName: "Wed",
    icon: WeddingIcon,
    children: [
      {
        name: "Tạo thiệp cưới",
        path: "/wedding/cards",
        id: "WED-CARD",
        icon: MailIcon,
      },
      {
        name: "Thiết kế Website",
        path: "/wedding/website",
        id: "WED-WEB",
        icon: GlobeIcon,
      },
      {
        name: "Quản lý đơn hàng",
        path: "/wedding/orders",
        id: "WED-ORD",
        icon: PackageIcon,
      },
      {
        name: "Thống kê doanh thu",
        path: "/wedding/revenue",
        id: "WED-REV",
        icon: TrendingUpIcon,
      },
    ],
  },
  {
    name: "Hệ thống",
    shortName: "Sys",
    icon: CpuIcon,
    children: [
      { name: "Quản lý người dùng", path: "/users", icon: UserCheckIcon },
      { name: "Quản lý Module", path: "/system/modules", icon: BoxesIcon },
      { name: "Quản lý License", path: "/licenses", icon: ShieldCheckIcon },
    ],
  },
  {
    name: "Cơ sở hạ tầng",
    shortName: "Infra",
    icon: DBNodesIcon,
    children: [
      { name: "Blockchain Hub", path: "/blockchain", icon: ActivityIcon },
      { name: "Tài khoản Vault", path: "/vault", icon: LockIcon },
    ],
  },
  {
    name: "Tài chính",
    shortName: "Vault",
    icon: FinanceIcon,
    children: [
      {
        name: "Quản lý tài sản (Assets)",
        path: "/inventory",
        icon: WalletIcon,
      },
      { name: "Báo cáo tài chính", path: "/reports", icon: BarChart3Icon },
    ],
  },
  {
    name: "Pháp lý",
    shortName: "Law",
    icon: LegalIcon,
    children: [
      { name: "Quản lý pháp lý", path: "/law-admin", icon: LegalIcon },
    ],
  },
];

const superAdminItems = [
  { name: "Super Dashboard", shortName: "Master", icon: CrownIcon },
  { name: "Organizations", shortName: "Orgs", icon: OrgIcon },
  { name: "Global Modules", shortName: "Modules", icon: CpuIcon },
];

const currentMenuItems = computed(() =>
  isSuperAdminMode.value ? superAdminItems : adminItems,
);

const moduleDockItems = computed(() => {
  const financeInfraHybrid = {
    name: "Wealth & Infra",
    children: [
      {
        name: "Quản lý tài sản (Assets)",
        id: "ASST-MGT",
        path: "/inventory",
        icon: WalletIcon,
      },
      {
        name: "Báo cáo tài chính",
        id: "FIN-REP",
        path: "/reports",
        icon: BarChart3Icon,
      },
      {
        name: "Blockchain Hub",
        id: "BLK-CHAIN",
        path: "/blockchain",
        icon: ActivityIcon,
      },
    ],
  };
  return [
    {
      name: "Capital",
      icon: FinanceIcon,
      color: "linear-gradient(135deg, #A855F7, #6B21A8)",
      target: financeInfraHybrid,
    },
    {
      name: "Wedding",
      icon: WeddingIcon,
      color: "linear-gradient(135deg, #F472B6, #DB2777)",
      target: adminItems[1] || {},
    },
    {
      name: "Human",
      icon: UsersIcon,
      color: "linear-gradient(135deg, #0EA5E9, #0369A1)",
      target: adminItems[2] || {},
    },
    {
      name: "Shield",
      icon: ShieldIcon,
      color: "linear-gradient(135deg, #F97316, #C2410C)",
      target: adminItems[3] || {},
    },
    {
      name: "Registry",
      icon: SettingsIcon,
      color: "linear-gradient(135deg, #EF4444, #B91C1C)",
      target: adminItems[4] || {},
    },
    {
      name: "Domain",
      icon: OrgIcon,
      color: "linear-gradient(135deg, #10B981, #047857)",
      target: adminItems[5] || {},
    },
    {
      name: "System",
      icon: CpuIcon,
      color: "linear-gradient(135deg, #374151, #111827)",
      target: { name: "Settings", path: "/dashboard" },
    },
  ];
});

const toggleSuperAdminMode = () => {
  isSuperAdminMode.value = !isSuperAdminMode.value;
  if (currentMenuItems.value && currentMenuItems.value.length > 0) {
    activeTab.value = currentMenuItems.value[0].name;
  }
};

const selectMenu = (item: any) => {
  if (item.children) {
    selectedMenuParent.value = item;
    selectedMenuChildren.value = item.children;
    showSubMenu.value = true;
  } else if (item.path) {
    router.push(item.path);
    showSubMenu.value = false;
  } else {
    activeTab.value = item.name;
    showSubMenu.value = false;
  }
};

const handleSubMenuClick = (sub: any) => {
  if (sub.path) {
    router.push(sub.path);
  } else {
    activeTab.value = sub.name;
  }
  showSubMenu.value = false;
};

const isAnyChildActive = (item: any) =>
  item.children?.some((child: any) => activeTab.value === child.name);

const logout = () => {
  localStorage.removeItem("user");
  router.push("/");
};

// Synchronize activeTab with Route
const syncTabWithRoute = () => {
  const currentPath = route.path;
  const items = isSuperAdminMode.value ? superAdminItems : adminItems;

  for (const item of items as any[]) {
    if (item.path === currentPath) {
      activeTab.value = item.name;
      return;
    }
    if (item.children) {
      for (const sub of item.children) {
        if (
          sub.path === currentPath ||
          (currentPath.startsWith(sub.path) && sub.path !== "/")
        ) {
          activeTab.value = sub.name;
          return;
        }
      }
    }
  }
};

watch(
  () => route.path,
  () => {
    syncTabWithRoute();
  },
);

onMounted(() => {
  syncTabWithRoute();
  fetchGrowthStats();
});

const getActiveComponent = () => {
  if (activeTab.value === "Quản lý người dùng") return UserManagementView;
  if (activeTab.value === "Quản lý Module") return ModuleManagementView;
  if (activeTab.value === "Quản lý License") return LicenseManagementView;
  if (activeTab.value === "Blockchain Hub") return BlockchainView;
  if (activeTab.value === "Tài khoản Vault") return WalletsVaultView;
  if (activeTab.value === "Quản lý tài sản (Assets)") return AssetsView;
  if (activeTab.value === "Báo cáo tài chình") return AssetReportsView;
  if (activeTab.value === "Quản lý pháp lý") return AdminLawView;
  if (activeTab.value === "Super Dashboard") return SuperAdminDashboard;
  if (activeTab.value === "Organizations") return SuperAdminOrganizationView;
  if (activeTab.value === "Global Modules") return SuperAdminModuleView;
  return null;
};
</script>

<style scoped>
.glass-deep {
  background: #131316;
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 40px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
  transition: all 0.5s ease;
}
.glass-deep:hover {
  border-color: rgba(255, 215, 0, 0.15);
  box-shadow: 0 50px 120px rgba(0, 0, 0, 1);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.animate-pulse-slow {
  animation: pulse-gold-vibrant 4s infinite;
}
.animate-spin-slow {
  animation: spin 10s linear infinite;
}
@keyframes pulse-gold-vibrant {
  0%,
  100% {
    box-shadow: 0 0 50px rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 90px rgba(255, 215, 0, 0.8);
  }
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
