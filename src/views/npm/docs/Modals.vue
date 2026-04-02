<template>
  <div class="section">
    <h2 class="section-title text-4xl font-bold mb-4">Modals</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      Premium glass-distortion overlays with realistic backdrop physics,
      customizable material presets, and elevation glints.
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
          <div class="z-10 py-10 flex flex-col items-center gap-8">
            <div
              class="opacity-20 text-[10px] font-black uppercase tracking-[0.2rem] mb-4"
            >
              Interactive Demo
            </div>

            <!-- Mini Modal Preview -->
            <div class="relative">
              <CmCard
                :type="modalType"
                :shadow="modalShadow"
                class="flex flex-col p-6 pointer-events-none rounded-3xl"
                style="width: 280px; height: 180px; transform: scale(1.1)"
              >
                <div
                  class="flex justify-between items-center border-b border-white/10 pb-3 mb-3"
                >
                  <span
                    class="text-[9px] font-black uppercase tracking-widest opacity-60"
                    >Preview Modal</span
                  >
                </div>
                <div class="flex-1 flex flex-col gap-2">
                  <div class="w-full h-2 bg-white/10 rounded"></div>
                  <div class="w-3/4 h-2 bg-white/10 rounded"></div>
                </div>
                <div class="flex justify-end mt-4">
                  <div
                    class="w-12 h-6 bg-purple-500 rounded-lg opacity-50"
                  ></div>
                </div>
              </CmCard>
            </div>

            <CmButton
              variant="primary"
              class="px-16 py-8 mt-8"
              @click="showDemoModal = true"
            >
              <span
                class="flex items-center gap-3 text-sm font-bold uppercase tracking-widest"
              >
                Launch Live Modal
              </span>
            </CmButton>
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
                Backdrop Material
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
                    modalType === opt
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'
                  "
                  @click="modalType = opt as any"
                >
                  {{ opt.replace("-", " ") }}
                </button>
              </div>
            </div>

            <!-- Shadow Selector -->
            <div class="flex flex-col gap-4">
              <h4
                class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3"
              >
                Surface Reflection
              </h4>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="s in ['none', 'mist', 'reflex']"
                  :key="s"
                  class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                  :class="
                    modalShadow === s
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'
                  "
                  @click="modalShadow = s as any"
                >
                  {{ s }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: separated Code Snippet -->
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
          ><code>{{ `<CmModal 
  v-model="isOpen"
  type="${modalType}"
  shadow="${modalShadow}"
  title="Modal Title"
>
  Modal Content
</CmModal>` }}</code></pre>
        </div>
      </div>
    </div>

    <!-- Live Demo Modal -->
    <CmModal
      v-model="showDemoModal"
      :type="modalType"
      :shadow="modalShadow"
      title="Interactive Glass Modal"
    >
      <div class="flex flex-col gap-6 p-8">
        <div class="flex flex-col gap-2">
          <h3 class="text-2xl font-bold">System Information</h3>
          <p class="text-gray-400">
            This modal uses the
            <strong class="text-purple-400">{{ modalType }}</strong> surface
            engine with
            <strong class="text-indigo-400">{{ modalShadow }}</strong>
            reflections enabled.
          </p>
        </div>

        <div
          class="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
        >
          <span
            class="text-[10px] font-black uppercase tracking-widest opacity-40"
            >Backdrop Logic</span
          >
          <p class="mt-2 text-sm leading-relaxed text-gray-400">
            The backdrop is dynamically calculated using SVG feGaussianBlur
            filters and linear-gradient maps to simulate physical glass
            properties.
          </p>
        </div>

        <div class="flex justify-end mt-4">
          <CmButton
            variant="primary"
            class="px-10 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
            @click="showDemoModal = false"
          >
            Confirm Configuration
          </CmButton>
        </div>
      </div>
    </CmModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CmCard, CmButton, CmModal } from "glass-studio-ui-pro";
import thumbnailBg from "@/assets/images/hinh-nen-1920-1080-thumbnail.jpg";

const showDemoModal = ref(false);
const modalType = ref<any>("heavy-frost");
const modalShadow = ref<any>("reflex");
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
