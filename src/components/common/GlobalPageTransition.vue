<template>
  <Transition name="fade">
    <div v-if="isActive" class="fixed inset-0 z-[9999] flex pointer-events-none">
      <!-- Left Gate -->
      <div 
        class="flex-1 bg-[#050508] transform transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)] border-r border-white/5"
        :class="isGateClosed ? 'translate-x-0' : '-translate-x-full'"
      ></div>

      <!-- Right Gate -->
      <div 
        class="flex-1 bg-[#050508] transform transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)] border-l border-white/5"
        :class="isGateClosed ? 'translate-x-0' : 'translate-x-full'"
      ></div>
      
      <!-- Center Activity Brand -->
      <div class="absolute inset-0 flex items-center justify-center z-20 transition-all duration-700"
           :class="isGateClosed ? 'opacity-100 scale-100' : 'opacity-0 scale-150'">
        <!-- Glow Effect -->
        <div 
          class="absolute w-64 h-64 blur-[100px] rounded-full opacity-30 transition-colors duration-500"
          :style="{ backgroundColor: currentThemeColor }"
        ></div>

        <!-- Rotating Ring -->
        <div 
          class="absolute w-40 h-40 border border-white/10 rounded-full animate-spin-slow"
          :style="{ borderTopColor: currentThemeColor + '80' }"
        ></div>

        <!-- Main Icon Card -->
        <div 
          class="w-28 h-28 bg-[#0a0a0f] rounded-3xl flex flex-col items-center justify-center shadow-2xl border border-white/10 relative overflow-hidden"
        >
          <!-- Internal Gradient Glow -->
          <div 
            class="absolute inset-0 opacity-20"
            :style="{ background: `radial-gradient(circle at center, ${currentThemeColor}, transparent)` }"
          ></div>

          <!-- Dynamic Icon -->
          <component 
            :is="currentIcon || TerminalIcon" 
            class="w-12 h-12 mb-2 relative z-10 animate-pulse"
            :style="{ color: currentThemeColor }"
          />
          
          <!-- Label -->
          <span 
            v-if="currentLabel"
            class="text-[10px] font-black uppercase tracking-[0.2em] relative z-10 opacity-70"
            :style="{ color: currentThemeColor }"
          >
            {{ currentLabel }}
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Terminal as TerminalIcon } from "lucide-vue-next";

const isActive = ref(false);
const isGateClosed = ref(false);
const currentIcon = shallowRef<any>(null);
const currentThemeColor = ref("#6366f1");
const currentLabel = ref("");
const router = useRouter();

const trigger = (targetRoute: string, config?: { icon?: any, color?: string, label?: string }) => {
  if (config) {
    currentIcon.value = config.icon;
    currentThemeColor.value = config.color || "#6366f1";
    currentLabel.value = config.label || "";
  } else {
    currentIcon.value = TerminalIcon;
    currentThemeColor.value = "#6366f1";
    currentLabel.value = "System";
  }

  // Phase 1: Mount component
  isActive.value = true;
  
  return new Promise<void>((resolve) => {
    // Phase 2: Close gates after mounting
    setTimeout(() => {
      isGateClosed.value = true;
      
      // Phase 3: Navigate when closed
      setTimeout(() => {
        if (targetRoute) {
          router.push(targetRoute);
        }
        
        // Phase 4: Open gates
        setTimeout(() => {
          isGateClosed.value = false;
          
          // Phase 5: Unmount after opening
          setTimeout(() => {
            isActive.value = false;
            resolve();
          }, 800); 
        }, 800);
      }, 700); 
    }, 50);
  });
};

defineExpose({ trigger });

onMounted(() => {
  (window as any).$pageTransition = { trigger };
});
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
