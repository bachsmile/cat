<template>
  <div
    class="min-h-screen bg-[#f8f9fd] p-8 md:p-12 lg:p-20 overflow-hidden relative animate-in-view"
    :style="{
      backgroundImage: `url(${hubBg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      fontFamily: systemFont,
    }"
  >
    <!-- Background accents -->
    <div
      class="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-200/30 blur-[120px] rounded-full"
    ></div>
    <div
      class="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-orange-200/30 blur-[100px] rounded-full"
    ></div>

    <div class="max-w-[1600px] mx-auto relative z-10">
      <!-- Header -->
      <header class="mb-12 flex items-center justify-between">
        <div
          @click="activeTab = 'hub'"
          class="cursor-pointer group flex items-center gap-4"
        >
          <div
            class="w-14 h-14 bg-[#1a1c3d] rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-500"
          >
            <LayersIcon v-if="activeTab === 'hub'" class="w-7 h-7" />
            <DashIcon v-else class="w-7 h-7 text-orange-400" />
          </div>
          <div>
            <h2
              class="text-4xl font-black tracking-tighter text-[#1a1c3d] flex items-center gap-2"
            >
              Super <span class="text-orange-500">Admin</span> Hub
            </h2>
            <p
              class="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400"
            >
              {{
                activeTab === "hub"
                  ? "System Infrastructure Control"
                  : `Global ${activeTab} Management`
              }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <button
            @click="showSettings = true"
            class="p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white hover:bg-white transition-all text-gray-400 hover:text-[#1a1c3d] group"
          >
            <SettingsIcon
              class="w-6 h-6 group-hover:rotate-90 transition-transform duration-500"
            />
          </button>

          <div
            class="flex items-center gap-4 bg-white/80 backdrop-blur-xl p-2 rounded-3xl shadow-xl border border-white"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20"
            >
              {{ currentUser.displayName?.[0] || "S" }}
            </div>
            <div class="pr-6">
              <p
                class="text-xs font-bold text-[#1a1c3d] uppercase tracking-widest"
              >
                {{ currentUser.displayName || "Root Admin" }}
              </p>
              <p
                class="text-[10px] text-gray-400 font-bold uppercase tracking-widest"
              >
                Master Authority
              </p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Shell Content -->
      <div class="relative min-h-[70vh]">
        <Transition name="fade-scale" mode="out-in" appear>
          <!-- 1. HUB GRID (Overview) -->
          <div
            v-if="activeTab === 'hub'"
            key="hub"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <CgCard
              v-for="domain in DOMAINS"
              :key="domain.id"
              type="fine-frost"
              :shadow="true"
              @click="enterModule(domain.id)"
              class="rounded-[3rem] p-10 hover:translate-y-[-8px] transition-all duration-500 cursor-pointer border border-transparent hover:border-white group"
            >
              <div class="flex flex-col gap-6">
                <div
                  class="w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl shadow-white/30"
                  :class="[domain.shadow, domain.color, 'bg-white']"
                >
                  <component :is="domain.icon" class="w-8 h-8" />
                </div>
                <div>
                  <h3
                    class="text-2xl font-bold text-[#1a1c3d] tracking-tight group-hover:text-orange-500 transition-colors"
                  >
                    {{ domain.name }}
                  </h3>
                  <p
                    class="text-sm text-gray-400 mt-3 line-clamp-3 leading-relaxed font-medium"
                  >
                    {{ domain.desc }}
                  </p>
                </div>

                <div
                  class="mt-4 pt-6 border-t border-gray-100 flex items-center justify-between"
                >
                  <span
                    class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300"
                  >
                    {{ domain.features.length }} Hub Sub-modules
                  </span>
                  <div
                    class="w-8 h-8 rounded-full border border-gray-100 group-hover:bg-[#1a1c3d] group-hover:text-white group-hover:border-transparent flex items-center justify-center transition-all"
                  >
                    <ArrowRightIcon
                      class="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </CgCard>
          </div>

          <!-- 2. USERS (Global Management) -->
          <CgCard
            v-else-if="activeTab === 'users'"
            key="users"
            type="light-frost"
            :shadow="true"
            class="rounded-[4rem] p-12 relative overflow-hidden h-full"
          >
            <UserManagementView />
          </CgCard>

          <!-- 3. ADMINS (Admin Management) -->
          <CgCard
            v-else-if="activeTab === 'admins'"
            key="admins"
            type="glass-frost"
            :shadow="true"
            class="rounded-[4rem] p-12 relative overflow-hidden h-full"
          >
            <UserManagementView initial-role="admin" />
          </CgCard>

          <!-- 4. MODULES (Global System) -->
          <CgCard
            v-else-if="activeTab === 'modules'"
            key="modules"
            type="glass-frost"
            :shadow="true"
            class="rounded-[4rem] p-12 h-full"
          >
            <SuperAdminModuleView />
          </CgCard>

          <!-- 5. ORGANIZATIONS (Entity Management) -->
          <CgCard
            v-else-if="activeTab === 'organizations'"
            key="organizations"
            type="glass-frost"
            :shadow="true"
            class="rounded-[4rem] p-12 h-full"
          >
            <SuperAdminOrganizationView />
          </CgCard>
        </Transition>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showSettings"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#1a1c3d]/20 backdrop-blur-sm animate-in fade-in duration-300"
      >
        <CgCard
          type="fine-frost"
          :shadow="true"
          class="w-full max-w-lg rounded-[3rem] p-12 relative animate-in zoom-in-95 duration-300 border border-white"
        >
          <button
            @click="showSettings = false"
            class="absolute top-8 right-8 p-3 text-gray-300 hover:text-gray-900 transition-colors z-20"
          >
            <XIcon class="w-6 h-6" />
          </button>
          <h2 class="text-3xl font-black text-[#1a1c3d] tracking-tighter mb-8">
            Hub <span class="text-orange-500">Settings</span>
          </h2>

          <div class="space-y-10">
            <!-- Background Setting -->
            <div class="space-y-4">
              <label
                class="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1"
                >Hub Background Image</label
              >
              <div class="flex gap-3">
                <input
                  v-model="tempHubBg"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  class="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-all font-medium text-sm"
                />
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="preset in bgPresets"
                  :key="preset"
                  @click="tempHubBg = preset"
                  class="h-16 rounded-xl cursor-pointer border-2 transition-all hover:scale-105"
                  :class="
                    tempHubBg === preset
                      ? 'border-orange-500'
                      : 'border-transparent'
                  "
                  :style="{
                    backgroundImage: `url(${preset})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }"
                ></div>
              </div>
            </div>

            <!-- Font Setting -->
            <div class="space-y-4">
              <label
                class="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1"
                >System Global Font</label
              >
              <select
                v-model="tempSystemFont"
                class="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-all font-bold text-[#1a1c3d]"
              >
                <option v-for="f in fonts" :key="f.value" :value="f.value">
                  {{ f.name }}
                </option>
              </select>
            </div>

            <!-- Actions -->
            <div class="flex gap-4 pt-4">
              <button
                @click="showSettings = false"
                class="flex-1 py-5 rounded-2xl font-bold text-gray-400 hover:text-[#1a1c3d] hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                @click="applySettings"
                class="flex-1 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-orange-500/30 transition-all active:scale-95"
              >
                Save Changes
              </button>
            </div>
          </div>
        </CgCard>
      </div>
    </Teleport>

    <!-- Super Admin Dock -->
    <Teleport to="body">
      <SuperAdminDock v-model="activeDockId" @navigate="onDockNavigate" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Settings as SettingsIcon,
  ArrowRight as ArrowRightIcon,
  X as XIcon,
  Layers as LayersIcon,
  LayoutDashboard as DashIcon,
} from "lucide-vue-next";
import { DOMAINS } from "@/constants/modules";
import SuperAdminDock from "@/components/admin/SuperAdminDock.vue";
import UserManagementView from "../admin/UserManagementView.vue";
import SuperAdminModuleView from "./SuperAdminModuleView.vue";
import SuperAdminOrganizationView from "./SuperAdminOrganizationView.vue";
import { CgCard } from "glass-studio-ui-pro";

