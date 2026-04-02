<template>
  <div class="section">
    <h2 class="section-title txt-8 text-4xl font-bold mb-4">Color Foundation</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      A comprehensive generative color system featuring 11 core hues with 10 weight increments (50-900), optimized for high-contrast accessibility and glassmorphism blending.
    </p>

    <div class="mt-8 flex flex-col gap-10">
      <section v-for="hue in colorHues" :key="hue">
        <h4 class="settings-title mb-4 uppercase tracking-[0.2em] font-black text-[11px] text-purple-400 flex items-center gap-3">
          <div class="w-1 h-3 bg-current rounded-full"></div>
          {{ hue }} Palette
        </h4>
        <div class="glass-panel p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="w in weights"
              :key="w"
              class="flex-1 min-w-[120px] h-24 flex flex-col justify-between p-3 rounded-xl transition-transform hover:scale-105 cursor-default"
              :class="[
                `bg-${hue}-${w}`,
                { 'text-white': w >= 500, 'text-black': w < 500 },
              ]"
            >
              <span class="text-xs font-black uppercase tracking-wider">{{ w }}</span>
              <div class="flex justify-end">
                 <span class="text-[10px] opacity-40 font-extrabold">{{ hue.charAt(0).toUpperCase() }}{{ w }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Implementation Snippet -->
      <section class="mt-8">
        <h4 class="settings-title mb-4 uppercase tracking-[0.2em] font-black text-[11px] text-purple-400 flex items-center gap-3">
          <div class="w-1 h-3 bg-current rounded-full"></div>
          Color Utilities
        </h4>
        <div class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl">
          <div class="flex justify-between items-center px-8 py-3 opacity-40 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5">
             <span>Class Reference</span>
             <span class="text-purple-400">Atomic CSS</span>
          </div>
          <div class="p-8">
             <pre class="m-0 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"><code>{{ `<!-- Background colors -->
<div class="bg-brand-500 text-white">Brand Background</div>

<!-- Text colors -->
<span class="text-mint-600">Mint Text</span>

<!-- Border colors -->
<div class="border border-indigo-200">Indigo Border</div>` }}</code></pre>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// In your project, make sure glass-studio-ui-pro/style.css is imported globally (e.g. in main.ts)
// The library provides global utility classes for these colors.

const colorHues = [
  "brand",
  "mint",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "red",
  "orange",
  "yellow",
  "green",
  "gray",
];

const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
