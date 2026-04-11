<template>
  <div
    :class="[
      'relative bg-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.015)] border border-white p-8 group transition-all duration-500',
      hoverable
        ? 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:translate-y-[-4px] cursor-pointer'
        : '',
      type === 'elevated-3d' ? 'cm-card-elevated-3d' : '',
      customClass,
    ]"
    v-bind="$attrs"
  >
    <div
      v-if="hoverable"
      class="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-30 rounded-[2.5rem] transition-opacity duration-500"
    ></div>

    <div class="relative z-10 flex flex-col h-full">
      <div
        v-if="$slots.header || title"
        class="flex items-center justify-between mb-6"
      >
        <div class="flex items-center gap-4">
          <div
            v-if="icon"
            class="w-12 h-12 bg-gray-50 group-hover:bg-[#1a1c3d]/5 text-gray-400 group-hover:text-[#1a1c3d] rounded-2xl flex items-center justify-center transition-all duration-500"
          >
            <component :is="icon" class="w-5 h-5" />
          </div>
          <div>
            <h3
              v-if="title"
              class="text-sm font-black text-[#1a1c3d] tracking-tight"
            >
              {{ title }}
            </h3>
            <p
              v-if="subtitle"
              class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5"
            >
              {{ subtitle }}
            </p>
          </div>
        </div>
        <slot name="header-action"></slot>
      </div>

      <div class="flex-1">
        <slot></slot>
      </div>

      <div
        v-if="$slots.footer"
        class="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  icon?: any;
  hoverable?: boolean;
  type?: "default" | "elevated-3d";
  customClass?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
  hoverable: false,
  type: "default",
  customClass: "",
});
</script>

<style scoped>
.cm-card-elevated-3d {
  background-color: var(--color-green-500, #22c55e);
  border-radius: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    inset 0 4px 10px rgba(255, 255, 255, 0.4),
    inset 0 -6px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.cm-card-elevated-3d:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.2),
    inset 0 4px 10px rgba(255, 255, 255, 0.4),
    inset 0 -6px 12px rgba(0, 0, 0, 0.15);
}

.cm-card-elevated-3d :deep(h3),
.cm-card-elevated-3d :deep(p),
.cm-card-elevated-3d :deep(.text-\[\#1a1c3d\]) {
  color: white !important;
}

.cm-card-elevated-3d :deep(.text-gray-400),
.cm-card-elevated-3d :deep(.txt-gray-400) {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
