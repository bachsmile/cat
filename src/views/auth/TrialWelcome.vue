<template>
  <div
    class="h-screen w-full bg-[#050508] text-white overflow-y-auto overflow-x-hidden font-['Inter',_sans-serif] scroll-smooth relative"
    ref="scrollContainer"
  >
    <!-- Intro Phase (Premium Animated Sequence) -->
    <transition name="fade">
      <div
        v-show="phase === 'intro'"
        class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      >
        <!-- Ambient Background for Intro -->
        <div
          class="absolute inset-0 z-0 pointer-events-none transition-all duration-1000"
          :class="currentDomainColor"
        >
          <div
            class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-current opacity-20 blur-[150px] rounded-full animate-pulse-slow"
          ></div>
          <div
            class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-current opacity-20 blur-[150px] rounded-full animate-pulse-slow"
            style="animation-delay: 2s"
          ></div>
        </div>

        <div
          class="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center h-full"
        >
          <!-- Step 1: Initial Hook -->
          <transition name="zoom-fade">
            <h1
              v-if="introStep === 0"
              class="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-600 bg-clip-text text-transparent"
            >
              THE FUTURE IS HERE
            </h1>
          </transition>

          <!-- Step 2: Cycling Domains Showcase -->
          <transition name="zoom-fade">
            <div v-if="introStep === 1" class="flex flex-col items-center">
              <p
                class="text-2xl md:text-3xl text-gray-400 mb-8 font-light tracking-wide"
              >
                Một hệ thống lõi duy nhất cho...
              </p>

              <transition name="slide-up" mode="out-in">
                <div
                  :key="showcaseDomain?.id"
                  class="flex flex-col items-center transform transition-all"
                >
                  <div
                    class="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-white/5 border border-white/20 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl"
                    :class="showcaseDomain?.shadow"
                  >
                    <component
                      :is="showcaseDomain?.icon"
                      class="w-16 h-16 md:w-24 md:h-24"
                      :class="showcaseDomain?.color"
                    />
                  </div>
                  <h2
                    class="text-5xl md:text-7xl font-bold tracking-tight"
                    :class="showcaseDomain?.color"
                  >
                    {{ showcaseDomain?.name }}
                  </h2>
                  <p class="mt-4 text-xl text-gray-400 max-w-lg">
                    {{ showcaseDomain?.desc }}
                  </p>
                </div>
              </transition>
            </div>
          </transition>

          <!-- Step 3: Call to Action -->
          <transition name="zoom-fade">
            <div v-if="introStep === 2" class="flex flex-col items-center">
              <h2
                class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse-text mb-12"
              >
                Khám Phá Không Gian Làm Việc
              </h2>
              <button
                @click="startSurvey"
                class="group relative px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full font-bold text-xl transition-all hover:scale-105 active:scale-95 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>
                <span class="relative z-10 text-white flex items-center gap-3">
                  Bắt Đầu Hành Trình
                  <svg
                    class="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- Survey Overlay Phase -->
    <transition name="fade">
      <div
        v-if="phase === 'survey'"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl p-4"
      >
        <!-- Welcome Text -->
        <div class="text-center z-10 mb-12 animate-fade-up">
          <h2
            class="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4"
          >
            Chào mừng bạn đến với Hệ sinh thái
          </h2>
          <p class="text-xl md:text-2xl text-gray-300 font-light">
            Bạn muốn trải nghiệm lĩnh vực nào hôm nay?
          </p>
        </div>

        <!-- Central Orb -->
        <div
          class="relative w-80 h-80 md:w-[32rem] md:h-[32rem] mb-16 z-10 flex items-center justify-center scale-90 md:scale-100"
        >
          <div
            class="absolute w-[80%] h-[75%] bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-purple-600/30 backdrop-blur-3xl rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-white/20 animate-blob-morph1 z-0 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_10px_30px_rgba(255,255,255,0.2)]"
          ></div>

          <div
            class="absolute w-[60%] h-[55%] -top-4 -left-8 bg-gradient-to-tr from-pink-500/40 via-rose-500/30 to-transparent backdrop-blur-2xl rounded-[60%_40%_30%_70%/60%_30%_70%_40%] border border-white/30 animate-blob-morph2 z-[1] shadow-[inset_0_8px_20px_rgba(255,255,255,0.4)]"
          >
            <div
              class="absolute top-4 left-6 w-12 h-6 bg-white/40 blur-md rounded-full rotate-[-45deg]"
            ></div>
          </div>

          <div
            class="absolute w-[50%] h-[50%] bottom-4 right-4 bg-gradient-to-br from-purple-600/50 via-indigo-600/40 to-transparent backdrop-blur-2xl rounded-[30%_70%_70%_30%/50%_40%_60%_50%] border border-white/20 animate-blob-morph3 z-[1] shadow-[inset_0_-10px_25px_rgba(255,100,255,0.2)]"
          >
            <div
              class="absolute bottom-10 right-10 w-4 h-4 bg-white/60 blur-sm rounded-full"
            ></div>
          </div>

          <div
            class="absolute w-[65%] h-[40%] top-8 bg-white/5 backdrop-blur-md rounded-[50%_50%_30%_70%/60%_40%_60%_40%] border border-white/40 animate-blob-morph1 z-[2] shadow-[inset_0_15px_30px_rgba(255,255,255,0.3)]"
          >
            <div
              class="absolute top-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-white/20 blur-sm rounded-full"
            ></div>
          </div>

          <img
            :src="bogImage"
            alt="Central Orb"
            class="w-64 h-64 md:w-80 md:h-80 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-700"
          />
        </div>

        <!-- Pill Selections -->
        <div
          class="flex flex-wrap justify-center gap-4 z-10 max-w-4xl animate-fade-up"
          style="animation-delay: 0.3s"
        >
          <button
            v-for="domain in domains"
            :key="domain.id"
            @click="selectDomain(domain)"
            class="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:-translate-y-1 backdrop-blur-md"
          >
            <component
              :is="domain.icon"
              class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
            />
            <span
              class="text-gray-300 group-hover:text-white font-medium whitespace-nowrap"
              >{{ domain.name }}</span
            >
          </button>
        </div>

        <div
          class="mt-8 text-sm text-gray-500 z-10 animate-fade-up"
          style="animation-delay: 0.5s"
        >
          Chọn một lựa chọn ở trên để thiết lập không gian làm việc của bạn
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { DOMAINS as domains } from "../../constants/modules";
import bogImage from "../../assets/images/bog.png";

