<template>
  <div class="section">
    <h2 class="section-title text-4xl font-bold mb-4">Typography</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      A robust type-system built on a 4px geometric grid, featuring variable font-weights, gradient text effects, and brand-synced color palettes.
    </p>

    <div class="mt-8 flex flex-col gap-12">
      <!-- Font Scale Section -->
      <section>
        <h4 class="settings-title mb-4 uppercase tracking-[0.2em] font-black text-[11px] text-purple-400 flex items-center gap-3">
          <div class="w-1 h-3 bg-current rounded-full"></div>
          Geometric Scale (4px baseline)
        </h4>
        <div class="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
          <div class="flex flex-col gap-6">
            <div 
              v-for="size in fontSizes" 
              :key="size" 
              class="flex items-center gap-8 border-b border-white/5 pb-4 last:border-none"
            >
              <div class="flex flex-col min-w-[80px]">
                <span class="text-[10px] font-black uppercase opacity-40">txt-{{ size }}</span>
                <span class="text-[9px] font-black uppercase opacity-20 tracking-widest">{{ size * 4 }}px</span>
              </div>
              <p
                :class="[`text-${size}xl`]"
                class="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent m-0 font-bold overflow-hidden text-ellipsis whitespace-nowrap"
              >
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="flex flex-wrap gap-10">
        <!-- Font Weights Section -->
        <section class="flex-1 min-w-[320px]">
          <h4 class="settings-title mb-4 uppercase tracking-[0.2em] font-black text-[11px] text-purple-400 flex items-center gap-3">
            <div class="w-1 h-3 bg-current rounded-full"></div>
            Weight Profiles
          </h4>
          <div class="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            <div class="grid grid-cols-3 gap-6">
              <div
                v-for="w in weights"
                :key="w"
                class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-default border border-white/5"
              >
                <p class="text-4xl text-white m-0" :style="{ fontWeight: w }">Aa</p>
                <span class="text-[10px] font-black opacity-30 uppercase tracking-widest">{{ w }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Color Palette Section -->
        <section class="flex-1 min-w-[320px]">
          <h4 class="settings-title mb-4 uppercase tracking-[0.2em] font-black text-[11px] text-purple-400 flex items-center gap-3">
            <div class="w-1 h-3 bg-current rounded-full"></div>
            Semantic Colors
          </h4>
          <div class="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
            <div class="flex flex-col gap-4">
               <div 
                v-for="hue in colorHues" 
                :key="hue"
                class="flex items-center justify-between gap-4"
               >
                  <div class="flex items-center gap-3">
                    <div :class="[`bg-${hue}-500 shadow-${hue}-500/20`]" class="w-3 h-3 rounded-full shadow-lg"></div>
                    <span :class="[`text-${hue}-400`]" class="text-[10px] font-black uppercase tracking-[0.2em]">{{ hue }}</span>
                  </div>
                  <span class="text-[9px] font-black opacity-30 uppercase tracking-widest">text-{{ hue }}-400</span>
               </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Implementation Snippet -->
      <section>
        <h4 class="settings-title mb-4 uppercase tracking-[0.2em] font-black text-[11px] text-purple-400 flex items-center gap-3">
          <div class="w-1 h-3 bg-current rounded-full"></div>
          Implementation
        </h4>
        <div class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl">
          <div class="flex justify-between items-center px-8 py-3 opacity-40 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5">
             <span>Usage Syntax</span>
             <span class="text-purple-400">Tailwind + Library</span>
          </div>
          <div class="p-8">
             <pre class="m-0 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"><code>{{ `<!-- standard tailwind -->
<p class="text-4xl font-extrabold text-white">Heading Text</p>

<!-- library semantic colors -->
<span class="text-mint-400">Mint Text</span>

<!-- library gradient effect -->
<h1 class="bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent font-black">Gradient Title</h1>` }}</code></pre>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const fontSizes = [1, 2, 3, 4, 5, 6, 8];
const colorHues = ["brand", "mint", "blue", "cyan", "green", "orange", "red", "purple", "indigo", "gray"];
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
