<template>
  <div class="flex flex-col gap-2 w-full group">
    <label 
      v-if="label" 
      class="text-[10px] font-black uppercase tracking-[0.2em] text-[#8e92b2] group-focus-within:text-[#1a1c3d] transition-colors pl-1"
    >
      {{ label }}
    </label>
    
    <div class="relative flex items-center">
      <div v-if="icon" class="absolute left-5 text-gray-300 group-focus-within:text-[#5c59f0] transition-colors">
        <component :is="icon" class="w-5 h-5" />
      </div>

      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
        class="w-full bg-white border border-gray-100 rounded-2xl p-4 text-sm font-bold text-[#1a1c3d] focus:outline-none focus:border-[#5c59f0] focus:ring-4 focus:ring-[#5c59f0]/5 transition-all shadow-sm group-hover:shadow-md h-14"
        :class="[
          icon ? 'pl-14' : 'pl-6',
          error ? 'border-rose-500 bg-rose-50/10' : ''
        ]"
      />
      
      <div v-if="error" class="absolute right-5">
        <AlertCircleIcon class="w-5 h-5 text-rose-500 animate-pulse" />
      </div>
    </div>

    <p v-if="error" class="text-[9px] font-bold text-rose-500 pl-1 uppercase tracking-widest mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle as AlertCircleIcon } from 'lucide-vue-next';

interface Props {
  modelValue?: string | number;
  label?: string;
  icon?: any;
  error?: string;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>