const router = useRouter();

// --- Intro Animation Sequence State ---
const phase = ref<"intro" | "survey">("intro");
const introStep = ref<number>(0); // 0: Title, 1: Domains Showcase, 2: CTA
const showcaseIndex = ref(0);

const showcaseDomain = computed(() => domains[showcaseIndex.value]);
const currentDomainColor = computed(
  () => showcaseDomain.value?.color || "text-blue-400"
);

// --- Animation Core ---
let introInterval: any = null;

const startIntroSequence = () => {
  // Step 1: Hook
  setTimeout(() => {
    introStep.value = 1;

    // Step 2: Showcase Cycling
    introInterval = setInterval(() => {
      showcaseIndex.value = (showcaseIndex.value + 1) % domains.length;
    }, 2500);

    // Step 3: Transition to Final CTA
    setTimeout(() => {
      if (phase.value === "intro") {
        clearInterval(introInterval);
        introStep.value = 2;
      }
    }, 15000);
  }, 3000);
};

const startSurvey = () => {
  if (introInterval) clearInterval(introInterval);
  phase.value = "survey";
};

const selectDomain = (domain: any) => {
  if (introInterval) clearInterval(introInterval);
  router.push(`/welcome-trial/${domain.id}`);
};

onMounted(() => {
  startIntroSequence();
});

onUnmounted(() => {
  if (introInterval) clearInterval(introInterval);
});
</script>

<style scoped>
/* Intro Sequence Animations */
.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.zoom-fade-enter-active { transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
.zoom-fade-enter-from { opacity: 0; transform: scale(0.9); }
.slide-up-enter-active { transition: all 0.6s ease-out; }
.slide-up-enter-from { opacity: 0; transform: translateY(30px); }
.animate-pulse-slow { animation: pulse 6s infinite ease-in-out; }
.animate-pulse-text { animation: pulseText 4s infinite ease-in-out; }
@keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.1); } }
@keyframes pulseText { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(0.98); } }
@keyframes blob-morph1 { 0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } 50% { border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%; } }
@keyframes blob-morph2 { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } }
@keyframes blob-morph3 { 0%, 100% { border-radius: 30% 70% 70% 30% / 50% 40% 60% 50%; } 50% { border-radius: 70% 30% 30% 70% / 40% 60% 40% 60%; } }
.animate-blob-morph1 { animation: blob-morph1 10s infinite alternate ease-in-out; }
.animate-blob-morph2 { animation: blob-morph2 12s infinite alternate-reverse ease-in-out; }
.animate-blob-morph3 { animation: blob-morph3 8s infinite alternate ease-in-out; }
.animate-fade-up { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
</style>
