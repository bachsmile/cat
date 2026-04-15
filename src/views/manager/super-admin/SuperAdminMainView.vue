<template>
  <div
    class="h-screen w-full bg-[#050507] text-[#E2E8F0] overflow-hidden flex relative"
    :style="globalFontStyle"
  >
    <!-- 🌠 Castle-Class Atmospheric Background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-[-10%] left-[20%] w-[70%] h-[50%] bg-gradient-to-b from-[#FFD700]/10 to-transparent blur-[180px] pointer-events-none z-0"
      ></div>
      <div
        class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full"
      ></div>
    </div>

    <!-- 🏰 Custom Super Admin Interaction Rail (Liquid Animation Set) -->
    <SuperAdminDock
      v-model="activeTab"
      @navigate="onDockNavigate"
      class="animate-dock-entrance"
    />

    <!-- 🌌 Main Execution Workspace -->
    <main
      class="flex-1 h-full flex flex-col relative z-10 bg-transparent animate-fade-in"
    >
      <!-- Header -->
      <header
        class="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-3xl"
      >
        <div class="flex items-center gap-6">
          <div class="flex flex-col">
            <h1 class="text-2xl font-black tracking-tighter text-white">
              QUẢN TRỊ <span class="text-gold-vibrant">TỐI CAO</span>
            </h1>
            <div class="flex items-center gap-2 mt-0.5">
              <div class="w-8 h-px bg-gold-vibrant/40"></div>
              <p
                class="text-[9px] font-black uppercase tracking-[0.4em] text-white/30"
              >
                Hạ tầng {{ activeNavItemName }}
              </p>
            </div>
          </div>
        </div>

        <!-- System Telemetry -->
        <div class="flex items-center gap-8">
          <div
            v-for="stat in systemStats"
            :key="stat.label"
            class="hidden md:flex flex-col items-end"
          >
            <span
              class="text-[8px] font-black uppercase tracking-widest text-white/20 mb-1"
              >{{ stat.label }}</span
            >
            <div class="flex items-center gap-2">
              <div
                :class="['w-1.5 h-1.5 rounded-full animate-pulse', stat.color]"
              ></div>
              <span class="text-xs font-bold text-white/60 tracking-wider">{{
                stat.value
              }}</span>
            </div>
          </div>

          <div class="h-10 w-px bg-white/5"></div>

          <!-- Profile Quick Action -->
          <div
            class="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all"
          >
            <div class="flex flex-col items-end">
              <span
                class="text-[10px] font-black text-white/80 tracking-tighter"
                >QUẢN TRỊ VIÊN</span
              >
              <span
                class="text-[8px] font-bold text-gold-vibrant/60 uppercase"
                >{{ user.username || "System" }}</span
              >
            </div>
            <div
              class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-vibrant to-orange-600 p-0.5 shadow-lg border border-white/10 group-hover:scale-105 transition-all"
            >
              <div
                class="w-full h-full bg-black rounded-[9px] flex items-center justify-center overflow-hidden"
              >
                <ShieldIcon class="w-5 h-5 text-gold-vibrant" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Dynamic Content Area -->
      <div class="flex-1 min-h-0 relative overflow-y-auto custom-scrollbar p-8">
        <Transition name="page-slide" mode="out-in">
          <!-- 1. DASHBOARD HUB (Bento Style) -->
          <div
            v-if="activeTab === 'hub'"
            key="hub"
            class="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto auto-rows-[minmax(180px,_auto)]"
          >
            <!-- 🏰 Hero Piece -->
            <div class="col-span-12 lg:col-span-8 row-span-2">
              <CgCard
                type="glass-frost"
                class="group !rounded-[3rem] relative overflow-hidden h-full flex items-center !p-12 border border-white/10 shadow-2xl"
              >
                <!-- Visual Decoration -->
                <div
                  class="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-gold-vibrant/10 to-transparent pointer-events-none"
                ></div>
                <div class="absolute bottom-0 right-0 w-1/2 h-full">
                  <img
                    src="@/assets/images/Mascot robot-otter với tablet hologram.png"
                    class="w-full h-full object-contain opacity-20 filter grayscale blur-[2px] transition-all duration-1000 group-hover:opacity-40 group-hover:grayscale-0 group-hover:blur-0"
                  />
                </div>

                <div class="relative z-10 w-full max-w-lg">
                  <div class="flex items-center gap-3 mb-8">
                    <span
                      class="px-4 py-1.5 rounded-full bg-gold-vibrant text-black text-[9px] font-black uppercase tracking-[0.2em]"
                      >GỐC HỆ THỐNG</span
                    >
                    <span
                      class="text-[9px] font-black uppercase tracking-[0.3em] text-white/30"
                      >Trạng thái hệ thống v4.2</span
                    >
                  </div>

                  <h1
                    class="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6"
                  >
                    Cụm Nexus <br />
                    <span
                      class="text-transparent bg-clip-text bg-gradient-to-r from-gold-vibrant to-white"
                      >Điều hành Toàn cầu</span
                    >
                  </h1>

                  <p
                    class="text-base text-white/40 font-medium leading-relaxed mb-10"
                  >
                    Tất cả các giao thức cốt lõi đang hoạt động bình thường.
                    <br />
                    Chào mừng trở lại,
                    <span class="text-white font-bold">{{
                      user.username || "Quản trị hệ thống"
                    }}</span
                    >.
                  </p>

                  <div class="flex flex-wrap gap-4">
                    <button
                      @click="activeTab = 'deposits'"
                      class="px-8 py-3.5 bg-gold-vibrant text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(255,215,0,0.2)]"
                    >
                      Xử lý giao dịch
                    </button>
                    <button
                      @click="activeTab = 'users'"
                      class="px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Kiểm tra Nút
                    </button>
                  </div>
                </div>
              </CgCard>
            </div>

            <!-- 📊 Metrics Pieces -->
            <div class="col-span-12 md:col-span-4 lg:col-span-4">
              <CgCard
                type="glass-frost"
                class="!rounded-[2.5rem] h-full !p-8 border border-white/5 flex flex-col justify-between group hover:border-gold-vibrant/30 transition-all bg-white/[0.02]"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="text-[10px] font-black uppercase tracking-[0.4em] text-white/30"
                  >
                    Danh tính Bảo mật
                  </h3>
                  <div
                    class="w-10 h-10 rounded-xl bg-gold-vibrant/10 border border-gold-vibrant/20 flex items-center justify-center"
                  >
                    <UsersIcon class="w-5 h-5 text-gold-vibrant" />
                  </div>
                </div>
                <div>
                  <h3
                    class="text-5xl font-black text-white tracking-tighter mt-4"
                  >
                    1,204
                  </h3>
                  <div
                    class="flex items-center gap-2 mt-2 text-emerald-500 text-[10px] font-bold"
                  >
                    <TrendingUpIcon class="w-4 h-4" />
                    <span>+12% TĂNG TRƯỞNG</span>
                  </div>
                </div>
              </CgCard>
            </div>

            <div class="col-span-12 md:col-span-4 lg:col-span-4">
              <CgCard
                type="glass-frost"
                class="!rounded-[2.5rem] h-full !p-8 border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-all bg-white/[0.02]"
              >
                <div class="flex items-center justify-between">
                  <h3
                    class="text-[10px] font-black uppercase tracking-[0.4em] text-white/30"
                  >
                    Nhịp mạng
                  </h3>
                  <div
                    class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
                  >
                    <GlobeIcon class="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <div>
                  <h3
                    class="text-5xl font-black text-white tracking-tighter mt-4"
                  >
                    42.8<span class="text-xl">GB/s</span>
                  </h3>
                  <div class="flex gap-1 mt-4">
                    <div
                      v-for="i in 8"
                      :key="i"
                      class="flex-1 h-1 rounded-full bg-blue-500/20 overflow-hidden"
                    >
                      <div
                        class="h-full bg-blue-500"
                        :style="{
                          width: Math.random() * 100 + '%',
                          opacity: 0.3 + Math.random() * 0.7,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </CgCard>
            </div>
          </div>

          <!-- Functional View Container -->
          <div
            v-else
            :key="activeTab"
            class="w-full animate-page-entrance"
          >
            <div class="px-2">
              <UserManagementView v-if="activeTab === 'users'" />
              <SuperAdminDepositView v-else-if="activeTab === 'deposits'" />
              <SuperAdminModuleView v-else-if="activeTab === 'modules'" />
              <SuperAdminOrganizationView
                v-else-if="activeTab === 'organizations'"
              />
              <div
                v-else
                class="flex items-center justify-center h-full text-white/10 font-black uppercase tracking-[0.5em]"
              >
                Đang triển khai Module: {{ activeNavItemName }}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </main>

    <!-- ⚙️ Control Drawer -->
    <Transition name="fade">
      <div
        v-if="showSettings"
        class="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
      >
        <CgCard
          type="glass-frost"
          class="w-full max-w-lg rounded-[3.5rem] p-12 relative border border-white/10 shadow-3xl"
        >
          <button
            @click="showSettings = false"
            class="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
          >
            <XIcon class="w-6 h-6 border-white/20" />
          </button>

          <h2
            class="text-3xl font-black text-white tracking-tighter mb-10 flex items-center gap-4"
          >
            <SettingsIcon class="w-8 h-8 text-gold-vibrant" />
            CẤU HÌNH HỆ THỐNG
          </h2>

          <div class="space-y-8">
            <div class="p-6 rounded-3xl bg-white/5 border border-white/10">
              <label
                class="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 block mb-4"
                >Font chữ Master</label
              >
              <select
                v-model="systemFont"
                class="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-sm text-white focus:outline-none focus:border-gold-vibrant/50 transition-all font-bold"
                @change="updateSystemFont"
              >
                <option value="Inter">Inter Enterprise</option>
                <option value="Outfit">Outfit Modern</option>
                <option value="Roboto">Roboto Standard</option>
                <option value="Montserrat">Montserrat Bold</option>
              </select>
            </div>
          </div>

          <button
            @click="logout"
            class="w-full mt-12 py-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-red-500 hover:text-white transition-all"
          >
            Đăng xuất hệ thống
          </button>
        </CgCard>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Globe as GlobeIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
} from "lucide-vue-next";
import { CgCard } from "glass-studio-ui-pro";
import SuperAdminDock from "@/components/admin/SuperAdminDock.vue";

