<template>
  <div
    class="cx-card relative overflow-hidden transition-all duration-500 rounded-[32px]"
    :class="[
      interactive
        ? 'hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
        : '',
      accent ? 'border-[#FFD700]/30' : 'border-white/5',
    ]"
    :style="cardStyle"
  >
    <!-- ✨ Shimmer Overlay -->
    <div
      v-if="interactive"
      class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"
    ></div>

    <!-- Radiant Core -->
    <div
      v-if="accent"
      class="absolute -top-24 -right-24 w-48 h-48 bg-[#FFD700]/5 blur-[60px] rounded-full pointer-events-none"
    ></div>

    <div class="relative z-10 h-full p-8 md:p-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  accent: { type: Boolean, default: false },
  interactive: { type: Boolean, default: false },
});

const cardStyle = computed(() => ({
  background: "rgba(12, 12, 15, 0.7)",
  backdropFilter: "blur(50px)",
  border:
    "1px solid " +
    (props.accent ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 255, 255, 0.05)"),
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
}));
</script>

<style scoped>
.cx-card {
  --gold-glow: rgba(212, 175, 55, 0.1);
}
</style>
