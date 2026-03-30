<script setup lang="ts">
import {
  X as XIcon,
  Settings2 as Settings2Icon,
} from "lucide-vue-next";

const props = defineProps<{
  show: boolean;
  pageSetup: {
    marginTop: number;
    marginBottom: number;
    marginLeft: number;
    marginRight: number;
  };
}>();

const emit = defineEmits(["close"]);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300"
  >
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      @click="emit('close')"
    ></div>
    <div
      class="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] shadow-2xl p-8 space-y-8 animate-in zoom-in-95 duration-300"
    >
      <div
        class="flex items-center justify-between border-b border-white/5 pb-4"
      >
        <div class="flex items-center gap-3">
          <Settings2Icon class="w-5 h-5 text-teal-400" />
          <h3 class="text-lg font-black italic tracking-tighter">
            Cài đặt <span class="text-teal-400">Canh lề trang</span>
          </h3>
        </div>
        <button
          @click="emit('close')"
          class="p-2 hover:bg-white/5 rounded-xl text-gray-500 transition-all"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Lề Trên (px)</label>
          <input
            type="number"
            v-model="pageSetup.marginTop"
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-teal-500 transition-all outline-none"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Lề Dưới (px)</label>
          <input
            type="number"
            v-model="pageSetup.marginBottom"
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-teal-500 transition-all outline-none"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Lề Trái (px)</label>
          <input
            type="number"
            v-model="pageSetup.marginLeft"
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-teal-500 transition-all outline-none"
          />
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Lề Phải (px)</label>
          <input
            type="number"
            v-model="pageSetup.marginRight"
            class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-teal-500 transition-all outline-none"
          />
        </div>
      </div>

      <div class="bg-teal-500/5 border border-teal-500/10 p-5 rounded-3xl">
        <p class="text-[9px] text-teal-400 font-bold uppercase tracking-widest leading-loose text-center">
          * Cài đặt này ảnh hưởng đến toàn bộ các trang trong văn bản.
        </p>
      </div>
    </div>
  </div>
</template>
