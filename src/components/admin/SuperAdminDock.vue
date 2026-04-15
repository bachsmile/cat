<template>
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] perspective-[1000px] mb-4"
  >
    <!-- Background Rail (Stable height to prevent jitter) -->
    <!-- SVG Gooey Filter -->
    <svg style="position: absolute; width: 0; height: 0" aria-hidden="true">
      <defs>
        <filter
          id="liquid-gooey"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <CgCard
      type="glass-frost"
      :shadow="true"
      class="relative !p-0 !rounded-[3rem] border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out !w-max !overflow-visible"
    >
      <div
        class="relative flex items-end gap-2 p-3 pb-4 pt-6 !overflow-visible"
      >
        <div
          v-for="(item, index) in dockItems"
          :key="item.id"
          class="relative flex flex-col items-center cursor-pointer z-10 !overflow-visible"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
          @click="handleNavigate(item)"
        >
          <!-- Tooltip -->
          <div
            class="absolute -top-24 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-black/90 backdrop-blur-2xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-white opacity-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-[600]"
            :class="{ 'opacity-100 -translate-y-4': hoverIndex === index }"
          >
            {{ item.name }}
            <div
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black/90 rotate-45"
            ></div>
          </div>

          <!-- Icon Container with Liquid Ripple Effect -->
          <div
            class="relative w-12 h-12 flex items-center justify-center transition-all duration-300 ease-out origin-bottom will-change-transform !overflow-visible"
            :style="getIconStyle()"
          >
            <!-- Outer Glow -->
            <div
              class="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 pointer-events-none"
              :class="[
                item.glow,
                {
                  'opacity-40 scale-150':
                    hoverIndex === index || index === activeIndex,
                },
              ]"
            ></div>

            <!-- Gooey Container -->
            <div
              class="relative w-full h-full !overflow-visible"
              :style="{
                filter:
                  hoverIndex === index || index === activeIndex
                    ? 'url(#liquid-gooey)'
                    : 'none',
              }"
            >
              <div
                class="absolute inset-0 z-10 border border-white/20 shadow-lg transition-all duration-700"
                :class="[
                  item.bg,
                  hoverIndex === index || index === activeIndex
                    ? 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-liquid-morph shadow-white/40 shadow-inner scale-110'
                    : 'rounded-2xl',
                ]"
              >
                <!-- Reflective surface -->
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-30"
                ></div>
              </div>

              <!-- Animated Satellites for fragmented liquid look -->
              <template v-if="hoverIndex === index || index === activeIndex">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="absolute w-5 h-5 rounded-full"
                  :class="[
                    item.bg,
                    i % 2 === 0
                      ? 'animate-liquid-orbit'
                      : 'animate-liquid-orbit-reverse',
                  ]"
                  :style="{
                    left: '50%',
                    top: '50%',
                    animationDelay: `${i * 0.3}s`,
                    '--orbit-dist': `${10 + i * 4}px`,
                    animationDuration: `${4 + i * 0.5}s`,
                  }"
                ></div>
              </template>
            </div>

            <!-- Icon (Keep above gooey and re-centered) -->
            <div
              class="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              <component
                :is="item.icon"
                class="w-6 h-6 text-white drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </CgCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Users as UsersIcon,
  Building as BuildingIcon,
  Settings as SettingsIcon,
  LayoutDashboard as DashIcon,
  Wallet as WalletIcon,
  Crown as CrownIcon,
} from "lucide-vue-next";
import { CgCard } from "glass-studio-ui-pro";

const hoverIndex = ref<number | null>(null);

const dockItems = [
  {
    id: "hub",
    name: "Hệ thống (Super Hub)",
    icon: CrownIcon,
    bg: "bg-gradient-to-br from-amber-400 to-orange-600",
    glow: "bg-amber-400",
  },
  {
    id: "go-admin",
    name: "Giao diện Admin",
    icon: DashIcon,
    bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    glow: "bg-indigo-400",
  },
  {
    id: "users",
    name: "Quản lý Tài khoản",
    icon: UsersIcon,
    bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    glow: "bg-blue-400",
  },
  {
    id: "deposits",
    name: "Phê duyệt Nạp tiền",
    icon: WalletIcon,
    bg: "bg-gradient-to-br from-rose-500 to-pink-600",
    glow: "bg-rose-400",
  },
  {
    id: "settings",
    name: "Thiết lập Hệ thống",
    icon: SettingsIcon,
    bg: "bg-gradient-to-br from-slate-600 to-slate-800",
    glow: "bg-slate-400",
  },
  {
    id: "organizations",
    name: "Quản lý Tổ chức",
    icon: BuildingIcon,
    bg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    glow: "bg-emerald-400",
  },
];

const props = defineProps({
  modelValue: {
    type: String,
    default: "hub",
  },
});

const activeIndex = computed(() => {
  return dockItems.findIndex((item) => item.id === props.modelValue);
});

const getIconStyle = () => {
  return {
    transform: "translateY(0) scale(1)",
    margin: "0 4px",
    zIndex: 10,
  };
};


const emit = defineEmits(["navigate"]);

const handleNavigate = (item: any) => {
  if (item.id === "go-admin") {
    window.location.href = "/ad";
  } else {
    emit("navigate", item.id);
  }
};
</script>

<style scoped>
@keyframes liquid-flow {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(200%);
  }
}

@keyframes liquid-morph {
  0% {
    border-radius: 1rem;
  }
  25% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }
  100% {
    border-radius: 1rem;
  }
}

@keyframes liquid-splash {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

@keyframes liquid-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-dist))
      rotate(0deg) scale(1.2);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg)
      translateX(calc(var(--orbit-dist) * 1.8)) rotate(-180deg) scale(0.6);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg)
      translateX(var(--orbit-dist)) rotate(-360deg) scale(1.2);
  }
}

@keyframes liquid-orbit-reverse {
  0% {
    transform: translate(-50%, -50%) rotate(360deg)
      translateX(calc(var(--orbit-dist) * 0.8)) rotate(-360deg) scale(0.8);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg)
      translateX(calc(var(--orbit-dist) * 2.2)) rotate(-180deg) scale(1.5);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0deg)
      translateX(calc(var(--orbit-dist) * 0.8)) rotate(0deg) scale(0.8);
  }
}

.animate-liquid-flow {
  animation: liquid-flow 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-liquid-morph {
  animation: liquid-morph 4s infinite alternate ease-in-out;
}

.animate-liquid-splash {
  animation: liquid-splash 0.8s ease-out forwards;
}

.animate-liquid-orbit {
  animation: liquid-orbit 5s infinite linear;
}

.animate-liquid-orbit-reverse {
  animation: liquid-orbit-reverse 7s infinite linear;
}

.will-change-transform {
  will-change: transform, margin;
}
</style>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
