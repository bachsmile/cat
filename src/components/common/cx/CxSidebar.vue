<template>
  <aside
    class="cx-sidebar fixed left-0 top-0 h-screen z-[100] flex flex-col items-center py-6 transition-all duration-500"
    :style="sidebarStyle"
  >
    <!-- ✨ Top-Left Radiant Glow (Atmospheric - Bleeding allowed) -->
    <div
      class="absolute -top-32 -left-32 w-96 h-96 bg-[#FFD700]/15 blur-[100px] rounded-full pointer-events-none z-0"
    ></div>

    <!-- Arched Divider Section (Internal) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent"
      ></div>
      <div
        class="absolute top-[35%] left-[-50%] right-[-50%] h-[400px] border-t border-[#FFD700]/5 rounded-[100%]"
      ></div>
      <div
        class="absolute bottom-[20%] left-[-50%] right-[-50%] h-[400px] border-b border-[#FFD700]/5 rounded-[100%]"
      ></div>
    </div>

    <!-- 🌊 Premium Wavy Gold Sand Footer (Internal Overflow) -->
    <div
      class="absolute bottom-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none"
    >
      <!-- Particle Dust (Luminous) -->
      <div
        class="absolute bottom-56 left-1/2 -translate-x-1/2 w-full h-32 flex justify-around opacity-60"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-float-particle shadow-[0_0_10px_#FFD700]"
          :style="{ animationDelay: i * 0.4 + 's' }"
        ></div>
      </div>

      <!-- The Big Wave (Brighter & Taller) -->
      <svg
        class="absolute bottom-[-20px] left-0 w-full h-64 fill-[#FFD700]/30 filter blur-[1px]"
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
      >
        <path d="M0,100 C150,200 350,0 500,100 L500,200 L0,200 Z">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M0,100 C150,200 350,0 500,100 L500,200 L0,200 Z;
                      M0,100 C150,0 350,200 500,100 L500,200 L0,200 Z;
                      M0,100 C150,200 350,0 500,100 L500,200 L0,200 Z"
          />
        </path>
      </svg>

      <!-- Secondary Wavy Layer (Brighter) -->
      <svg
        class="absolute bottom-[-20px] left-[-10%] w-[120%] h-40 fill-[#FFD700]/20 opacity-80"
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
      >
        <path d="M0,120 C100,50 400,180 500,120 L500,200 L0,200 Z">
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="M0,120 C100,50 400,180 500,120 L500,200 L0,200 Z;
                      M0,120 C100,180 400,50 500,120 L500,200 L0,200 Z;
                      M0,120 C100,50 400,180 500,120 L500,200 L0,200 Z"
          />
        </path>
      </svg>

      <!-- Glow Core (Intensive) -->
      <div
        class="absolute bottom-[-40px] left-[-20%] right-[-20%] h-40 bg-[#FFD700]/40 blur-[50px] rounded-[100%]"
      ></div>
    </div>

    <!-- Content Wrapper -->
    <div class="relative z-10 w-full flex flex-col items-center h-full">
      <slot></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  width: { type: String, default: "100px" },
});

const sidebarStyle = computed(() => ({
  width: props.width,
  background: "#070709",
  borderRight: "1px solid rgba(212, 175, 55, 0.05)",
  boxShadow: "20px 0 80px rgba(0, 0, 0, 0.9)",
  borderBottomLeftRadius: "40px",
  borderTopLeftRadius: "40px",
}));
</script>

<style scoped>
@keyframes float-particle {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    transform: translateY(-30px) scale(1.5);
    opacity: 0.8;
  }
}
.animate-float-particle {
  animation: float-particle 4s ease-in-out infinite;
}
</style>

<style scoped>
@keyframes wave {
  0%,
  100% {
    transform: scaleY(1) translateY(0);
  }
  50% {
    transform: scaleY(1.2) translateY(-10px);
  }
}
.animate-wave {
  animation: wave 8s ease-in-out infinite;
}
</style>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.1);
  border-radius: 99px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.3);
}
</style>
