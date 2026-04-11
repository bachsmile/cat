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

    <!-- 🔍 Search Overlay (Triggered from Sidebar) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showSearchModal"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 bg-black/60 backdrop-blur-md"
        @click.self="showSearchModal = false"
      >
        <div
          class="w-full max-w-2xl bg-[#0A0A0B] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div class="p-6 flex items-center gap-4 border-b border-white/5">
            <SearchIcon class="w-5 h-5 text-[#FFD700]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search assets, lawyers, orders..."
              class="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-gray-600"
              autofocus
            />
            <button
              @click="showSearchModal = false"
              class="text-gray-500 hover:text-white px-2"
            >
              ESC
            </button>
          </div>
          <div class="p-10 text-center text-gray-500">
            <p v-if="!searchQuery">
              Type something to explore your digital empire...
            </p>
            <p v-else>Searching for "{{ searchQuery }}"...</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Castle Sidebar (Rail) -->
    <CxSidebar width="60px">
      <!-- Top Profile Section -->
      <div class="flex flex-col items-center relative z-20">
        <div 
          @click="router.push('/sp-ad')"
          class="relative group cursor-pointer"
        >
          <div
            class="w-10 h-10 rounded-full border-2 border-[#FFD700]/60 p-1 bg-black shadow-[0_0_20px_rgba(255,215,0,0.2)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-500"
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
      </div>

      <!-- Center Actions (Centric Intelligence) -->
      <div
        class="flex-1 flex flex-col items-center justify-center space-y-8 relative z-20"
      >
        <!-- System Actions Integrated from Header -->
        <div
          @click="showSearchModal = true"
          class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all group"
        >
          <SearchIcon
            class="w-5 h-5 text-gray-200 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#fff] transition-all"
          />
        </div>

        <div
          class="relative cursor-pointer group flex items-center justify-center w-10 h-10 hover:bg-white/10 rounded-full transition-all"
        >
          <BellIcon
            class="w-5 h-5 text-gray-200 group-hover:text-white transition-all"
          />
          <div
            class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black animate-pulse"
          ></div>
        </div>

        <div
          @click="toggleSuperAdminMode"
          class="w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:border-[#FFD700]/50 hover:text-[#FFD700] flex items-center justify-center cursor-pointer transition-all group"
        >
          <CrownIcon class="w-5 h-5" />
        </div>
      </div>

      <!-- Sidebar Footer (Bottom Settings) -->
      <div class="space-y-8 flex flex-col items-center relative z-20">
        <div class="w-8 h-px bg-white/10"></div>

        <SettingsIcon
          class="w-5 h-5 text-gray-300 hover:text-white transition-all cursor-pointer"
        />
        <LogOutIcon
          class="w-5 h-5 text-gray-400 hover:text-red-400 transition-all cursor-pointer"
          @click="logout"
        />
      </div>
    </CxSidebar>

    <!-- 🏙️ Main Workspace -->
    <main
      class="flex-1 ml-[60px] h-full overflow-y-auto custom-scrollbar flex flex-col relative z-10 bg-[#050507]"
    >
      <!-- View Space -->
      <div class="p-6 max-w-[1800px] mx-auto w-full flex-1 pb-24 pt-16">
        <template v-if="activeTab === 'Báo cáo tổng quan'">
          <!-- 🔱 Balanced Master Grid Layout [3-6-3] -->
          <div class="grid grid-cols-12 gap-6">
            <!-- 📊 Column 1: Core Metrics (Left) -->
            <div class="col-span-12 xl:col-span-3 flex flex-col gap-6">
              <CxCard
                accent
                class="glass-deep !p-8 h-[520px] flex flex-col group relative overflow-hidden"
              >
                <div
                  class="flex justify-between items-center mb-8 relative z-10"
                >
                  <h4
                    class="text-xs font-black text-[#FFD700] uppercase tracking-[0.3em]"
                  >
                    Network Intelligence
                  </h4>
                  <MoreVerticalIcon
                    class="w-4 h-4 text-gray-600 cursor-pointer"
                  />
                </div>

                <div
                  class="flex-1 flex items-center justify-center relative z-10"
                >
                  <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)] opacity-40"
                  ></div>
                  <div
                    class="w-44 h-44 rounded-full border border-[#FFD700]/20 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-1000"
                  >
                    <div
                      class="absolute inset-2 rounded-full border border-[#FFD700]/40 border-dashed animate-spin-slow"
                    ></div>
                    <div class="z-10 text-center">
                      <p class="text-4xl font-black text-white italic">64.9</p>
                      <p
                        class="text-[9px] text-[#FFD700] font-bold uppercase mt-2"
                      >
                        Stability Index
                      </p>
                    </div>
                    <div
                      class="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-[#FFD700] rounded-full blur-[4px] shadow-[0_0_20px_#FFD700]"
                    ></div>
                  </div>
                </div>

                <div class="mt-8 space-y-4 relative z-10">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="flex justify-between items-center border-t border-white/5 pt-4"
                  >
                    <span class="text-[10px] text-gray-500 uppercase font-bold"
                      >Node Cluster {{ i }}</span
                    >
                    <span class="text-xs font-black text-emerald-500"
                      >OPTIMAL</span
                    >
                  </div>
                </div>
              </CxCard>

              <CxCard
                class="glass-vibrant min-h-[300px] !p-8 border-l-4 border-l-[#FFD700]"
              >
                <h4
                  class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6"
                >
                  Strategic Signals
                </h4>
                <div class="space-y-6">
                  <div
                    v-for="i in 2"
                    :key="i"
                    class="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <p
                      class="text-[10px] text-[#FFD700] font-black uppercase mb-1"
                    >
                      Alert #{{ i }}08
                    </p>
                    <p
                      class="text-xs text-white/80 leading-relaxed font-medium line-clamp-2 italic"
                    >
                      Infrastructure nodes re-synced successfully across global
                      clusters.
                    </p>
                  </div>
                </div>
              </CxCard>
            </div>

            <!-- 📈 Column 2: Analytics & Charts (Center) -->
            <div class="col-span-12 xl:col-span-6 flex flex-col gap-6">
              <div class="grid grid-cols-2 gap-6">
                <CxCard
                  class="glass-deep !p-8 h-44 flex flex-col justify-center border-t-2 border-[#FFD700]/40"
                >
                  <p
                    class="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 text-left"
                  >
                    System Valuation
                  </p>
                  <h3
                    class="text-4xl font-black text-white text-left tracking-tighter italic"
                  >
                    ₫{{ portfolioSummary ? fmtNumber(assetStats.totalHoldings) : '---' }}
                  </h3>
                  <div
                    class="flex items-center gap-2 mt-6 text-[10px] font-black text-emerald-500"
                  >
                    <TrendingUpIcon class="w-4 h-4 animate-pulse" />
                    <span>+12.4% SYSTEM GROWTH</span>
                  </div>
                </CxCard>
                <CxCard
                  class="glass-deep !p-8 h-44 flex flex-col justify-center"
                >
                  <p
                    class="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 text-left"
                  >
                    Operational Flow
                  </p>
                  <h3
                    class="text-4xl font-black text-[#FFD700] text-left tracking-tighter italic"
                  >
                    {{ portfolioSummary ? '₫' + fmtNumber(assetStats.realizedProfit) : 'OPTIMAL' }}
                  </h3>
                  <p
                    class="text-[9px] text-gray-600 mt-6 text-left font-bold tracking-widest uppercase"
                  >
                    Real-time Signal Sync
                  </p>
                </CxCard>
              </div>

              <CxCard
                class="glass-vibrant h-[520px] !p-8 relative group overflow-hidden"
              >
                <div
                  class="flex justify-between items-center mb-8 relative z-10"
                >
                  <div class="text-left">
                    <h4
                      class="text-sm font-black text-white uppercase italic tracking-tighter"
                    >
                      Market Intelligence Hub
                    </h4>
                    <p
                      class="text-[9px] text-gray-500 uppercase font-bold tracking-[0.4em] mt-2"
                    >
                      Historical & Predictive Flow Analysis
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <button
                      v-for="p in ['1D', '1W', '1M', 'ALL']"
                      :key="p"
                      class="px-4 py-1.5 text-[10px] font-black rounded-full border border-white/5 hover:border-[#FFD700]/50 transition-all text-gray-500 hover:text-white"
                    >
                      {{ p }}
                    </button>
                  </div>
                </div>
                <div class="h-[350px] relative z-10">
                  <Line :data="chartData" :options="chartOptions" />
                </div>
              </CxCard>

              <CxCard
                class="glass-deep !p-6 flex items-center justify-between border border-white/5 rounded-3xl"
              >
                <div class="flex items-center gap-6">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF2B2] to-[#FFD700] flex items-center justify-center text-black"
                  >
                    <FilterIcon class="w-5 h-5" />
                  </div>
                  <div class="text-left">
                    <h5 class="text-xs font-black text-white uppercase italic">
                      Operations Control
                    </h5>
                    <p
                      class="text-[9px] text-gray-500 uppercase font-bold mt-1"
                    >
                      Refine analytic scope across the integrated ecosystem
                    </p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <button
                    class="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase text-gray-400 hover:text-white transition-all"
                  >
                    Analytics Export
                  </button>
                  <button
                    class="px-6 py-2.5 rounded-xl bg-[#FFD700] text-black text-[9px] font-black uppercase hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all"
                  >
                    Deep Inspection
                  </button>
                </div>
              </CxCard>
            </div>

            <!-- 📊 Column 3: Global Ops & Feeds (Right) -->
            <div class="col-span-12 xl:col-span-3 flex flex-col gap-6">
              <CxCard class="glass-deep flex-1 !p-8 flex flex-col">
                <div class="flex items-center gap-3 mb-8">
                  <div class="w-1.5 h-6 bg-[#FFD700] rounded-full"></div>
                  <h4
                    class="text-xs font-black text-white uppercase italic tracking-widest text-left"
                  >
                    Real-Time Streams
                  </h4>
                </div>
                <div
                  class="space-y-6 flex-1 text-left overflow-y-auto pr-2 custom-scrollbar"
                >
                  <div
                    v-for="i in 6"
                    :key="i"
                    class="flex items-center gap-4 group/item cursor-pointer"
                  >
                    <div
                      class="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:border-[#FFD700]/40 transition-all"
                    >
                      <component
                        :is="i % 2 === 0 ? WalletIcon : PackageIcon"
                        class="w-4 h-4 text-gray-500 group-hover/item:text-[#FFD700]"
                      />
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-center mb-1">
                        <p class="text-[11px] text-white font-black italic">
                          {{ i % 2 === 0 ? "Protocol Entry" : "Asset Shift" }}
                        </p>
                        <p class="text-[8px] text-gray-600 uppercase font-bold">
                          12m
                        </p>
                      </div>
                      <div
                        class="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1.5 border border-white/5"
                      >
                        <div
                          class="h-full bg-gradient-to-r from-gray-700 via-[#FFD700]/50 to-[#FFD700]"
                          :style="{ width: 15 * i + '%' }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CxCard>

              <CxCard class="glass-vibrant h-[380px] !p-8">
                <h4
                  class="text-xs font-black text-[#FFD700] uppercase tracking-[0.3em] mb-10 text-left"
                >
                  Composition Matrix
                </h4>
                <div class="h-44 flex items-center justify-center relative">
                  <div
                    class="absolute inset-0 flex flex-col items-center justify-center z-10"
                  >
                    <p
                      class="text-3xl font-black text-white italic tracking-tighter"
                    >
                      94<sup>%</sup>
                    </p>
                    <p
                      class="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1"
                    >
                      Global Health
                    </p>
                  </div>
                  <div
                    class="w-40 h-40 rounded-full border-[6px] border-white/5 relative"
                  >
                    <div
                      class="absolute inset-[-6px] rounded-full border-[6px] border-[#FFD700] border-t-transparent border-l-transparent rotate-45"
                    ></div>
                  </div>
                </div>
                <div class="mt-8 grid grid-cols-2 gap-4">
                  <div
                    v-for="p in ['Finance', 'Logistics']"
                    :key="p"
                    class="flex flex-col items-start"
                  >
                    <span
                      class="text-[8px] text-gray-500 font-black uppercase mb-1"
                      >{{ p }} Unit</span
                    >
                    <span class="text-xs font-black text-white italic">{{
                      p === "Finance" ? "72%" : "28%"
                    }}</span>
                  </div>
                </div>
              </CxCard>
            </div>
          </div>
        </template>
        <template v-else>
          <component :is="getActiveComponent()" />
        </template>
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

    <transition name="slide-right">
      <div
        v-if="showSubMenu"
        class="fixed right-0 top-0 bottom-0 w-[400px] bg-[#0A0A0B]/98 backdrop-blur-3xl border-l border-[#FFD700]/10 z-[300] p-10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col"
      >
        <div class="mb-8 relative pr-10">
          <span
            class="text-[9px] font-black text-[#FFD700] opacity-50 uppercase tracking-[0.5em]"
            >System Segment</span
          >
          <h4
            class="text-2xl font-black text-white uppercase tracking-tighter mt-2 text-left"
          >
            {{ selectedMenuParent?.name }}
          </h4>
          <button
            @click="showSubMenu = false"
            class="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>

        <div
          class="flex-1 overflow-y-auto custom-scrollbar -mr-4 pr-4 space-y-3"
        >
          <template v-for="sub in selectedMenuChildren" :key="sub.name">
            <!-- 🔖 Category Header -->
            <div
              v-if="sub.isHeader"
              class="pt-6 pb-2 flex items-center justify-between"
            >
              <span
                class="text-[8px] font-black text-[#FFD700] opacity-30 uppercase tracking-[0.4em]"
                >{{ sub.name }}</span
              >
              <div class="h-px flex-1 bg-white/5 ml-4"></div>
            </div>

            <!-- 🖱️ Nav Item -->
            <button
              v-else
              @click="handleSubMenuClick(sub)"
              class="w-full text-left px-6 py-4 rounded-2xl transition-all border border-white/5 flex items-center justify-between group overflow-hidden relative"
              :class="
                activeTab === sub.name
                  ? 'bg-[#FFD700]/5 border-[#FFD700]/20 text-[#FFD700]'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              "
            >
              <div class="flex items-center gap-4">
                <div
                  v-if="sub.icon"
                  class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-[#FFD700]/20 group-hover:bg-[#FFD700]/5 transition-all"
                >
                  <component :is="sub.icon" class="w-4 h-4" />
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-[11px] font-black uppercase tracking-[0.15em]"
                    >{{ sub.name }}</span
                  >
                  <span
                    class="text-[8px] font-bold text-gray-700 uppercase mt-1 tracking-wider"
                    >{{ sub.id || "LAW-X" }}</span
                  >
                </div>
              </div>
              <ChevronRightIcon
                class="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Users as UsersIcon,
  Store as StoreIcon,
  Truck as TruckIcon,
  Stethoscope as StethoscopeIcon,
  GraduationCap as GraduationCapIcon,
  Layers as LayersIcon,
  FolderOpen as FolderOpenIcon,
  LayoutGrid as LayoutGridIcon,
  ChevronRight as ChevronRightIcon,
  LogOut as LogOutIcon,
  X as XIcon,
  Settings as SettingsIcon,
  ShieldAlert as LegalIcon,
  Crown as CrownIcon,
  Building as OrgIcon,
  Cpu as CpuIcon,
  Search as SearchIcon,
  Bell as BellIcon,
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
  Zap as ZapIcon,
  Lock as LockIcon,
  Wallet as WalletIcon,
  BarChart3 as BarChart3Icon,
  Calendar as CalendarIcon,
  MessageCircle as MessageCircleIcon,
  FileText as FileTextIcon,
  MessageSquare as MessageSquareIcon,
  BookOpen as BookOpenIcon,
  Filter as FilterIcon,
  Briefcase as FinanceIcon,
  Briefcase as BriefcaseIcon,
} from "lucide-vue-next";

// Components
import CxCard from "@/components/common/cx/CxCard.vue";
import CxSidebar from "@/components/common/cx/CxSidebar.vue";

// Views
import UserManagementView from "./UserManagementView.vue";
import ModuleManagementView from "./ModuleManagementView.vue";
import LicenseManagementView from "./LicenseManagementView.vue";
import BlockchainView from "./BlockchainView.vue";
import WalletsVaultView from "./WalletsVaultView.vue";
import AssetsView from "./AssetsView.vue";
import AssetReportsView from "./AssetReportsView.vue";
import AdminLawView from "@/views/law/AdminLawView.vue";
import AdminWeddingView from "@/views/wedding/AdminWeddingView.vue";
import AdminFinanceView from "@/views/finance/AdminFinanceView.vue";
import AdminRetailView from "@/views/retail/AdminRetailView.vue";
import AdminMedicalView from "@/views/medical/AdminMedicalView.vue";
import AdminEducationView from "@/views/education/AdminEducationView.vue";
import AdminLogisticsView from "@/views/logistics/AdminLogisticsView.vue";

import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Super Admin
import SuperAdminDashboard from "@/views/manager/super-admin/SuperAdminDashboard.vue";
import SuperAdminOrganizationView from "@/views/manager/super-admin/SuperAdminOrganizationView.vue";
import SuperAdminModuleView from "@/views/manager/super-admin/SuperAdminModuleView.vue";
import {
  getGrowthStats,
  getPortfolioSummary,
  getSavingsSummary,
} from "@/api/wallet";

const router = useRouter();
const route = useRoute();

const activeTab = ref("Báo cáo tổng quan");
const showSubMenu = ref(false);
const showSearchModal = ref(false);
const searchQuery = ref("");
const selectedMenuParent = ref<any>(null);
const selectedMenuChildren = ref<any[] | null>(null);

const growthStats = ref<any[]>([]);
const portfolioSummary = ref<any>(null);
const savingsSummary = ref<any>(null);
const transactions = ref<any[]>([]);
const capitalPackages = ref<any[]>([]);

const chartData = computed(() => {
  return {
    labels: growthStats.value.map((s: any) => s.dateStr || s.date || ""),
    datasets: [
      {
        label: "Performance",
        data: growthStats.value.map((s: any) => s.value),
        fill: true,
        borderColor: "#FFD700",
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { display: false },
    x: { display: false },
  },
  plugins: {
    legend: { display: false },
  },
};

const fetchGrowthStats = async () => {
  try {
    const results = await Promise.allSettled([
      getGrowthStats(),
      getPortfolioSummary(),
      getSavingsSummary(),
    ]);

    if (results[0].status === "fulfilled") growthStats.value = results[0].value;
    if (results[1].status === "fulfilled") portfolioSummary.value = results[1].value;
    if (results[2].status === "fulfilled") savingsSummary.value = results[2].value;
    
    transactions.value = [];
    capitalPackages.value = [];
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }
};

const fmtNumber = (val: number) => new Intl.NumberFormat("vi-VN").format(val);

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
    path: "/ad",
  },
  {
    name: "Wedding",
    shortName: "Wed",
    icon: WeddingIcon,
    children: [
      {
        name: "Tổng quan Wedding",
        path: "/ad/wedding",
        id: "WED-HOME",
        icon: WeddingIcon,
      },
      {
        name: "Tạo thiệp cưới",
        path: "/ad/wedding/cards",
        id: "WED-CARD",
        icon: MailIcon,
      },
      {
        name: "Thiết kế Website",
        path: "/ad/wedding/website",
        id: "WED-WEB",
        icon: GlobeIcon,
      },
      {
        name: "Quản lý đơn hàng",
        path: "/ad/wedding/orders",
        id: "WED-ORD",
        icon: PackageIcon,
      },
      {
        name: "Thống kê doanh thu",
        path: "/ad/wedding/revenue",
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
      { name: "Quản lý người dùng", path: "/ad/users", icon: UserCheckIcon },
      { name: "Quản lý Module", path: "/ad/system/modules", icon: BoxesIcon },
      { name: "Quản lý License", path: "/ad/licenses", icon: ShieldCheckIcon },
    ],
  },

  {
    name: "Tài chính",
    shortName: "Vault",
    icon: FinanceIcon,
    children: [
      { name: "QUẢN TRỊ TÀI SẢN", isHeader: true },
      {
        name: "Quản lý tài sản (Assets)",
        path: "/ad/finance/assets",
        icon: WalletIcon,
        id: "FIN-AST",
      },
      {
        name: "Danh mục đầu tư",
        path: "/ad/finance/portfolio",
        icon: FinanceIcon,
        id: "FIN-INV",
      },
      {
        name: "Báo cáo tài chính",
        path: "/ad/finance/reports",
        icon: BarChart3Icon,
        id: "FIN-REP",
      },

      { name: "HẠ TẦNG KỸ THUẬT", isHeader: true },
      {
        name: "Blockchain Hub",
        path: "/ad/finance/blockchain",
        icon: ActivityIcon,
        id: "FIN-BLK",
      },
      {
        name: "Tài khoản Vault",
        path: "/ad/finance/vault",
        icon: LockIcon,
        id: "FIN-VLT",
      },

      { name: "PHÂN TÍCH CHIẾN LƯỢC", isHeader: true },
      {
        name: "Thị trường AI",
        path: "/ad/finance/ai-market",
        icon: ZapIcon,
        id: "FIN-AIM",
      },
      {
        name: "Phân tích xu hướng",
        path: "/ad/finance/trends",
        icon: ActivityIcon,
        id: "FIN-TRD",
      },
    ],
  },
  {
    name: "Y tế",
    shortName: "Med",
    icon: StethoscopeIcon,
    children: [
      {
        name: "Hồ sơ bệnh án",
        path: "/ad/medical/records",
        icon: FileTextIcon,
        id: "MED-REC",
      },
      {
        name: "Lịch khám bệnh",
        path: "/ad/medical/appointments",
        icon: CalendarIcon,
        id: "MED-APP",
      },
      {
        name: "Tư vấn Sức khỏe AI",
        path: "/ad/medical/ai-consult",
        icon: ActivityIcon,
        id: "MED-AIC",
      },
    ],
  },
  {
    name: "Giáo dục",
    shortName: "Edu",
    icon: GraduationCapIcon,
    children: [
      { name: "QUẢN LÝ ĐÀO TẠO", isHeader: true },
      {
        name: "Quản lý Khóa học",
        path: "/ad/edu/courses",
        icon: BookOpenIcon,
        id: "EDU-CRS",
      },
      {
        name: "Bài giảng AI",
        path: "/ad/edu/ai-lectures",
        icon: LayersIcon,
        id: "EDU-AIL",
      },
      {
        name: "Quản lý Lớp",
        path: "/ad/edu/classes",
        icon: LayersIcon,
        id: "EDU-CLS",
      },
      {
        name: "Quản lý Bộ môn",
        path: "/ad/edu/departments",
        icon: FolderOpenIcon,
        id: "EDU-DEP",
      },

      { name: "NHÂN SỰ & HỌC SINH", isHeader: true },
      {
        name: "Quản lý Giáo viên",
        path: "/ad/edu/teachers",
        icon: UsersIcon,
        id: "EDU-TCH",
      },
      {
        name: "Quản lý Học sinh",
        path: "/ad/edu/students",
        icon: GraduationCapIcon,
        id: "EDU-STD",
      },
      {
        name: "Sinh viên & Điểm",
        path: "/ad/edu/grades",
        icon: ActivityIcon,
        id: "EDU-GRD",
      },
    ],
  },
  {
    name: "Kinh doanh Store",
    shortName: "Store",
    icon: StoreIcon,
    children: [
      { name: "QUẢN LÝ BÁN HÀNG", isHeader: true },
      {
        name: "Lập đơn hàng",
        path: "/ad/retail/pos",
        icon: PackageIcon,
        id: "RET-POS",
      },
      {
        name: "Khách hàng",
        path: "/ad/retail/customers",
        icon: UsersIcon,
        id: "RET-CUS",
      },
      {
        name: "Báo cáo doanh thu",
        path: "/ad/retail/revenue",
        icon: TrendingUpIcon,
        id: "RET-REV",
      },

      { name: "QUẢN LÝ SẢN PHẨM", isHeader: true },
      {
        name: "Hàng hóa",
        path: "/ad/retail/products",
        icon: PackageIcon,
        id: "RET-PRD",
      },
      {
        name: "Kho & Tồn kho",
        path: "/ad/retail/inventory",
        icon: BoxesIcon,
        id: "RET-INV",
      },
    ],
  },
  {
    name: "Logistics",
    shortName: "Log",
    icon: TruckIcon,
    children: [
      { name: "VẬN HÀNH", isHeader: true },
      {
        name: "Đội xe & Tài xế",
        path: "/ad/logistics/fleet",
        icon: UsersIcon,
        id: "LOG-FLT",
      },
      {
        name: "Lộ trình giao hàng",
        path: "/ad/logistics/routes",
        icon: ActivityIcon,
        id: "LOG-RTE",
      },

      { name: "KHO BÃI", isHeader: true },
      {
        name: "Nhập / Xuất kho",
        path: "/ad/logistics/warehouse",
        icon: PackageIcon,
        id: "LOG-WHS",
      },
      {
        name: "Kiểm kê",
        path: "/ad/logistics/audit",
        icon: FileTextIcon,
        id: "LOG-AUD",
      },
    ],
  },
  {
    name: "Pháp lý",
    shortName: "Law",
    icon: LegalIcon,
    children: [
      { name: "DỊCH VỤ KHÁCH HÀNG", isHeader: true },
      {
        name: "Quản lý Lịch hẹn",
        path: "/ad/law/appointments",
        icon: CalendarIcon,
        id: "LAW-APP",
      },
      {
        name: "Tư vấn Trực tuyến",
        path: "/ad/law/chat",
        icon: MessageCircleIcon,
        id: "LAW-CON",
      },

      { name: "NHÂN SỰ & CƠ SỞ", isHeader: true },
      {
        name: "Phòng Luật & Lịch",
        path: "/ad/law/offices",
        icon: BriefcaseIcon,
        id: "LAW-OFF",
      },
      {
        name: "Đội ngũ Luật sư",
        path: "/ad/law/lawyers",
        icon: UsersIcon,
        id: "LAW-STA",
      },

      { name: "HỒ SƠ & KIẾN THỨC", isHeader: true },
      {
        name: "Hồ sơ Khách hàng",
        path: "/ad/law/applications",
        icon: FileTextIcon,
        id: "LAW-CLI",
      },
      {
        name: "Hỏi đáp Pháp luật",
        path: "/ad/law/questions",
        icon: MessageSquareIcon,
        id: "LAW-QNA",
      },
      {
        name: "Thư viện Bài viết",
        path: "/ad/law/posts",
        icon: BookOpenIcon,
        id: "LAW-LIB",
      },
    ],
  },
];

const currentMenuItems = adminItems;

const moduleDockItems = computed(() => {
  return [
    {
      name: "Overview",
      icon: LayoutGridIcon,
      color: "linear-gradient(135deg, #FFD700, #B8860B)",
      target: adminItems[0] || {},
    },
    {
      name: "Wedding",
      icon: WeddingIcon,
      color: "linear-gradient(135deg, #F472B6, #DB2777)",
      target: adminItems[1] || {},
    },
    {
      name: "System",
      icon: CpuIcon,
      color: "linear-gradient(135deg, #334155, #0F172A)",
      target: adminItems[2] || {},
    },
    {
      name: "Finance",
      icon: WalletIcon,
      color: "linear-gradient(135deg, #A855F7, #6B21A8)",
      target: adminItems[3] || {},
    },
    {
      name: "Medical",
      icon: StethoscopeIcon,
      color: "linear-gradient(135deg, #EF4444, #991B1B)",
      target: adminItems[4] || {},
    },
    {
      name: "Education",
      icon: GraduationCapIcon,
      color: "linear-gradient(135deg, #6366F1, #3730A3)",
      target: adminItems[5] || {},
    },
    {
      name: "Retail",
      icon: StoreIcon,
      color: "linear-gradient(135deg, #F59E0B, #B45309)",
      target: adminItems[6] || {},
    },
    {
      name: "Logistics",
      icon: TruckIcon,
      color: "linear-gradient(135deg, #10B981, #065F46)",
      target: adminItems[7] || {},
    },
    {
      name: "Legal",
      icon: LegalIcon,
      color: "linear-gradient(135deg, #06B6D4, #0891B2)",
      target: adminItems[8] || {},
    },
  ];
});

const toggleSuperAdminMode = () => {
  router.push("/sp-ad");
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

const logout = () => {
  localStorage.removeItem("user");
  router.push("/");
};

// Synchronize activeTab with Route
const syncTabWithRoute = () => {
  const currentPath = route.path;
  const items = adminItems;

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

watch(activeTab, (newTab) => {
  const financeTabs = [
    "Tài chính",
    "Quản lý tài sản (Assets)",
    "Danh mục đầu tư",
    "Báo cáo tài chính",
  ];
  if (financeTabs.includes(newTab) && growthStats.value.length === 0) {
    fetchGrowthStats();
  }
});

onMounted(() => {
  syncTabWithRoute();
  // Never fetch wallet stats automatically on the Overview dashboard anymore as requested.
  // Only fetch if we land directly on a Finance tab.
  const financeTabs = [
    "Tài chính",
    "Quản lý tài sản (Assets)",
    "Danh mục đầu tư",
    "Báo cáo tài chính",
  ];
  if (financeTabs.includes(activeTab.value)) {
    fetchGrowthStats();
  }
});

const getActiveComponent = () => {
  if (activeTab.value === "Quản lý người dùng") return UserManagementView;
  if (activeTab.value === "Quản lý Module") return ModuleManagementView;
  if (activeTab.value === "Quản lý License") return LicenseManagementView;
  if (activeTab.value === "Blockchain Hub") return BlockchainView;
  if (activeTab.value === "Tài khoản Vault") return WalletsVaultView;
  if (activeTab.value === "Quản lý tài sản (Assets)") return AssetsView;
  if (activeTab.value === "Báo cáo tài chình") return AssetReportsView;

  const lawActiveTabs = [
    "Quản lý pháp lý",
    "Phòng Luật & Lịch",
    "Quản lý Lịch hẹn",
    "Tư vấn Trực tuyến",
    "Đội ngũ Luật sư",
    "Hồ sơ Khách hàng",
    "Hỏi đáp Pháp luật",
    "Thư viện Bài viết",
  ];
  if (lawActiveTabs.includes(activeTab.value)) return AdminLawView;

  const weddingActiveTabs = [
    "Wedding",
    "Tổng quan Wedding",
    "Tạo thiệp cưới",
    "Thiết kế Website",
    "Quản lý đơn hàng",
    "Thống kê doanh thu",
  ];
  if (weddingActiveTabs.includes(activeTab.value)) return AdminWeddingView;

  const financeActiveTabs = [
    "Tài chính",
    "Quản lý tài sản (Assets)",
    "Danh mục đầu tư",
    "Báo cáo tài chính",
    "Blockchain Hub",
    "Tài khoản Vault",
    "Thị trường AI",
    "Phân tích xu hướng",
  ];
  if (financeActiveTabs.includes(activeTab.value)) return AdminFinanceView;

  const retailActiveTabs = [
    "Kinh doanh Store",
    "Lập đơn hàng",
    "Khách hàng",
    "Báo cáo doanh thu",
    "Hàng hóa",
    "Kho & Tồn kho",
  ];
  if (retailActiveTabs.includes(activeTab.value)) return AdminRetailView;

  const medicalActiveTabs = [
    "Y tế",
    "Hồ sơ bệnh án",
    "Lịch khám bệnh",
    "Tư vấn Sức khỏe AI",
  ];
  if (medicalActiveTabs.includes(activeTab.value)) return AdminMedicalView;

  const educationActiveTabs = [
    "Giáo dục",
    "Quản lý Khóa học",
    "Bài giảng AI",
    "Quản lý Lớp",
    "Quản lý Bộ môn",
    "Quản lý Giáo viên",
    "Quản lý Học sinh",
    "Sinh viên & Điểm",
  ];
  if (educationActiveTabs.includes(activeTab.value)) return AdminEducationView;

  const logisticsActiveTabs = [
    "Logistics",
    "Đội xe & Tài xế",
    "Lộ trình giao hàng",
    "Nhập / Xuất kho",
    "Kiểm kê",
  ];
  if (logisticsActiveTabs.includes(activeTab.value)) return AdminLogisticsView;

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
