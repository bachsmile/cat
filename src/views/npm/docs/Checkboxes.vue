<template>
  <div class="section">
    <h2 class="section-title text-4xl font-bold mb-4">Checkboxes</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      Interactive glass checkboxes with animated state transitions, neon glow effects, and physics-based surfaces.
    </p>

    <!-- Layout: Top (Preview & Settings) | Bottom (Usage Code) -->
    <div class="mt-8 flex flex-col gap-10">
      <!-- Top Section: Preview and Settings side-by-side -->
      <div class="flex flex-wrap lg:flex-nowrap gap-10 items-stretch">
        <!-- Left: Floating Physical Preview -->
        <div 
          class="flex-1 flex flex-col items-center justify-center relative min-h-[480px] bg-cover bg-center rounded-3xl overflow-hidden shadow-inner border border-white/10"
          :style="{ backgroundImage: `url(${thumbnailBg})` }"
        >
          <div class="z-10 py-10 flex flex-col items-center gap-6 w-full">
            <div class="opacity-20 text-[10px] font-black uppercase tracking-[0.2rem] mb-4">Physical Result</div>
            <CgCard
              :type="previewCardType"
              :shadow="previewShadow"
              class="flex flex-col items-center justify-center p-12 rounded-[2.5rem] w-full max-w-sm min-h-[240px]"
            >
              <div class="flex flex-col gap-6">
                <CgCheckbox
                  v-model="checkboxChecked1"
                  label="Push Notifications"
                />
                <CgCheckbox v-model="checkboxChecked2" label="Market Updates" />
                <CgCheckbox
                  v-model="checkboxChecked3"
                  label="Security Alerts"
                />
              </div>
            </CgCard>

            <!-- Status Indicator -->
            <div class="mt-6 flex flex-col items-center gap-3">
              <div class="text-[9px] font-black uppercase tracking-[0.2em] opacity-30">Live Binary State</div>
              <div class="flex gap-4">
                <div
                  v-for="(val, i) in [checkboxChecked1, checkboxChecked2, checkboxChecked3]"
                  :key="i"
                  class="w-3 h-3 rounded-full transition-all duration-500"
                  :class="val ? 'bg-purple-500' : 'bg-white/10'"
                  :style="{
                    transform: val ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: val ? '0 0 15px rgba(168, 85, 247, 0.5)' : 'none',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Configuration Card -->
        <div
          class="glass-panel flex flex-col p-8 rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-3xl min-w-[320px] lg:min-w-[440px] flex-[1.1]"
        >
           <h4 class="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-8 opacity-70">
              Control Panel
           </h4>

           <div class="flex flex-col gap-8">
              <!-- Material Selector -->
              <div class="flex flex-col gap-4">
                <h4 class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3">Material Surface</h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    v-for="opt in ['glass-frost', 'grain-frost', 'soft-mist', 'light-frost', 'fine-frost', 'heavy-frost']"
                    :key="opt"
                    class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                    :class="previewCardType === opt ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'"
                    @click="previewCardType = opt as any"
                  >
                    {{ opt.replace('-', ' ') }}
                  </button>
                </div>
              </div>

              <!-- Shadow Selector -->
              <div class="flex flex-col gap-4">
                <h4 class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3">Physics Reflection</h4>
                <div class="grid grid-cols-3 gap-3">
                  <CgButton
                    v-for="s in ['none', 'mist', 'reflex']"
                    :key="s"
                    class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                    :class="previewShadow === s ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'"
                    @click="previewShadow = s as any"
                  >
                    {{ s }}
                  </CgButton>
                </div>
              </div>
           </div>
        </div>
      </div>

      <!-- Bottom Section: Implementation Snippet -->
      <div class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
        <div class="flex justify-between items-center px-8 py-3 opacity-40 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5">
           <span>Implementation Snippet</span>
           <span class="text-purple-400">Vue 3 Template</span>
        </div>
        <div class="p-8">
           <pre class="m-0 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"><code>{{ `<CgCheckbox 
  v-model="checked"
  label="Checkbox Label"
  type="${previewCardType}" 
  shadow="${previewShadow}"
/>` }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CgCard, CgCheckbox, CgButton } from 'glass-studio-ui-pro';
import thumbnailBg from '@/assets/images/hinh-nen-1920-1080-thumbnail.jpg';

const checkboxChecked1 = ref(true);
const checkboxChecked2 = ref(false);
const checkboxChecked3 = ref(true);

const previewCardType = ref<any>("glass-frost");
const previewShadow = ref<any>("reflex");
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
