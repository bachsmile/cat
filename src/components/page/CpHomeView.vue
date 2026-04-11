<template>
  <div
    class="store-home-view min-h-screen overflow-x-hidden relative selection:bg-emerald-200"
    :style="{
      ...getDynamicBgStyle(props.images.bgTexture),
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <!-- 1. Hero Section -->
    <section
      class="hero-section relative min-h-screen flex items-center pt-20"
      :style="getDynamicBgStyle(props.hero.bgImage)"
    >
      <div class="container mx-auto px-12 lg:px-24 relative z-10">
        <div class="max-w-6xl animate-entrance">
          <h1
            class="text-[60px] lg:text-[80px] leading-[1.2] font-[900] text-[#ffb300] uppercase mb-10 drop-shadow-sm"
            v-html="hero.title"
          ></h1>
          <CgCard
            class="max-w-xl !p-8 !rounded-[2.5rem] mb-12 backdrop-blur-xl border-white/10"
            preset="Soft Mist"
          >
            <p
              class="text-xl font-bold text-white/90 leading-relaxed uppercase tracking-tight"
            >
              {{ hero.subtitle }}
            </p>
          </CgCard>

          <div class="flex items-center gap-10">
            <CnButton
              color="emerald"
              class="organic-cta-btn uppercase font-black text-lg !px-16 !py-8 bg-[#3cb47c] shadow-[0_20px_40px_rgba(60,180,124,0.3)]"
              @click="hero.onCtaClick"
            >
              {{ hero.ctaText }}
            </CnButton>
            <button
              class="flex items-center gap-5 group"
              @click="$emit('more-info')"
            >
              <div
                class="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-all"
              >
                <PlayIcon class="w-5 h-5 fill-white text-white" />
              </div>
              <span
                class="text-sm font-black uppercase tracking-widest text-[#fdfaf5] drop-shadow-md"
                >Tìm hiểu thêm</span
              >
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Vertical Scroll Indicator (Fixed Right) -->
    <div
      class="fixed bottom-20 right-12 lg:right-24 flex flex-col items-center gap-12 group pointer-events-none z-50"
    >
      <!-- Mouse Icon -->
      <div
        class="w-[32px] h-[54px] rounded-full border-[3px] border-white flex justify-center p-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
      >
        <div class="w-1.5 h-3 bg-white rounded-full animate-mouse-wheel"></div>
      </div>
      <!-- Long Line -->
      <div
        class="w-[4px] h-[500px] bg-white/5 relative overflow-hidden rounded-full backdrop-blur-sm"
      >
        <div
          class="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-b from-transparent via-white to-transparent opacity-100 animate-scroll-glow-vertical shadow-[0_0_20px_#fff,0_0_40px_#34d399,0_0_80px_#059669]"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-[350px] bg-emerald-400 blur-md animate-scroll-glow-vertical opacity-50"
        ></div>
      </div>
    </div>

    <!-- 2. Feature Bar & Grid Section -->
    <section
      class="p-24 lg:p-24 relative z-20 reveal-init content-section"
      :style="getDynamicBgStyle(props.images.sectionBg)"
    >
      <div
        class="feature-wave-bar rounded-[5rem] p-16 mb-24 lg:p-24 shadow-[0_-30px_60px_rgba(0,0,0,0.3),0_80px_160px_rgba(0,0,0,0.4)] relative overflow-hidden bg-[#1e4a2e] max-w-[1440px] mx-auto"
      >
        <div
          class="absolute inset-0 pointer-events-none bg-no-repeat bg-cover bg-center"
          :style="getDynamicBgStyle(props.images.heroLeaf)"
        ></div>

        <div
          class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          <div
            v-for="f in features"
            :key="f.label"
            class="flex flex-col items-center text-center group"
          >
            <div
              class="w-24 h-24 rounded-[2.5rem] bg-white/10 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-500 shadow-xl group-hover:-translate-y-2"
            >
              <CnIcon color="emerald" :size="48" class="text-emerald-100">
                <component :is="f.icon" class="w-10 h-10" />
              </CnIcon>
            </div>
            <h3
              class="text-lg font-black text-white uppercase tracking-[0.2em] mb-4"
            >
              {{ f.label }}
            </h3>
            <p
              class="text-xs font-semibold text-white/40 leading-relaxed max-w-[200px]"
            >
              {{ f.desc }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20 max-w-[1440px] mx-auto"
      >
        <template v-for="card in cards" :key="card.id">
          <!-- Card Variant -->
          <CnCard
            v-if="card.type === 'card'"
            :color="card.color || 'emerald'"
            class="organic-store-card aspect-square"
            @click="card.onClick"
          >
            <div
              class="flex flex-col items-center justify-center h-full p-12 text-center gap-8"
            >
              <div
                v-if="card.icon"
                class="w-[100px] h-[100px] flex items-center justify-center shadow-2xl rounded-full"
                :class="[card.iconBgClass || 'bg-white']"
                :style="
                  isColor(card.iconBgClass)
                    ? { backgroundColor: card.iconBgClass }
                    : {}
                "
              >
                <CnIcon
                  :color="card.color || 'emerald'"
                  :size="card.iconSize || 48"
                >
                  <component :is="card.icon" class="w-full h-full" />
                </CnIcon>
              </div>
              <div
                v-if="card.image"
                class="w-[100px] h-[100px] rounded-full overflow-hidden shadow-2xl"
              >
                <img :src="card.image" class="w-full h-full object-cover" />
              </div>
              <div>
                <h3
                  class="text-2xl font-black text-white uppercase tracking-[0.15em] mb-3"
                >
                  {{ card.title }}
                </h3>
                <p
                  class="text-xs font-medium text-white/50 leading-relaxed px-4"
                >
                  {{ card.desc }}
                </p>
              </div>
            </div>
          </CnCard>

          <!-- Image Variant -->
          <div
            v-else
            class="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] aspect-square relative group"
          >
            <img
              :src="card.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            ></div>
          </div>
        </template>
      </div>
    </section>

    <!-- Default Spacer Section -->
    <section
      v-if="!$slots.bottom"
      class="container mx-auto px-12 lg:px-24 pb-48 relative z-10 min-h-[850px]"
    ></section>

    <!-- Optional Bottom Slot -->
    <slot name="bottom"></slot>

    <!-- 4. Footer -->
    <footer
      class="py-32 text-center relative overflow-hidden"
      :style="{
        backgroundColor: props.footer.bgColor || '#1e3a24',
        color: props.footer.textColor || 'white',
        ...getDynamicFooterStyle(props.images.footerBg),
      }"
    >
      <div class="relative z-10">
        <span
          class="text-xs font-black uppercase tracking-[1em] block mb-4 opacity-40"
          :style="{ color: props.footer.textColor || 'inherit' }"
        >
          {{ props.footer.tag }}
        </span>
        <h2
          class="text-3xl font-black uppercase tracking-tighter opacity-90"
          :style="{ color: props.footer.textColor || 'inherit' }"
        >
          {{ props.footer.title }}
        </h2>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export interface Feature {
  icon: any;
  label: string;
  desc: string;
}

