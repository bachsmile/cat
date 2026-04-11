<template>
  <div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none w-full max-w-xs">
    <transition-group 
      name="toast-list" 
      tag="div" 
      class="flex flex-col gap-3 items-end"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 min-w-[280px] group transition-all duration-500"
        :class="[
          toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
          toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
          toast.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
          'bg-blue-500/10 border-blue-500/30 text-blue-400'
        ]"
      >
        <div class="flex-shrink-0">
          <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5" />
          <AlertCircleIcon v-else-if="toast.type === 'error'" class="w-5 h-5" />
          <AlertTriangleIcon v-else-if="toast.type === 'warning'" class="w-5 h-5" />
          <InfoIcon v-else class="w-5 h-5" />
        </div>
        <div class="flex-1">
          <p class="text-xs font-black uppercase tracking-widest leading-relaxed">{{ toast.message }}</p>
        </div>
        <button 
          @click="removeToast(toast.id)"
          class="opacity-40 hover:opacity-100 transition-opacity p-1"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import { 
  CheckCircle as CheckCircleIcon, 
  AlertCircle as AlertCircleIcon, 
  AlertTriangle as AlertTriangleIcon, 
  Info as InfoIcon,
  X as XIcon
} from "lucide-vue-next";

const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.toast-list-move {
  transition: transform 0.5s ease;
}
</style>
