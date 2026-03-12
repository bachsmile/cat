<template>
  <div
    class="min-h-screen bg-[#050508] text-white flex font-['Inter',_sans-serif]"
  >
    <!-- Sidebar - Desktop -->
    <aside
      class="hidden lg:flex w-64 bg-[#0a0a0f] border-r border-white/5 flex-col p-6 h-screen sticky top-0"
    >
      <div class="flex items-center gap-3 mb-12">
        <div
          class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
        >
          <TerminalIcon class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold tracking-tight">Finzo</span>
      </div>

      <nav class="flex-1 space-y-2">
        <template v-for="item in menuItems" :key="item.name">
          <a
            href="#"
            @click.prevent="handleMenuClick(item.name)"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden"
            :class="
              activeTab === item.name
                ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            "
          >
            <component
              :is="item.icon"
              class="w-5 h-5 group-hover:scale-110 transition-transform relative z-10"
            />
            <span class="font-medium relative z-10">{{ item.name }}</span>
            <div
              v-if="activeTab === item.name"
              class="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"
            ></div>
          </a>
        </template>
      </nav>

      <div class="mt-auto pt-6 border-t border-white/5">
        <button
          @click="logout"
          class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-colors w-full group"
        >
          <LogOutIcon
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
          />
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Sidebar - Mobile Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar - Mobile Drawer -->
    <aside
      class="fixed top-0 left-0 bottom-0 w-72 bg-[#0a0a0f] z-50 transform transition-transform duration-300 lg:hidden flex flex-col p-6 border-r border-white/5"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between mb-12">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
          >
            <TerminalIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold tracking-tight">Finzo</span>
        </div>
        <button
          @click="isMobileMenuOpen = false"
          class="p-2 text-gray-400 hover:text-white"
        >
          <XIcon class="w-6 h-6" />
        </button>
      </div>

      <nav class="flex-1 space-y-2">
        <template v-for="item in menuItems" :key="item.name">
          <a
            href="#"
            @click.prevent="
              handleMenuClick(item.name);
              isMobileMenuOpen = false;
            "
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
            :class="
              activeTab === item.name
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            "
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.name }}</span>
          </a>
        </template>
      </nav>

      <!-- Mobile Wallet Section -->
      <div class="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <WalletIcon class="w-5 h-5 text-purple-400" />
            <span class="text-sm font-bold">Wallet</span>
          </div>
          <span
            v-if="account"
            class="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20"
          >
            Connected
          </span>
        </div>

        <div v-if="account" class="space-y-3">
          <div
            class="text-xs font-mono text-gray-400 break-all bg-black/20 p-2 rounded-lg border border-white/5"
          >
            {{ account }}
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs text-gray-500">Balance</span>
            <span class="text-xs font-bold text-white"
              >{{ parseFloat(balance || "0").toFixed(6) }} ETH</span
            >
          </div>
        </div>

        <button
          v-else
          @click="connect"
          :disabled="isConnecting"
          class="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <div
            v-if="isConnecting"
            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></div>
          {{ isConnecting ? "Connecting..." : "Connect Wallet" }}
        </button>
      </div>

      <div class="mt-auto pt-6 border-t border-white/5">
        <button
          @click="logout"
          class="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-colors w-full group"
        >
          <LogOutIcon class="w-5 h-5" />
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 md:p-10">
      <!-- Top Bar -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12"
      >
        <div class="flex items-center justify-between w-full md:w-auto">
          <div class="flex items-center gap-4 lg:hidden">
            <button
              @click="isMobileMenuOpen = true"
              class="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <MenuIcon class="w-6 h-6 text-white" />
            </button>
          </div>
          <div class="hidden md:block">
            <h2 class="text-2xl md:text-3xl font-bold text-white">
              System Dashboard
            </h2>
            <p class="text-gray-500 mt-1">Welcome back, Administrator</p>
          </div>
          <div class="md:hidden">
            <h2 class="text-xl font-bold text-white">Dashboard</h2>
          </div>
          <div class="lg:hidden">
            <div class="relative group">
              <BellIcon class="w-6 h-6 text-gray-400" />
              <span
                class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-[#050508] rounded-full"
              ></span>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between md:justify-end gap-4 md:gap-6"
        >
          <div class="hidden lg:block relative group">
            <BellIcon
              class="w-6 h-6 text-gray-400 group-hover:text-white cursor-pointer transition-colors"
            />
            <span
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#050508] rounded-full animate-ping opacity-75"
            ></span>
            <span
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#050508] rounded-full"
            ></span>
          </div>
          <div class="hidden md:flex items-center gap-3">
            <button
              @click="connect"
              :disabled="isConnecting"
              class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-sm transition-all border border-white/10 shadow-lg shadow-purple-500/20 disabled:opacity-50"
            >
              <WalletIcon v-if="!isConnecting" class="w-4 h-4" />
              <div
                v-else
                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              <span>{{
                account
                  ? `${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect Wallet"
              }}</span>
            </button>
            <div
              v-if="account"
              class="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px] font-mono text-purple-400"
            >
              {{ parseFloat(balance || "0").toFixed(4) }} ETH
            </div>
          </div>

          <div
            class="flex-1 md:flex-none flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
              class="w-8 h-8 rounded-full border border-white/10"
            />
            <span class="font-semibold text-sm truncate max-w-[120px]">{{
              user.email
            }}</span>
            <ChevronDownIcon
              class="w-4 h-4 text-gray-500 group-hover:text-white transition-colors"
            />
          </div>
        </div>
      </header>

      <!-- Tab Content Area -->
      <div
        v-if="activeTab === 'Overview'"
        class="animate-in fade-in duration-300"
      >
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard v-for="stat in stats" :key="stat.label" :stat="stat" />
        </div>

        <!-- Main Grid Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Activity Chart -->
          <div
            class="lg:col-span-2 bg-[#0a0a0f] p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl group overflow-hidden"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
            >
              <div>
                <h3 class="text-lg md:text-xl font-bold">Network Throughput</h3>
                <p class="text-[10px] md:text-xs text-gray-500 mt-1">
                  Live traffic monitoring
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  class="flex-1 sm:flex-none px-4 py-2 text-[10px] md:text-xs bg-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Live View
                </button>
                <button
                  class="flex-1 sm:flex-none px-4 py-2 text-[10px] md:text-xs bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 font-bold transition-all"
                >
                  History
                </button>
              </div>
            </div>
            <div
              class="h-48 md:h-64 flex items-end justify-between gap-1 md:gap-2 px-2 md:px-4 relative"
            >
              <!-- Mock Bars -->
              <div
                v-for="(h, i) in [
                  40, 70, 55, 90, 65, 80, 45, 100, 75, 60, 85, 50, 70, 40, 90,
                ]"
                :key="i"
                class="flex-1 rounded-t md:rounded-t-lg bg-gradient-to-t transition-all duration-700 hover:brightness-125 cursor-pointer relative group/bar"
                :class="
                  i % 2 === 0
                    ? 'from-purple-600/20 to-purple-600'
                    : 'from-indigo-600/20 to-indigo-600'
                "
                :style="{ height: h + '%' }"
              >
                <div
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20"
                >
                  {{ h }}%
                </div>
              </div>
              <!-- Grid Lines -->
              <div class="absolute inset-x-0 top-0 h-px bg-white/5"></div>
              <div class="absolute inset-x-0 top-1/2 h-px bg-white/5"></div>
              <div class="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>
            </div>
            <div
              class="flex justify-between mt-6 px-2 md:px-4 text-[8px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest"
            >
              <span>00:00</span><span class="hidden sm:inline">04:00</span
              ><span>08:00</span><span class="hidden sm:inline">12:00</span
              ><span>16:00</span><span class="hidden sm:inline">20:00</span
              ><span>Now</span>
            </div>
          </div>

          <!-- Recent Logs -->
          <div
            class="bg-[#0a0a0f] p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <h3 class="text-lg md:text-xl font-bold mb-8">System Activity</h3>
            <div class="space-y-6 md:space-y-8 relative">
              <div
                v-for="(log, i) in activities"
                :key="i"
                class="flex gap-4 group/item"
              >
                <div class="relative">
                  <div
                    class="w-3 h-3 rounded-full mt-1 shrink-0 relative z-10"
                    :class="log.color"
                  ></div>
                  <div
                    v-if="i < activities.length - 1"
                    class="absolute top-4 bottom-[-24px] md:bottom-[-32px] left-1.5 w-px bg-white/10"
                  ></div>
                </div>
                <div class="flex-1">
                  <p
                    class="text-xs md:text-sm font-semibold text-white group-hover/item:text-purple-400 transition-colors line-clamp-2 md:line-clamp-none"
                  >
                    {{ log.msg }}
                  </p>
                  <p
                    class="text-[10px] md:text-[11px] text-gray-500 mt-1 flex items-center gap-1"
                  >
                    <ClockIcon class="w-3 h-3" />
                    {{ log.time }}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-8 md:mt-10 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] md:text-xs font-bold transition-all border border-white/5 hover:border-white/10 tracking-widest uppercase"
            >
              View All Metrics
            </button>
          </div>
        </div>
      </div>

      <!-- Assets Tab Content -->
      <div
        v-else-if="activeTab === 'Tài sản'"
        class="animate-in fade-in duration-300"
      >
        <AssetsView />
      </div>

      <!-- Law Tab Content -->
      <div
        v-else-if="activeTab === 'Luật'"
        class="animate-in fade-in duration-300"
      >
        <LawView />
      </div>

      <!-- User Management Tab Content -->
      <div
        v-else-if="activeTab === 'Quản lý người dùng'"
        class="animate-in fade-in duration-300"
      >
        <UserManagementView />
      </div>
    </main>

    <!-- Right Accent Blobs -->
    <div
      class="fixed top-0 right-0 w-[40vw] h-[40vw] bg-purple-600/5 blur-[150px] rounded-full -mr-[10vw] -mt-[10vw] -z-10 pointer-events-none"
    ></div>
    <div
      class="fixed bottom-0 left-64 w-[30vw] h-[30vw] bg-blue-600/5 blur-[120px] rounded-full -ml-[10vw] -mb-[10vw] -z-10 pointer-events-none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  LayoutDashboard as DashboardIcon,
  Activity as ActivityIcon,
  Shield as SecurityIcon,
  Database as StorageIcon,
  Cpu as CpuIcon,
  Terminal as TerminalIcon,
  LogOut as LogOutIcon,
  Bell as BellIcon,
  ChevronDown as ChevronDownIcon,
  Zap as ZapIcon,
  Clock as ClockIcon,
  Menu as MenuIcon,
  X as XIcon,
  Wallet as WalletIcon,
  Users as UsersIcon,
} from "lucide-vue-next";

import StatCard from "../../components/StatCard.vue";
import AssetsView from "./AssetsView.vue";
import LawView from "../law/AdminLawView.vue";
import UserManagementView from "./UserManagementView.vue";
import { useWeb3 } from "../../composables/useWeb3";

const { account, connect, isConnecting, balance } = useWeb3();

const isMobileMenuOpen = ref(false);
const router = useRouter();
const user = JSON.parse(
  localStorage.getItem("user") || '{"email": "Guest", "role": "guest"}',
);

const logout = () => {
  localStorage.clear();
  router.push("/");
};

const menuItems = [
  { name: "Overview", icon: DashboardIcon, path: "/dashboard", module: "overview" },
  { name: "Tài sản", icon: SecurityIcon, path: "/assets", module: "assets" },
  { name: "Luật", icon: SecurityIcon, path: "/law-admin", module: "law" },
  { name: "Quản lý người dùng", icon: UsersIcon, path: "/users", module: "users" },
  { name: "Database Nodes", icon: StorageIcon, path: "/db-nodes", module: "db-nodes" },
  { name: "Usage Metrics", icon: ActivityIcon, path: "/metrics", module: "metrics" },
];

const route = useRoute();
const activeTab = computed(() => {
  const currentModule = route.meta.module as string;
  const item = menuItems.find(i => i.module === currentModule);
  return item ? item.name : "Overview";
});

const handleMenuClick = (tabName: string) => {
  const item = menuItems.find(i => i.name === tabName);
  if (item) {
    router.push(item.path);
  }
};

const stats = [
  {
    label: "CPU Usage",
    value: "24.8%",
    icon: CpuIcon,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    trend: 12,
  },
  {
    label: "Active RAM",
    value: "4.2 GB",
    icon: ZapIcon,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    trend: 5,
  },
  {
    label: "Network",
    value: "1.2 Gbps",
    icon: ActivityIcon,
    color: "text-green-400",
    bg: "bg-green-400/10",
    trend: 18,
  },
  {
    label: "Sys Uptime",
    value: "12d 4h",
    icon: TerminalIcon,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    trend: 2,
  },
];

const activities = [
  {
    msg: "System kernel updated to v2.4.1",
    time: "2 mins ago",
    color: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
  },
  {
    msg: "Global SSL certificates renewed",
    time: "14 mins ago",
    color: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]",
  },
  {
    msg: "Suspicious IP blocked: 192.168.1.104",
    time: "1 hour ago",
    color: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
  },
  {
    msg: "Automated backup completed",
    time: "3 hours ago",
    color: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
