<template>
  <div
    class="bg-[#0a0a0f] p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="p-3 rounded-2xl" :class="stat.bg">
        <component
          :is="stat.icon"
          class="w-6 h-6 shrink-0"
          :class="stat.color"
        />
      </div>
      <span
        class="text-xs font-bold px-2 py-1 rounded-full bg-green-500/10 text-green-400"
        >+{{ stat.trend }}%</span
      >
    </div>
    <h3 class="text-gray-500 text-sm font-medium uppercase tracking-wider">
      {{ stat.label }}
    </h3>
    <p class="text-3xl font-bold mt-1 tracking-tight">
      {{ stat.value }}
    </p>
    <!-- Subtle background chart mock -->
    <div
      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
      :class="stat.color.replace('text', 'from')"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { DefineComponent } from "vue";

defineProps<{
  stat: {
    bg: string;
    icon: DefineComponent<{}, {}, any> | Object;
    color: string;
    trend: number;
    label: string;
    value: string | number;
  };
}>();
</script>
