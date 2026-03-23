<template>
  <div
    class="bg-[#0a0a0f] p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden"
    :class="
      isActive
        ? 'border-purple-500 bg-purple-500/10'
        : 'border-white/5 hover:border-white/20'
    "
    @click="$emit('click', asset.symbol)"
  >
    <div class="flex items-center gap-4 mb-4">
      <div
        class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0 overflow-hidden"
        :class="asset.bgClass + ' ' + asset.textClass"
      >
        <img v-if="asset.image" :src="asset.image" class="w-full h-full object-cover" style="-webkit-mask-image: radial-gradient(circle, black 65%, transparent 70%); mask-image: radial-gradient(circle, black 65%, transparent 70%);" />
        <span v-else>{{ asset.icon }}</span>
      </div>
      <div>
        <h4 class="font-bold text-lg leading-tight flex items-center gap-2">
          {{ asset.name }}
          <span
            v-if="isUnlocked && (asset.savingsBalance || 0) > 0"
            class="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] font-black uppercase tracking-widest rounded"
          >
            Khoá
          </span>
        </h4>
        <p class="text-sm text-gray-500 font-medium tracking-wide mt-0.5">
          {{ asset.symbol }}
        </p>
      </div>
      <div
        v-if="isUnlocked"
        class="ml-auto bg-green-500/10 text-green-500 p-1.5 rounded-full"
      >
        <ShieldCheckIcon class="w-4 h-4" />
      </div>
      <div
        v-else-if="!hasPassword"
        class="ml-auto bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter"
      >
        Chưa thiết lập
      </div>
      <div
        v-else
        class="ml-auto bg-white/5 text-gray-400 p-1.5 rounded-full group-hover:text-white transition-colors"
      >
        <LockIcon class="w-4 h-4" />
      </div>
    </div>
    <div class="mt-6">
      <p class="text-3xl font-bold tracking-tight">
        <span v-if="isUnlocked">
          {{ isVisible ? formatNumber((asset.balance || 0) + (asset.savingsBalance || 0)) : "********" }}
        </span>
        <span v-else class="text-gray-600 tracking-[0.3em]">••••••</span>
        <span class="text-sm text-gray-500 font-normal ml-1">
          {{ asset.symbol }}</span
        >
      </p>
      <div
        v-if="isUnlocked && livePrice"
        class="mt-2 text-xs text-gray-400 font-medium tracking-wide"
      >
        ≈
        {{ isVisible ? formatNumber(((asset.balance || 0) + (asset.savingsBalance || 0)) * livePrice) : "********" }} ₫
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
      :class="asset.gradClass"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  ShieldCheck as ShieldCheckIcon,
  Lock as LockIcon,
} from "lucide-vue-next";

defineProps<{
  asset: any;
  isActive: boolean;
  isUnlocked: boolean;
  isVisible: boolean;
  hasPassword?: boolean;
  livePrice?: number;
}>();

defineEmits(["click"]);

const formatNumber = (num: number) => {
  if (num === undefined || num === null) return "0.00";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};
</script>
