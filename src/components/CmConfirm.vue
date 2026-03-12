<template>
  <Transition name="fade-scale">
    <div v-if="show" class="fixed inset-0 z-[999] flex items-center justify-center p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="$emit('cancel')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] w-full max-w-md p-10 shadow-3xl animate-in zoom-in duration-300">
        <div class="flex flex-col items-center text-center space-y-6">
          <!-- Icon container -->
          <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center', iconBgClass]">
            <component :is="icon" :class="['w-8 h-8', iconColorClass]" />
          </div>
          
          <!-- Text content -->
          <div class="space-y-2">
            <h3 class="text-2xl font-black italic tracking-tight text-white">{{ title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ message }}</p>
          </div>
          
          <!-- Actions -->
          <div class="flex gap-4 w-full pt-4">
            <button 
              v-if="showCancel" 
              @click="$emit('cancel')" 
              class="flex-1 py-4 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
            >
              {{ cancelText }}
            </button>
            <button 
              @click="$emit('confirm')" 
              :class="['flex-1 py-4 text-white font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px] shadow-xl', confirmBtnClass]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { MessageSquare as MessageSquareIcon } from 'lucide-vue-next';

interface Props {
  show: boolean;
  title: string;
  message: string;
  icon?: any;
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger' | 'warning' | 'teal';
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  icon: MessageSquareIcon,
  showCancel: true,
  confirmText: 'Xác nhận',
  cancelText: 'Hủy bỏ',
  variant: 'primary'
});

defineEmits(['confirm', 'cancel']);

const iconBgClass = {
  primary: 'bg-blue-500/10',
  danger: 'bg-red-500/10',
  warning: 'bg-yellow-500/10',
  teal: 'bg-teal-500/10'
}[props.variant];

const iconColorClass = {
  primary: 'text-blue-400',
  danger: 'text-red-400',
  warning: 'text-yellow-400',
  teal: 'text-teal-400'
}[props.variant];

const confirmBtnClass = {
  primary: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20',
  danger: 'bg-red-600 hover:bg-red-500 shadow-red-500/20',
  warning: 'bg-yellow-600 hover:bg-yellow-500 shadow-yellow-500/20',
  teal: 'bg-teal-600 hover:bg-teal-500 shadow-teal-500/20'
}[props.variant];
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>