const router = useRouter();
const activeTab = ref("hub");
const activeDockId = ref("dashboard");
const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
const showSettings = ref(false);

const hubBg = ref(
  localStorage.getItem("hub_bg") ||
    "https://m.yodycdn.com/blog/hinh-nen-thien-nhien-4k-yody-vn-61.jpg",
);
const systemFont = ref(
  localStorage.getItem("system_font") || "'Outfit', sans-serif",
);

const tempHubBg = ref(hubBg.value);
const tempSystemFont = ref(systemFont.value);

const bgPresets = [
  "https://m.yodycdn.com/blog/hinh-nen-thien-nhien-4k-yody-vn-61.jpg",
  "https://vietnamest.com/wp-content/uploads/2023/10/hinh-nen-chill-cho-may-tinh-vietnamest-20.jpg",
  "https://wallpapers.com/images/featured/dark-blue-abstract-5itntst15a4of38a.jpg",
];

const fonts = [
  { name: "Outfit (Modern)", value: "'Outfit', sans-serif" },
  { name: "Inter (Professional)", value: "'Inter', sans-serif" },
  { name: "Poppins (Rounded)", value: "'Poppins', sans-serif" },
  { name: "Montserrat (Classic)", value: "'Montserrat', sans-serif" },
  { name: "Playfair (Luxury)", value: "'Playfair Display', serif" },
  { name: "Merriweather (Readability)", value: "'Merriweather', serif" },
];

const applySettings = () => {
  hubBg.value = tempHubBg.value;
  systemFont.value = tempSystemFont.value;

  localStorage.setItem("hub_bg", hubBg.value);
  localStorage.setItem("system_font", systemFont.value);

  // Apply globally
  document.documentElement.style.setProperty("--system-font", systemFont.value);

  showSettings.value = false;
};

const onDockNavigate = (id: string) => {
  activeDockId.value = id;
  if (id === "dashboard") activeTab.value = "hub";
  else if (id === "users") activeTab.value = "users";
  else if (id === "admins") activeTab.value = "admins";
  else if (id === "modules") activeTab.value = "modules";
  else if (id === "organizations") activeTab.value = "organizations";
  else if (id === "settings") showSettings.value = true;
};

const enterModule = (moduleId: string) => {
  activeTab.value = "modules"; // Or specialized logic
  router.push(`/super-admin/${moduleId}`);
};

onMounted(() => {
  document.documentElement.style.setProperty("--system-font", systemFont.value);
});
</script>

<style scoped>
.animate-in-view {
  animation: entrance 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes entrance {
  from {
    opacity: 0;
    transform: scale(1.05) translateY(20px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.02) translateY(-10px);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes zoom-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-in {
  animation-fill-mode: forwards;
}
.fade-in {
  animation-name: fade-in;
}
.zoom-in-95 {
  animation-name: zoom-in;
}
</style>
