<template>
  <button
    :class="[
      'relative flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group',
      variantClasses[variant],
      sizeClasses[size],
      customClass
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <div 
      class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
    ></div>

    <component 
      v-if="icon && !loading" 
      :is="icon" 
      :class="['w-4 h-4', iconClass]" 
    />
    
    <div 
      v-if="loading" 
      class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
    ></div>

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: any;
  loading?: boolean;
  disabled?: boolean;
  customClass?: string;
  iconClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  customClass: '',
  iconClass: ''
});

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#1a1c3d] text-white shadow-xl shadow-blue-900/10 hover:bg-[#2a2d5d]',
  secondary: 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 hover:bg-orange-600',
  outline: 'bg-transparent border-2 border-gray-100 text-[#1a1c3d] hover:bg-gray-50',
  ghost: 'bg-transparent text-[#8e92b2] hover:bg-gray-50 hover:text-[#1a1c3d]',
  danger: 'bg-rose-500 text-white shadow-xl shadow-rose-500/20 hover:bg-rose-600',
  success: 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-10 py-5 text-sm',
  icon: 'w-10 h-10 p-0 rounded-full',
};
</script>
