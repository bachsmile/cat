<template>
  <div class="section">
    <h2 class="section-title text-4xl font-bold mb-4">Buttons</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      Next-generation glass surfaces with real-time refraction, physical elevation glints, and semantic variants.
    </p>

    <!-- Layout: Top (Preview & Settings) | Bottom (Usage Code) -->
    <div class="mt-8 flex flex-col gap-10">
      <!-- Top Section: Preview and Settings side-by-side -->
      <div class="flex flex-wrap lg:flex-nowrap gap-10 items-stretch">
        <!-- Left: Floating Physical Preview -->
        <div 
          ref="previewArea"
          class="flex-1 relative min-h-[480px] bg-cover bg-center rounded-3xl overflow-hidden shadow-inner border border-white/10"
          :style="{ backgroundImage: `url(${thumbnailBg})` }"
        >
             <CmButton
              :type="buttonType"
              :shadow="buttonShadow"
              :variant="buttonVariant"
              :glow="buttonGlow"
              class="px-16 py-8 absolute cursor-grab active:cursor-grabbing select-none z-10"
              :style="{ 
                left: `${pos.x}px`, 
                top: `${pos.y}px`,
                transform: 'translate(-50%, -50%)'
              }"
              @mousedown="startDrag"
            >
              <span class="flex items-center gap-3 text-sm font-bold pointer-events-none">
                <Sparkles v-if="buttonGlow" :size="20" />
                {{
                  buttonVariant.charAt(0).toUpperCase() +
                  buttonVariant.slice(1)
                }}
                Button
              </span>
            </CmButton>

            <!-- Instructions -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30 text-[9px] font-bold uppercase tracking-[0.2em] text-white pointer-events-none">
               Drag button anywhere to test transparency
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
                <h4 class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3">Material preset</h4>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    v-for="opt in ['glass-frost', 'grain-frost', 'soft-mist', 'light-frost', 'fine-frost', 'heavy-frost']"
                    :key="opt"
                    class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                    :class="buttonType === opt ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'"
                    @click="buttonType = opt as any"
                  >
                    {{ opt.replace("-", " ") }}
                  </button>
                </div>
              </div>

              <!-- Variant Selector -->
              <div class="flex flex-col gap-4">
                <h4 class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3">Design Variant</h4>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    v-for="v in ['default', 'primary', 'ghost', 'solid']"
                    :key="v"
                    class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                    :class="buttonVariant === v ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/10 text-gray-500'"
                    @click="buttonVariant = v as any"
                  >
                    {{ v.charAt(0).toUpperCase() + v.slice(1) }}
                  </button>
                </div>
              </div>

              <!-- Toggles -->
              <div class="flex flex-wrap gap-10 pt-6 border-t border-white/5">
                <div class="flex items-center justify-between gap-4 flex-1">
                  <span class="text-[10px] uppercase font-black tracking-widest opacity-60">Reflection</span>
                  <button
                    class="px-6 py-2 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase"
                    :class="buttonShadow ? 'bg-purple-500 border-white/10 text-white' : 'bg-white/5 border-white/10 text-gray-500'"
                    @click="buttonShadow = buttonShadow ? '' : 'reflex'"
                  >
                    {{ buttonShadow ? "ON" : "OFF" }}
                  </button>
                </div>
                <div class="flex items-center justify-between gap-4 flex-1">
                  <span class="text-[10px] uppercase font-black tracking-widest opacity-60">Glow Engine</span>
                  <button
                    class="px-6 py-2 rounded-lg border transition-all text-[10px] font-black tracking-widest uppercase"
                    :class="buttonGlow ? 'bg-indigo-500 border-white/10 text-white' : 'bg-white/5 border-white/10 text-gray-500'"
                    @click="buttonGlow = !buttonGlow"
                  >
                    {{ buttonGlow ? "ON" : "OFF" }}
                  </button>
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
           <pre class="m-0 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"><code>{{ `<CmButton
  variant="${buttonVariant}"
  type="${buttonType}"
  shadow="${buttonShadow || 'none'}"
  :glow="${buttonGlow}"
>
  Button Label
</CmButton>` }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Sparkles } from 'lucide-vue-next';
import { CmButton } from 'glass-studio-ui-pro';
import thumbnailBg from '@/assets/images/hinh-nen-1920-1080-thumbnail.jpg';

const previewArea = ref<HTMLElement | null>(null);
const pos = ref({ x: 240, y: 240 });
let isDragging = false;

const startDrag = () => {
  isDragging = true;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging || !previewArea.value) return;
  const rect = previewArea.value.getBoundingClientRect();
  pos.value = {
    x: Math.max(0, Math.min(e.clientX - rect.left, rect.width)),
    y: Math.max(0, Math.min(e.clientY - rect.top, rect.height))
  };
};

const onMouseUp = () => {
  isDragging = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

onMounted(() => {
  if (previewArea.value) {
    const rect = previewArea.value.getBoundingClientRect();
    pos.value = { x: rect.width / 2, y: rect.height / 2 };
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});

const buttonType = ref<
  | "glass-frost"
  | "light-frost"
  | "heavy-frost"
  | "grain-frost"
  | "fine-frost"
  | "soft-mist"
>("glass-frost");

const buttonShadow = ref("");
const buttonVariant = ref<"default" | "primary" | "ghost" | "solid">("default");
const buttonGlow = ref(true);
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
