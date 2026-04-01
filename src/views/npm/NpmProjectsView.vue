<template>
  <div class="min-h-screen bg-[#050508] text-white">
    <!-- Navbar -->
    <nav class="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3 cursor-pointer" @click="$router.push('/home')">
          <ChevronLeftIcon class="w-5 h-5 text-gray-400" />
          <span class="text-lg font-bold">{{ $t('npmTitle') }}</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <UserIcon class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 py-12">
      <div class="mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ $t('npmTitle') }}</h1>
        <p class="text-gray-400">{{ $t('npmSubtitle') }}</p>
      </div>

      <!-- Project Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="glass-panel group relative overflow-hidden rounded-[2.5rem] border border-white/10 p-1"
        >
          <div class="bg-[#0a0a0f] rounded-[2.25rem] p-8 h-full flex flex-col">
            <!-- Icon -->
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <component :is="project.icon" class="w-8 h-8 text-white" />
            </div>

            <h2 class="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">{{ project.name }}</h2>
            <p class="text-gray-500 mb-8 flex-grow leading-relaxed">
              {{ $t('npmSubtitle') }}
            </p>

            <div class="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
              <div class="flex flex-col">
                <span class="text-[10px] uppercase tracking-widest text-gray-600 font-bold">{{ $t('npmStartingAt') }}</span>
                <span class="text-xl font-bold text-white">${{ project.startingPrice }} <span class="text-xs text-gray-500 font-normal">{{ $t('npmPerMonth') }}</span></span>
              </div>
              <button 
                @click="$router.push(`/npm/purchase/${project.id}`)"
                class="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm transition-all border border-white/10"
              >
                {{ $t('npmPurchase') }}
              </button>
            </div>
          </div>
          
          <!-- Hover Glow -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  ChevronLeft as ChevronLeftIcon,
  User as UserIcon,
  Sparkles as GlassIcon,
} from 'lucide-vue-next';

const projects = [
  {
    id: 'glass-ui',
    name: 'Glass Studio UI Pro',
    icon: GlassIcon,
    startingPrice: '3'
  }
];
</script>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
}
</style>
