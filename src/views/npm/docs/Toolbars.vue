<template>
  <div class="section w-full h-full">
    <h2 class="section-title text-4xl font-bold mb-4">Toolbars</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      Adaptive glass toolbars with multiple layout modes, dynamic reflections,
      and sophisticated glass-distortion physics.
    </p>

    <!-- Layout: Top (Preview & Settings) | Bottom (Usage Code) -->
    <div class="mt-8 flex flex-col gap-10">
      <!-- Top Section: Preview and Settings side-by-side -->
      <div class="">
        <!-- Left: Floating Physical Preview -->
        <div
          class="flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-[2.5rem] min-h-[480px] bg-cover bg-center border border-white/10 shadow-inner"
          :style="{ backgroundImage: `url(${thumbnailBg})` }"
        >
          <!-- Background Pattern -->
          <div
            class="absolute inset-0 z-0 flex flex-wrap gap-4 opacity-5 p-4 pointer-events-none"
          >
            <div
              v-for="i in 100"
              :key="i"
              class="w-12 h-12 rounded-full"
              :class="[`bg-purple-${((i % 5) + 4) * 100}`]"
            ></div>
          </div>

          <div class="z-10 w-full flex flex-col items-center gap-6 px-10">
            <div
              class="opacity-20 text-[10px] font-black uppercase tracking-[0.2rem] mb-4 text-white"
            >
              Physical Result
            </div>

            <CmToolbar
              :type="toolbarType"
              :shadow="toolbarShadow"
              :width="toolbarWidth"
              class="transition-all duration-500 rounded-2xl"
            >
              <template #left>
                <div class="flex items-center gap-3">
                  <Sparkles :size="18" class="text-purple-400" />
                  <span
                    class="text-[10px] font-black uppercase tracking-widest opacity-80"
                    >Glass Control</span
                  >
                </div>
              </template>

              <template #right>
                <div class="flex items-center gap-2">
                  <CmButton
                    variant="ghost"
                    class="px-3 py-1 text-[10px] uppercase font-bold"
                    >File</CmButton
                  >
                  <CmButton
                    variant="ghost"
                    class="px-3 py-1 text-[10px] uppercase font-bold"
                    >Edit</CmButton
                  >
                  <CmButton
                    variant="primary"
                    class="px-4 py-1.5 ml-2 text-[10px] font-black uppercase tracking-widest rounded-lg"
                    >Save</CmButton
                  >
                </div>
              </template>
            </CmToolbar>
          </div>
        </div>

        <!-- Right: Configuration Card -->
        <div
          class="glass-panel flex flex-col p-8 rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-3xl min-w-[320px] lg:min-w-[440px] flex-[1.1]"
        >
          <h4
            class="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 mb-8 opacity-70"
          >
            Control Panel
          </h4>

          <div class="flex flex-col gap-8">
            <!-- Material Selector -->
            <div class="flex flex-col gap-4">
              <h4
                class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3"
              >
                Material Surface
              </h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  v-for="opt in [
                    'glass-frost',
                    'grain-frost',
                    'soft-mist',
                    'light-frost',
                    'fine-frost',
                    'heavy-frost',
                  ]"
                  :key="opt"
                  class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                  :class="
                    toolbarType === opt
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                      : 'bg-white/5 border-white/10 text-gray-500'
                  "
                  @click="toolbarType = opt as any"
                >
                  {{ opt.replace("-", " ") }}
                </button>
              </div>
            </div>

            <!-- Layout Mode -->
            <div class="flex flex-col gap-4">
              <h4
                class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3"
              >
                Layout Mode
              </h4>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="m in ['full', 'floating', 'fit']"
                  :key="m"
                  class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                  :class="
                    toolbarWidth === m
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                      : 'bg-white/5 border-white/10 text-gray-500'
                  "
                  @click="toolbarWidth = m as any"
                >
                  {{ m }}
                </button>
              </div>
            </div>

            <!-- Shadow Selector -->
            <div class="flex flex-col gap-4">
              <h4
                class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3"
              >
                Physics Reflection
              </h4>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="s in ['none', 'mist', 'reflex']"
                  :key="s"
                  class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                  :class="
                    toolbarShadow === s
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                      : 'bg-white/5 border-white/10 text-gray-500'
                  "
                  @click="toolbarShadow = s as any"
                >
                  {{ s }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Implementation Snippet -->
      <div
        class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]"
      >
        <div
          class="flex justify-between items-center px-8 py-3 opacity-40 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5"
        >
          <span>Implementation Snippet</span>
          <span class="text-purple-400">Vue 3 Template</span>
        </div>
        <div class="p-8">
          <pre
            class="m-0 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"
          ><code>{{ `<CmToolbar 
  type="${toolbarType}" 
  shadow="${toolbarShadow}"
  width="${toolbarWidth}"
  position="relative"
>
  <!-- Toolbar Content -->
</CmToolbar>` }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Sparkles } from "lucide-vue-next";
import { CmButton, CmToolbar } from "glass-studio-ui-pro";
import thumbnailBg from "@/assets/images/hinh-nen-1920-1080-thumbnail.jpg";

const toolbarWidth = ref<"full" | "floating" | "fit">("floating");
const toolbarType = ref<any>("glass-frost");
const toolbarShadow = ref<any>("reflex");
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
