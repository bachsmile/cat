<template>
  <div
    class="min-h-screen bg-[#050508] text-white flex font-['Inter',_sans-serif]"
  >
    <!-- Sidebar -->
    <aside class="w-64 bg-[#0a0a0f] border-r border-white/5 flex flex-col p-6">
      <div class="flex items-center gap-3 mb-12">
        <div
          class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
        >
          <TerminalIcon class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold tracking-tight">NovaOS</span>
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

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-10">
      <!-- Top Bar -->
      <header class="flex items-center justify-between mb-12">
        <div>
          <h2 class="text-3xl font-bold text-white">System Dashboard</h2>
          <p class="text-gray-500 mt-1">Welcome back, Administrator</p>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative group">
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
          <div
            class="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="avatar"
              class="w-8 h-8 rounded-full border border-white/10"
            />
            <span class="font-semibold text-sm">{{ user.email }}</span>
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
            class="lg:col-span-2 bg-[#0a0a0f] p-8 rounded-3xl border border-white/5 shadow-xl group"
          >
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="text-xl font-bold">Network Throughput</h3>
                <p class="text-xs text-gray-500 mt-1">
                  Live traffic monitoring
                </p>
              </div>
              <div class="flex gap-2">
                <button
                  class="px-4 py-2 text-xs bg-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Live View
                </button>
                <button
                  class="px-4 py-2 text-xs bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 font-bold transition-all"
                >
                  History
                </button>
              </div>
            </div>
            <div
              class="h-64 flex items-end justify-between gap-2 px-4 relative"
            >
              <!-- Mock Bars -->
              <div
                v-for="(h, i) in [
                  40, 70, 55, 90, 65, 80, 45, 100, 75, 60, 85, 50, 70, 40, 90,
                ]"
                :key="i"
                class="flex-1 rounded-t-lg bg-gradient-to-t transition-all duration-700 hover:brightness-125 cursor-pointer relative group/bar"
                :class="
                  i % 2 === 0
                    ? 'from-purple-600/20 to-purple-600'
                    : 'from-indigo-600/20 to-indigo-600'
                "
                :style="{ height: h + '%' }"
              >
                <div
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity"
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
              class="flex justify-between mt-6 px-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest"
            >
              <span>00:00</span><span>04:00</span><span>08:00</span
              ><span>12:00</span><span>16:00</span><span>20:00</span
              ><span>Now</span>
            </div>
          </div>

          <!-- Recent Logs -->
          <div
            class="bg-[#0a0a0f] p-8 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <h3 class="text-xl font-bold mb-8">System Activity</h3>
            <div class="space-y-8 relative">
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
                    class="absolute top-4 bottom-[-32px] left-1.5 w-px bg-white/10"
                  ></div>
                </div>
                <div class="flex-1">
                  <p
                    class="text-sm font-semibold text-white group-hover/item:text-purple-400 transition-colors"
                  >
                    {{ log.msg }}
                  </p>
                  <p
                    class="text-[11px] text-gray-500 mt-1 flex items-center gap-1"
                  >
                    <ClockIcon class="w-3 h-3" />
                    {{ log.time }}
                  </p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold transition-all border border-white/5 hover:border-white/10 tracking-widest uppercase"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
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
} from "lucide-vue-next";

import StatCard from "../components/StatCard.vue";
import AssetsView from "./AssetsView.vue";

const router = useRouter();
const user = JSON.parse(
  localStorage.getItem("user") || '{"email": "Guest", "role": "guest"}',
);

const logout = () => {
  localStorage.clear();
  router.push("/");
};

const menuItems = [
  { name: "Overview", icon: DashboardIcon },
  { name: "Tài sản", icon: SecurityIcon },
  { name: "Security Center", icon: SecurityIcon },
  { name: "Database Nodes", icon: StorageIcon },
  { name: "Usage Metrics", icon: ActivityIcon },
];

const activeTab = ref("Overview");

const handleMenuClick = (tabName: string) => {
  activeTab.value = tabName;
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
