<template>
  <div
    class="relative group cursor-pointer transition-all duration-700 rounded-[32px] overflow-hidden"
    @click="$emit('click', asset.symbol)"
  >
    <!-- 🪞 Luxury 3D Card Base -->
    <div 
      class="h-full p-8 bg-[#0C0C0F] border transition-all duration-500 relative z-10 rounded-[32px]"
      :class="[
        isActive 
          ? 'border-[#FFD700]/50 shadow-[0_20px_50px_rgba(255,215,0,0.15)] -translate-y-2' 
          : 'border-white/5 hover:border-[#FFD700]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
      ]"
    >
      <!-- ✨ Active Shimmer -->
      <div v-if="isActive" class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer"></div>

      <div class="flex items-center gap-5 mb-8">
        <!-- 🪙 Vibrant Token Orb -->
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black shrink-0 relative shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
          :class="isActive ? 'bg-gold-vibrant' : 'bg-white/5 border border-white/10'"
        >
          <img v-if="asset.image" :src="asset.image" class="w-full h-full object-cover" />
          <span v-else :class="isActive ? 'text-black' : 'text-gold-vibrant'">{{ asset.icon }}</span>
          
          <div v-if="isActive" class="absolute inset-0 bg-white/20 blur-md opacity-50"></div>
        </div>

        <div class="flex-1">
          <h4 class="font-black text-xl leading-tight text-white uppercase tracking-tighter flex items-center gap-3">
            {{ asset.name }}
            <span
              v-if="isUnlocked && (asset.savingsBalance || 0) > 0"
              class="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-md"
            >
              LOCKED
            </span>
          </h4>
          <p class="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1">
            NETWORK: {{ asset.symbol }}_PRO
          </p>
        </div>

        <!-- 🛡️ Status Badges -->
        <div class="shrink-0">
          <div v-if="isUnlocked" class="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <ShieldCheckIcon class="w-4 h-4" />
          </div>
          <div v-else-if="hasPassword" class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 group-hover:text-[#FFD700] transition-colors">
            <LockIcon class="w-4 h-4" />
          </div>
        </div>
      </div>

      <div class="mt-auto pt-6 flex flex-col gap-2">
        <p class="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">Available Liquidity</p>
        <div class="flex items-baseline gap-2">
           <h2 class="text-4xl font-black tracking-tighter" :class="isActive ? 'text-gold-vibrant' : 'text-white'">
             <span v-if="isUnlocked">
               {{ isVisible ? formatNumber((asset.balance || 0) + (asset.savingsBalance || 0)) : "••••••••" }}
             </span>
             <span v-else class="text-gray-700 tracking-[0.1em]">ENCRYPTED</span>
           </h2>
           <span class="text-sm font-bold text-gray-600 uppercase">{{ asset.symbol }}</span>
        </div>
        
        <div v-if="isUnlocked && livePrice" class="mt-2 flex items-center gap-3">
          <div class="h-px flex-1 bg-white/5"></div>
          <p class="text-[11px] font-bold text-gray-500 tracking-wider">
            ≈ {{ isVisible ? formatNumber(((asset.balance || 0) + (asset.savingsBalance || 0)) * livePrice) : "********" }} ₫
          </p>
        </div>
      </div>

      <!-- ⚡ Active Bottom Accent -->
      <div v-if="isActive" class="absolute bottom-0 left-0 right-0 h-1 bg-gold-vibrant blur-[2px] opacity-80"></div>
    </div>

    <!-- 🔮 Deep 3D Shadow Backdrop -->
    <div v-if="isActive" class="absolute -inset-2 bg-[#FFD700]/5 blur-3xl -z-10 rounded-[40px]"></div>
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
