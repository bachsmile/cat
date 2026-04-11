<template>
  <CnCard
    :color="cardColor"
    class="relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
  >
    <div class="p-6 flex flex-col h-full gap-4">
      <div class="flex items-center justify-between">
        <div 
          class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500"
        >
          <CnIcon :color="cardColor" :size="24">
            <component :is="stat.icon" />
          </CnIcon>
        </div>
        <div 
          class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
          :class="stat.trend > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'"
        >
          {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}% 
        </div>
      </div>
      
      <div>
        <p class="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">
          {{ stat.label }}
        </p>
        <h3 class="text-3xl font-black text-white tracking-tighter">
          {{ stat.value }}
        </h3>
      </div>

      <!-- Subtle pulse effect in background -->
      <div class="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  </CnCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CnCard, CnIcon } from "glass-studio-ui-pro";

const props = defineProps<{
  stat: {
    bg: string;
    icon: any;
    color: string;
    trend: number;
    label: string;
    value: string | number;
  };
}>();

const cardColor = computed(() => {
  // Map Tailwind text classes to CN colors
  const colorMap: Record<string, string> = {
    'text-blue-400': 'sky',
    'text-purple-400': 'violet',
    'text-green-400': 'emerald',
    'text-orange-400': 'amber',
  };
  return colorMap[props.stat.color] || 'indigo';
});
</script>
