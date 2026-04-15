<template>
  <div
    class="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-[#f3f4f9] p-4 md:p-6 lg:p-10  lg:overflow-hidden"
  >
    <!-- 1. Narrow Left Sidebar (Desktop Only) -->
    <div
      class="hidden lg:flex w-28 flex-col items-center py-10 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-xl shadow-gray-200/50 mr-8"
    >
      <div
        class="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-2xl mb-12 shadow-inner"
      >
        <span class="txt-orange-600 font-bold text-xl">S</span>
      </div>

      <nav class="flex-1 flex flex-col gap-10">
        <button
          @click="router.push('/super-admin')"
          class="p-4 rounded-2xl bg-white shadow-lg txt-brand-600 border border-gray-100 transition-all active:scale-90"
        >
          <LayoutIcon class="w-6 h-6" />
        </button>
        <button
          class="p-4 rounded-2xl txt-gray-400 hover:bg-white hover:txt-brand-600 hover:shadow-md transition-all"
        >
          <SettingsIcon class="w-6 h-6" />
        </button>
        <button
          class="p-4 rounded-2xl txt-gray-400 hover:bg-white hover:txt-brand-600 hover:shadow-md transition-all"
        >
          <FilterIcon class="w-6 h-6" />
        </button>
        <button
          class="p-4 rounded-2xl txt-gray-400 hover:bg-white hover:txt-brand-600 hover:shadow-md transition-all"
        >
          <MapPinIcon class="w-6 h-6" />
        </button>
        <button
          class="p-4 rounded-2xl txt-gray-400 hover:bg-white hover:txt-brand-600 hover:shadow-md transition-all"
        >
          <UserIcon class="w-6 h-6" />
        </button>
        <button
          class="p-4 rounded-2xl txt-gray-400 hover:bg-white hover:txt-red-500 hover:shadow-sm transition-all mt-auto"
        >
          <TrashIcon class="w-6 h-6" />
        </button>
      </nav>

      <div class="mt-8">
        <img
          :src="
            currentUser.avatar ||
            'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
          "
          class="w-12 h-12 rounded-2xl border-2 border-white shadow-xl"
        />
      </div>
    </div>

    <!-- Mobile Top Header -->
    <div class="lg:hidden flex items-center justify-between mb-6 px-2">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-orange-100 flex items-center justify-center rounded-xl">
           <span class="txt-orange-600 font-bold">S</span>
        </div>
        <h2 class="font-bold txt-brand-900">Super Admin</h2>
      </div>
      <button class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
        <MoreHorizontalIcon class="w-5 h-5 txt-gray-400" />
      </button>
    </div>

    <!-- 2. Main Dashboard Content Area -->
    <main
      class="flex-1 bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white p-8 md:p-12 lg:p-16 flex flex-col relative overflow-hidden"
    >
      <!-- Top Nav -->
      <header class="flex items-center justify-between mb-8 md:mb-12">
        <div
          class="flex items-center gap-4 txt-gray-400 font-bold group cursor-pointer"
        >
          <ChevronLeftIcon
            class="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform"
          />
          <span class="text-lg md:text-xl">Global</span>
          <ChevronDownIcon class="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div class="flex items-center gap-4 md:gap-8">
          <div class="flex items-center gap-3">
            <DropletsIcon class="w-4 h-4 md:w-5 md:h-5 txt-brand-500" />
            <span class="text-lg md:text-xl font-bold txt-brand-900">53%</span>
          </div>
          <button
            class="hidden md:flex w-10 h-10 items-center justify-center bg-gray-50 rounded-full"
          >
            <MoreHorizontalIcon class="w-5 h-5 txt-gray-300" />
          </button>
          <div
            class="w-10 h-5 md:w-12 md:h-6 bg-gray-100 rounded-full relative cursor-pointer shadow-inner"
          >
            <div
              class="absolute top-0.5 md:top-1 left-0.5 md:left-1 w-4 h-4 bg-white rounded-full shadow-md"
            ></div>
          </div>
        </div>
      </header>

      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-bold txt-brand-900 tracking-tighter mb-8"
      >
        System <span class="txt-orange-500">Overview</span>
      </h1>

      <!-- The Central Gauge Widget -->
      <div class="flex-1 flex flex-col items-center justify-center relative my-12 md:my-0">
        <div
          class="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
        >
          <!-- Circular Gauge Background -->
          <svg class="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="#f8f9fc"
              stroke-width="10"
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
              stroke-dashoffset="140"
              stroke-linecap="round"
            />
          </svg>

          <div class="z-10 text-center scale-90 md:scale-110">
            <p
              class="text-[10px] md:text-xs font-bold txt-gray-400 uppercase tracking-widest mb-1"
            >
              Total System Load
            </p>
            <h2
              class="text-6xl md:text-7xl lg:text-8xl font-bold txt-brand-900 tracking-tighter"
            >
              72<span class="text-2xl md:text-3xl txt-gray-300 font-medium">%</span>
            </h2>
            <div class="flex items-center justify-center gap-2 mt-4">
              <div
                class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
              ></div>
              <p
                class="text-[10px] font-bold txt-gray-500 uppercase tracking-[0.2em]"
              >
                Stable Operations
              </p>
            </div>
          </div>

          <!-- Controls on Gauge -->
          <div
            class="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#f3f4f9] rounded-2xl flex items-center justify-center shadow-lg border border-white"
          >
            <MinusIcon class="w-4 h-4 md:w-6 md:h-6 txt-gray-400" />
          </div>
          <div
            class="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-[#f3f4f9] rounded-2xl flex items-center justify-center shadow-lg border border-white"
          >
            <PlusIcon class="w-4 h-4 md:w-6 md:h-6 txt-gray-400" />
          </div>
        </div>

        <div class="text-center mt-6 md:mt-8">
          <PauseIcon class="w-5 h-5 md:w-6 md:h-6 txt-gray-300 mx-auto mb-2" />
          <p class="text-[10px] md:text-xs font-bold txt-gray-400">1:23m until next sync</p>
        </div>
      </div>

      <!-- Bottom Bar Charts -->
      <div class="mt-auto hidden md:block">
        <p
          class="text-[10px] font-bold uppercase tracking-[0.3em] txt-gray-400 mb-6"
        >
          Traffic Analysis (7 Days)
        </p>
        <div class="flex items-end justify-between gap-3 h-32">
          <div
            v-for="(v, i) in [
              19, 28, 45, 30, 85, 55, 30, 42, 60, 35, 25, 40, 50,
            ]"
            :key="i"
            class="flex-1 rounded-2xl transition-all duration-700 relative group cursor-pointer"
            :class="
              v > 80
                ? 'bg-orange-500 h-full shadow-[0_15px_30px_rgba(249,115,22,0.3)]'
                : v === 60
                  ? 'bg-[#5c59f0] h-3/5'
                  : 'bg-gray-100 h-1/2 hover:bg-gray-200'
            "
            :style="{ height: `${v}%` }"
          >
            <div
              class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1c3d] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {{ v }}k
            </div>
            <span
              class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold txt-gray-400"
              >{{ 19 + i }}</span
            >
          </div>
        </div>
      </div>
    </main>

    <!-- 3. Right Sidebar (Shortcuts & Devices) -->
    <aside
      class="w-full lg:w-96 mt-8 lg:mt-0 lg:pl-12 flex flex-col gap-8 md:gap-12 py-4 lg:py-8 overflow-y-auto scrollbar-hide pb-24 lg:pb-8"
    >
      <!-- Shortcuts -->
      <section>
        <div class="flex items-center justify-between mb-6 md:mb-8">
          <h3
            class="text-xs font-bold uppercase tracking-widest txt-brand-900"
          >
            Quick access
          </h3>
          <ChevronDownIcon class="w-4 h-4 txt-gray-300" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <!-- Shortcut Item 1 -->
          <div
            class="bg-white p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 flex items-center gap-5 border border-white group hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div
              class="w-12 h-12 md:w-14 md:h-14 bg-brand-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30"
            >
              <ArrowUpRightIcon class="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold txt-brand-900 truncate">
                Total Revenue
              </h4>
              <p class="text-[10px] txt-gray-400 font-bold">$124,502.50</p>
            </div>
          </div>
          <!-- Shortcut Item 2 -->
          <div
            class="bg-white p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 flex items-center gap-5 border border-white group hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div
              class="w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30"
            >
              <GlobeIcon class="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold txt-brand-900 truncate">
                Global Traffic
              </h4>
              <p class="text-[10px] txt-gray-400 font-bold">142,822 Hits</p>
            </div>
          </div>
          <!-- Shortcut Item 3 -->
          <div
            class="bg-white p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 flex items-center gap-5 border border-white group hover:scale-[1.02] transition-all cursor-pointer relative"
          >
            <div
              class="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-lg shadow-yellow-500/30"
            >
              <ShieldAlertIcon class="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-bold txt-brand-900 truncate">
                Security Alerts
              </h4>
              <div class="flex items-center gap-2">
                <span class="text-[10px] txt-gray-400 font-bold"
                  >9 Issues</span
                >
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span
                  class="text-[9px] txt-brand-600 font-bold uppercase tracking-widest"
                  >Active</span
                >
              </div>
            </div>
            <div
              class="w-10 h-5 bg-gray-100 rounded-full flex items-center px-1 shadow-inner absolute right-6 top-1/2 -translate-y-1/2"
            >
              <div
                class="w-3 h-3 bg-brand-500 rounded-full shadow-md ml-auto"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Status -->
      <section>
        <div class="flex items-center justify-between mb-8">
          <h3
            class="text-xs font-bold uppercase tracking-widest txt-brand-900"
          >
            System Nodes
          </h3>
          <ChevronDownIcon class="w-4 h-4 txt-gray-300" />
        </div>

        <div class="grid grid-cols-4 lg:grid-cols-3 gap-4 md:gap-6">
          <div
            v-for="i in 5"
            :key="i"
            class="w-full aspect-square bg-white rounded-2xl md:rounded-3xl shadow-lg border border-white flex items-center justify-center txt-gray-400 hover:txt-brand-600 transition-colors cursor-pointer group"
          >
            <component
              :is="
                i === 1
                  ? HardDriveIcon
                  : i === 2
                    ? DatabaseIcon
                    : i === 3
                      ? MonitorIcon
                      : i === 4
                        ? WebcamIcon
                        : CloudIcon
              "
              class="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
            />
            <div
              v-if="i === 1 || i === 4"
              class="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_5px_rgba(249,115,22,0.8)]"
            ></div>
          </div>
          <button
            class="w-full aspect-square border-2 border-dashed border-gray-100 rounded-2xl md:rounded-3xl flex items-center justify-center txt-gray-200 hover:border-gray-200 transition-all"
          >
            <PlusIcon class="w-5 h-5" />
          </button>
        </div>
      </section>

      <!-- Context Switch (Desktop Only) -->
      <section class="mt-auto pt-8 hidden lg:block">
        <div
          class="bg-brand-900 rounded-[2.5rem] p-6 text-white overflow-hidden relative"
        >
          <div
            class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
          ></div>
          <div class="flex items-center justify-between">
            <h5 class="text-xs font-bold uppercase tracking-widest">
              Active nodes
            </h5>
            <ChevronDownIcon class="w-4 h-4 text-white/50" />
          </div>
          <p class="text-3xl font-bold mt-4 leading-tight">
            4 Regional<br />Clusters
          </p>
        </div>
      </section>
    </aside>

    <!-- Floating Mobile Bottom Nav -->
    <div class="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/80 backdrop-blur-xl border border-white/50 p-2 px-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between z-[100]">
        <button @click="router.push('/super-admin')" class="p-4 rounded-2xl bg-orange-100 txt-orange-600">
           <LayoutIcon class="w-6 h-6" />
        </button>
        <button class="p-4 txt-gray-400 hover:txt-brand-600">
           <SettingsIcon class="w-6 h-6" />
        </button>
        <button class="p-4 txt-gray-400 hover:txt-brand-600">
           <UserIcon class="w-6 h-6" />
        </button>
        <div class="w-10 h-10 ml-2 rounded-xl overflow-hidden border-2 border-white shadow-md">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" class="w-full h-full object-cover" />
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  Settings as SettingsIcon,
  Filter as FilterIcon,
  MapPin as MapPinIcon,
  User as UserIcon,
  Trash2 as TrashIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronDown as ChevronDownIcon,
  Droplets as DropletsIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Pause as PauseIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Globe as GlobeIcon,
  ShieldAlert as ShieldAlertIcon,
  HardDrive as HardDriveIcon,
  Database as DatabaseIcon,
  Monitor as MonitorIcon,
  Camera as WebcamIcon,
  Cloud as CloudIcon,
} from "lucide-vue-next";

const router = useRouter();
const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap");

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