// Views
import UserManagementView from "@/views/manager/admin/UserManagementView.vue";
import SuperAdminDepositView from "@/views/manager/super-admin/SuperAdminDepositView.vue";
import SuperAdminModuleView from "@/views/manager/super-admin/SuperAdminModuleView.vue";
import SuperAdminOrganizationView from "@/views/manager/super-admin/SuperAdminOrganizationView.vue";

const router = useRouter();
const route = useRoute();
const user = ref<any>(JSON.parse(localStorage.getItem("user") || "{}"));
const activeTab = ref((route.params.tab as string) || "hub");
const showSettings = ref(false);
const systemFont = ref(localStorage.getItem("system_font") || "Inter");

const activeNavItemName = computed(() => {
  const items = [
    { id: "hub", name: "Trung tâm điều khiển" },
    { id: "users", name: "Quản trị người dùng" },
    { id: "deposits", name: "Cổng tài chính" },
    { id: "organizations", name: "Sơ đồ tổ chức" },
    { id: "modules", name: "Cấu hình module" },
  ];
  return items.find((i) => i.id === activeTab.value)?.name || "Hệ thống";
});

const systemStats = [
  { label: "Độ ổn định", value: "99.98%", color: "bg-emerald-500" },
  { label: "Tải hệ thống", value: "0.24", color: "bg-blue-500" },
  { label: "Nút hoạt động", value: "12", color: "bg-gold-vibrant" },
];

const updateSystemFont = () => {
  localStorage.setItem("system_font", systemFont.value);
  window.location.reload();
};

const onDockNavigate = (id: string) => {
  if (id === "settings") {
    showSettings.value = true;
  } else {
    router.push(`/sp-ad/${id}`);
  }
};

// Sync tab with route
watch(
  () => route.params.tab,
  (newTab) => {
    if (newTab) {
      activeTab.value = newTab as string;
    } else {
      activeTab.value = "hub";
    }
  },
);

const globalFontStyle = computed(() => ({
  fontFamily: `'${systemFont.value}', sans-serif`,
}));

const logout = () => {
  localStorage.removeItem("user");
  router.push("/auth/login");
};

onMounted(() => {
  if (!localStorage.getItem("user")) {
    router.push("/auth/login");
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 99px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 215, 0, 0.3);
}

.animate-page-entrance {
  animation: entrance 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes entrance {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes dock-entrance {
  from {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-dock-entrance {
  animation: dock-entrance 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.page-slide-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
