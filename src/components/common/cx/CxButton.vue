<template>
  <button
    class="cx-button relative group overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      variant === 'solid' ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-black' : 
      variant === 'outline' ? 'border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/5' : 
      'bg-white/5 text-white hover:bg-white/10'
    ]"
    :style="buttonStyle"
  >
    <!-- Solid Shine Effect -->
    <div v-if="variant === 'solid'" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    
    <!-- Outline Glow -->
    <div v-if="variant === 'outline'" class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#D4AF37]/5 blur-xl transition-opacity"></div>

    <div class="relative z-10 flex items-center justify-center gap-3">
      <slot name="icon"></slot>
      <span class="uppercase tracking-[0.2em]"><slot></slot></span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: { type: String, default: 'ghost' }, // solid, outline, ghost
  size: { type: String, default: 'md' },
  radius: { type: String, default: '1.25rem' }
});

const buttonStyle = computed(() => ({
  padding: props.size === 'sm' ? '0.5rem 1.25rem' : props.size === 'lg' ? '1rem 2.5rem' : '0.75rem 1.5rem',
  fontSize: props.size === 'sm' ? '10px' : '11px',
  borderRadius: props.radius,
  boxShadow: props.variant === 'solid' ? '0 10px 20px -5px rgba(212, 175, 55, 0.4)' : 'none'
}));
</script>
