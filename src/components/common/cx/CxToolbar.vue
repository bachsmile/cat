<template>
  <header 
    class="cx-toolbar flex items-center justify-between transition-all duration-300 px-8 py-5"
    :style="toolbarStyle"
  >
    <!-- Left Section -->
    <div class="flex items-center gap-6">
       <slot name="left"></slot>
    </div>

    <!-- Center Section -->
    <div class="flex-1 flex justify-center">
       <slot name="center"></slot>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-6">
       <div class="hidden md:flex items-center p-2 bg-white/5 border border-white/5 rounded-full px-5 group focus-within:border-[#D4AF37]/30 transition-all">
          <SearchIcon class="w-4 h-4 text-gray-500 group-focus-within:text-[#D4AF37]" />
          <input type="text" placeholder="GLOBAL SEARCH..." class="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest ml-3 w-48 text-white placeholder:text-gray-700" />
       </div>
       
       <slot name="right"></slot>
       
       <div class="relative group cursor-pointer">
          <BellIcon class="w-5 h-5 text-gray-500 group-hover:text-[#D4AF37] transition-colors" />
          <div class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-[#0A0A0B] shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
       </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Search as SearchIcon, Bell as BellIcon } from 'lucide-vue-next';

const props = defineProps({
  sticky: { type: Boolean, default: true },
  radius: { type: String, default: '2rem' }
});

const toolbarStyle = computed(() => ({
  background: 'rgba(15, 15, 17, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(212, 175, 55, 0.05)',
  borderRadius: props.radius,
  position: (props.sticky ? 'sticky' : 'relative') as any,
  top: props.sticky ? '1.5rem' : 'auto',
  zIndex: 40,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
  margin: '1.5rem'
}));
</script>
