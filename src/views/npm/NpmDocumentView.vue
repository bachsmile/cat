<template>
  <div class="min-h-screen bg-[#050508] text-white flex flex-col ">
    <!-- Navbar -->
    <nav class="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-[60]">
      <div class="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-4 cursor-pointer group" @click="$router.push('/npm')">
          <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
            <ChevronLeftIcon class="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] font-black uppercase tracking-widest text-[#a855f7]/60">NPM Ecosystem</span>
            <span class="text-sm font-bold">Glass Studio UI Pro</span>
          </div>
        </div>
        
        <div class="flex items-center gap-6">
           <div class="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 opacity-60 hover:opacity-100 transition-opacity cursor-help">
              <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span class="text-[10px] font-black uppercase tracking-widest">v1.1.3 Stable</span>
           </div>
           <button class="p-2 text-gray-400 hover:text-white transition-colors">
              <SearchIcon class="w-5 h-5" />
           </button>
        </div>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar -->
      <aside class="w-72 border-r border-white/5 bg-[#0a0a0f]/40 backdrop-blur-xl flex flex-col h-[calc(100vh-64px)] overflow-y-auto custom-sidebar-scroll sticky top-0">
        <div class="p-8 space-y-10">
          <div v-for="cat in menuStructure" :key="cat.id" class="space-y-4">
            <h4 class="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 px-4 select-none">{{ cat.label }}</h4>
            <nav class="space-y-1">
              <router-link
                v-for="item in cat.items"
                :key="item.id"
                :to="`/npm/docs/${projectId}${item.path}`"
                class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium relative group overflow-hidden border border-transparent"
                active-class="active-link"
              >
                <span class="relative z-10 transition-colors group-hover:text-white" :class="!$route.path.endsWith(item.path) ? 'text-gray-500' : 'text-purple-400'">{{ item.label }}</span>
                <div v-if="$route.path.endsWith(item.path)" class="absolute inset-0 bg-purple-500/10 -z-0"></div>
                <div v-if="$route.path.endsWith(item.path)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              </router-link>
            </nav>
          </div>

          <!-- Documentation Actions -->
          <div class="pt-8 border-t border-white/5 space-y-4">
             <div class="px-4 text-[10px] font-black uppercase tracking-widest text-gray-700">Resources</div>
             <a href="#" class="flex items-center gap-3 px-4 text-sm text-gray-500 hover:text-purple-400 transition-colors">
                <GithubIcon class="w-4 h-4" />
                <span>Repository</span>
             </a>
             <a href="#" class="flex items-center gap-3 px-4 text-sm text-gray-500 hover:text-purple-400 transition-colors">
                <BoxIcon class="w-4 h-4" />
                <span>NPM Package</span>
             </a>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-6 md:p-12 bg-[#050508]/50 custom-sidebar-scroll relative">
        <!-- Decoration blobs -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div class="max-w-5xl mx-auto relative z-10">
          <router-view v-slot="{ Component }">
            <transition name="fade-slide" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- Global Filters -->
    <CgFilters />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  ChevronLeft as ChevronLeftIcon, 
  Search as SearchIcon,
  Github as GithubIcon,
  Package as BoxIcon,
} from 'lucide-vue-next';
import { CgFilters } from 'glass-studio-ui-pro';

const route = useRoute();
const projectId = computed(() => route.params.id as string);

const menuStructure = [
  {
    id: "getting-started",
    label: "Getting Started",
    items: [
      { id: "foundation", label: "Color Foundation", path: "/foundation" },
    ],
  },
  {
    id: "customize",
    label: "Customize",
    items: [
      { id: "typography", label: "Typography", path: "/typography" },
    ],
  },
  {
    id: "components",
    label: "Components",
    items: [
      { id: "components-buttons", label: "Buttons", path: "/components/buttons" },
      { id: "components-cards", label: "Cards", path: "/components/cards" },
      { id: "components-checkboxes", label: "Checkboxes", path: "/components/checkboxes" },
      { id: "components-modals", label: "Modals", path: "/components/modals" },
      { id: "components-toolbars", label: "Toolbars", path: "/components/toolbars" },
    ],
  },
];
</script>

<style scoped>
.active-link {
  border-color: rgba(168, 85, 247, 0.2) !important;
}

.custom-sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
}
.custom-sidebar-scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
