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
              <CgCard
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
                <div class="p-8 h-full flex flex-col justify-between">
                  <div class="flex items-center gap-3 opacity-30">
                    <div class="w-8 h-8 rounded-lg bg-white/20"></div>
                    <div class="w-24 h-2 bg-white/20 rounded-full"></div>
                  </div>
                  <div class="space-y-2 opacity-10">
                    <div class="w-full h-1 bg-white/20 rounded-full"></div>
                    <div class="w-2/3 h-1 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </CgCard>
            </div>

            <CgButton
              variant="primary"
              class="px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-purple-500/20 active:scale-95 transition-all"
              @click="showDemoModal = true"
            >
              Launch Physical Result
            </CgButton>
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
                    modalType === opt
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                      : 'bg-white/5 border-white/10 text-gray-500'
                  "
                  @click="modalType = opt as any"
                >
                  {{ opt.replace('-', ' ') }}
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
                    modalShadow === s
                      ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                      : 'bg-white/5 border-white/10 text-gray-500'
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
          ><code>{{ `<CgModal 
  v-model="show"
  type="${modalType}" 
  shadow="${modalShadow}"
>
  <!-- Modal Content -->
</CgModal>` }}</code></pre>
        </div>
      </div>
    </div>

    <!-- The Actual Modal Component -->
    <CgModal
      v-model="showDemoModal"
      :type="modalType"
      :shadow="modalShadow"
      class="max-w-md w-full"
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
          <CgButton
            variant="primary"
            class="px-10 py-3 rounded-xl font-bold uppercase tracking-widest text-xs"
            @click="showDemoModal = false"
          >
            Confirm Configuration
          </CgButton>
        </div>
      </div>
    </CgModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CgCard, CgButton, CgModal } from "glass-studio-ui-pro";
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
