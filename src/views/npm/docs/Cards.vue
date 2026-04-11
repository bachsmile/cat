<template>
  <div class="section">
    <h2 class="section-title text-4xl font-bold mb-4">Cards</h2>
    <p class="section-desc text-gray-400 mb-8 max-w-2xl">
      Highly customizable glass panels with multiple presets, reflection layers,
      and semantic slots.
    </p>

    <!-- Project-style Card Demo -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      <!-- Live Preview -->
      <div
        class="flex items-center justify-center min-h-[500px] bg-cover bg-center rounded-3xl overflow-hidden shadow-inner border border-white/10"
        :style="{ backgroundImage: `url(${thumbnailBg})` }"
      >
        <CgCard
          :type="cardType"
          :shadow="cardShadow"
          class="w-full max-w-md p-8 rounded-[2.5rem]"
        >
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-0.5"
            >
              <div
                class="w-full h-full bg-[#0a0a0f] rounded-[0.9rem] flex items-center justify-center"
              >
                <SparklesIcon class="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 class="text-xl font-bold tracking-tight">
              Interactive Preview
            </h3>
          </div>

          <p class="text-gray-400 leading-relaxed mb-8">
            This card is being dynamically rendered based on the settings on the
            right. Adjust the material and toggle reflections to see real-time
            changes.
          </p>

          <div
            class="flex items-center justify-between pt-6 border-t border-white/5"
          >
            <div class="flex -space-x-3">
              <div
                v-for="i in 3"
                :key="i"
                class="w-8 h-8 rounded-full border-2 border-[#0a0a0f] overflow-hidden bg-gray-800"
              >
                <img
                  :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`"
                  alt="user"
                />
              </div>
            </div>
            <CgButton
              variant="primary"
              class="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest"
            >
              Action Hook
            </CgButton>
          </div>
        </CgCard>
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
                 :class="cardType === opt ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'"
                 @click="cardType = opt as any"
               >
                 {{ opt.replace('-', ' ') }}
               </button>
             </div>
           </div>

           <!-- Shadow Profile -->
           <div class="flex flex-col gap-4">
             <h4 class="uppercase tracking-[0.2em] font-black text-[11px] text-gray-500 border-l-4 border-current pl-3">Physics Reflection</h4>
             <div class="grid grid-cols-3 gap-3">
               <CgButton
                 v-for="s in ['none', 'mist', 'reflex']"
                 :key="s"
                 class="px-4 py-3 rounded-xl border transition-all text-[11px] font-bold uppercase tracking-wider"
                 :class="cardShadow === s ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-white/5 border-white/10 text-gray-500'"
                 @click="cardShadow = s as any"
               >
                 {{ s }}
               </CgButton>
             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Implementation Snippet -->
    <div class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] mt-10">
      <div class="flex justify-between items-center px-8 py-3 opacity-40 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5">
         <span>Implementation Snippet</span>
         <span class="text-purple-400">Vue 3 Template</span>
      </div>
      <div class="p-8">
         <pre class="m-0 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto"><code>{{ `<CgCard 
  type="${cardType}" 
  shadow="${cardShadow}"
>
  <!-- Card Content -->
</CgCard>` }}</code></pre>
      </div>
    </div>

    <!-- API Reference -->
    <div class="mt-20">
      <h2 class="text-3xl font-bold mb-8">API Reference</h2>

      <div
        class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl"
      >
        <table class="w-full text-left text-sm">
          <thead>
            <tr
              class="bg-white/5 uppercase text-[10px] font-black tracking-widest text-gray-500"
            >
              <th class="px-8 py-4">Name</th>
              <th class="px-8 py-4">Type</th>
              <th class="px-8 py-4">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr>
              <td class="px-8 py-4 font-mono text-purple-400">type</td>
              <td class="px-8 py-4 italic opacity-60">string</td>
              <td class="px-8 py-4 text-gray-400">
                Glass preset (glass-frost, soft-mist, etc.)
              </td>
            </tr>
            <tr>
              <td class="px-8 py-4 font-mono text-purple-400">shadow</td>
              <td class="px-8 py-4 italic opacity-60">string</td>
              <td class="px-8 py-4 text-gray-400">
                Reflection profile (none, mist, reflex).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- API Reference -->
    <div class="mt-20">
      <h2 class="text-3xl font-bold mb-8">API Reference</h2>

      <div
        class="glass-panel overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl"
      >
        <table class="w-full text-left text-sm">
          <thead>
            <tr
              class="bg-white/5 uppercase text-[10px] font-black tracking-widest text-gray-500"
            >
              <th class="px-8 py-4">Name</th>
              <th class="px-8 py-4">Type</th>
              <th class="px-8 py-4">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr>
              <td class="px-8 py-4 font-mono text-purple-400">type</td>
              <td class="px-8 py-4 italic opacity-60">string</td>
              <td class="px-8 py-4 text-gray-400">
                Glass preset (glass-frost, soft-mist, etc.)
              </td>
            </tr>
            <tr>
              <td class="px-8 py-4 font-mono text-purple-400">shadow</td>
              <td class="px-8 py-4 italic opacity-60">boolean</td>
              <td class="px-8 py-4 text-gray-400">
                Toggle exterior reflection shadow.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Sparkles as SparklesIcon } from "lucide-vue-next";
import { CgCard, CgButton } from "glass-studio-ui-pro";
import thumbnailBg from "@/assets/images/hinh-nen-1920-1080-thumbnail.jpg";

const cardType = ref<any>("glass-frost");
const cardShadow = ref("reflex");
</script>

<style scoped>
.glass-panel {
  backdrop-filter: blur(20px);
}
</style>