export interface Card {
  id: string | number;
  type: "card" | "image";
  color?: string;
  icon?: any;
  iconBgClass?: string;
  iconSize?: number;
  image?: string;
  title?: string;
  desc?: string;
  onClick?: () => void;
}

export interface Hero {
  title: string;
  subtitle: string;
  bgImage: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export interface Footer {
  tag: string;
  title: string;
  bgColor?: string;
  textColor?: string;
}

export interface Images {
  bgTexture: string;
  sectionBg: string;
  heroLeaf: string;
  footerBg: string;
}
</script>

<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play as PlayIcon } from "lucide-vue-next";
import { CnButton, CnCard, CnIcon, CgCard } from "glass-studio-ui-pro";

function isColor(val?: string) {
  if (!val) return false;
  return val.startsWith("#") || val.startsWith("rgb") || val.startsWith("hsl");
}

function getDynamicBgStyle(val?: string): Record<string, string> {
  if (!val) return {};
  return isColor(val)
    ? { backgroundColor: val, backgroundImage: "none" }
    : { backgroundImage: `url(${val})` };
}

function getDynamicFooterStyle(val?: string): Record<string, string> {
  if (!val) return {};
  if (isColor(val)) {
    return { backgroundColor: val, backgroundImage: "none" };
  }
  return {
    backgroundImage: `url(${val})`,
    backgroundSize: "cover",
    backgroundPosition: "0% 46%",
  };
}

const props = defineProps<{
  hero: Hero;
  features: Feature[];
  cards: Card[];
  images: Images;
  footer: Footer;
}>();

defineEmits(["more-info"]);

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const revealElements = document.querySelectorAll(".reveal-init");

  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
        scale: 0.95,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
    );
  });
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap");

.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.9),
    0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 5;
}

.store-home-view {
  font-family: var(--system-font, "Outfit"), sans-serif;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
}

.organic-cta-btn {
  border-radius: 4rem !important;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    filter: brightness(1.1);
  }
}

.organic-store-card {
  border-radius: 5rem !important;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-12px);
  }
}

@keyframes entrance {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.animate-entrance {
  animation: entrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scroll-glow-vertical {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(500px);
  }
}

.animate-scroll-glow-vertical {
  animation: scroll-glow-vertical 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes mouse-wheel {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(16px);
    opacity: 0;
  }
}

.animate-mouse-wheel {
  animation: mouse-wheel 2s ease-in-out infinite;
}

.reveal-init {
  opacity: 0;
  will-change: transform, opacity, filter;
}

.content-section {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.9),
    0 10px 30px rgba(0, 0, 0, 0.3);
  height: 850px;
  z-index: 4;
}
</style>
