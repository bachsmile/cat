<template>
  <div
    class="h-screen bg-[#050507] overflow-hidden flex items-center justify-center font-inter perspective-2000"
  >
    <!-- 🌠 High-End Ambient Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-rose-600/10 blur-[150px] rounded-full"
      ></div>
      <div
        class="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/5 blur-[120px] rounded-full"
      ></div>

      <!-- Sparkle Particles -->
      <div v-if="isExtracted" class="absolute inset-0 z-0">
        <div
          v-for="s in 30"
          :key="s"
          class="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            opacity: Math.random(),
          }"
        ></div>
      </div>
    </div>

    <!-- 💌 ENVELOPE MASTER (Entry Point) -->
    <div
      class="relative z-10 w-[380px] aspect-[3/4] transition-all duration-1000 ease-in-out cursor-pointer"
      :class="{
        'translate-y-[280px] scale-90 opacity-20 blur-[2px] pointer-events-none':
          isExtracted,
      }"
    >
      <div
        class="absolute inset-0 bg-[#8B1E3F] rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-12 overflow-hidden preserve-3d"
        :style="{ backgroundColor: weddingData.envelopeColor || '#8B1E3F' }"
        @click="handleEnvelopeClick"
      >
        <!-- Flap -->
        <div
          class="absolute top-0 left-0 w-full h-[45%] origin-top transition-all duration-1000 z-40 bg-black/10 rounded-b-[100px] border-b border-white/5"
          :class="{ 'rotate-X-180 -translate-y-full opacity-0': isOpened }"
        ></div>
        <!-- Seal -->
        <div
          class="relative z-10 text-center transition-all duration-500"
          :class="{ 'opacity-0 scale-95': isOpened }"
        >
          <div
            class="w-16 h-16 rounded-full bg-yellow-600/20 border-2 border-yellow-600/30 flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse"
          >
            <Heart class="w-6 h-6 text-yellow-600" />
          </div>
          <p
            class="text-[7px] text-white/40 uppercase tracking-[0.6em] font-black mb-4"
          >
            Wedding Invitation
          </p>
          <h2 class="text-xl text-white font-serif italic">
            {{ weddingData.envelopeText || "Thân mời bạn" }}
          </h2>
        </div>
        <div
          class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 pointer-events-none"
        ></div>
      </div>
    </div>

    <!-- 📖 THE 3D BOOK (The Invitation) -->
    <div
      v-if="isOpened"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] transition-all duration-1000 ease-out"
      :class="{
        'opacity-100 scale-100': isExtracted,
        'opacity-0 scale-50 translate-y-[100px]': !isExtracted,
      }"
    >
      <div class="book-container relative w-[360px] aspect-[3/4] preserve-3d">
        <!-- Shine Overlay -->
        <div
          class="absolute inset-0 z-[150] pointer-events-none bg-gradient-to-tr from-white/0 via-white/20 to-white/0 animate-shine rounded-[30px]"
        ></div>

        <!-- Binding / Gáy sách -->
        <div
          class="absolute left-[-5px] top-[5%] bottom-[5%] w-[10px] bg-rose-900/10 blur-[3px] rounded-full z-[140]"
        ></div>

        <!-- PAGES -->
        <div
          v-for="(_, index) in pages"
          :key="index"
          class="page-wrapper absolute inset-0 transition-transform duration-1000 preserve-3d origin-left"
          :style="{
            zIndex: 100 - index,
            transform:
              index < activePage
                ? 'rotateY(-160deg) scaleX(0.95)'
                : 'rotateY(0deg)',
          }"
          @click="flipNext(index)"
        >
          <!-- Front of Page -->
          <div
            class="absolute inset-0 bg-white rounded-[30px] shadow-lg border-[10px] border-[#FFF5E1] backface-hidden flex flex-col items-center justify-center p-8 text-center overflow-hidden"
          >
            <!-- Textures & Shadow -->
            <div
              class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none"
            ></div>
            <div
              class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent"
            ></div>

            <!-- PAGE CONTENT -->
            <div class="relative z-10 w-full h-full flex flex-col">
              <template v-if="index === 0">
                <div class="mt-8 mb-4">
                  <p
                    class="text-[8px] tracking-[0.8em] text-rose-900/40 uppercase font-black mb-4"
                  >
                    {{ weddingData.title }}
                  </p>
                  <div class="h-[1px] w-10 bg-rose-900/20 mx-auto"></div>
                </div>
                <div class="flex-1 flex flex-col justify-center gap-2">
                  <h1 class="text-5xl text-rose-900 font-serif italic">
                    {{ weddingData.groomName?.[0] }}
                  </h1>
                  <span class="text-xl text-rose-300 font-serif">&</span>
                  <h1 class="text-5xl text-rose-900 font-serif italic">
                    {{ weddingData.brideName?.[0] }}
                  </h1>
                </div>
                <div class="mb-8">
                  <div
                    class="text-[10px] text-rose-900/60 font-bold uppercase tracking-[0.4em]"
                  >
                    {{ formatDate(weddingData.date) }}
                  </div>
                </div>
              </template>

              <template v-else-if="index === 1">
                <h3
                  class="text-xs uppercase tracking-widest text-rose-900/30 font-black mt-8 mb-6"
                >
                  Trân Trọng Kính Mời
                </h3>
                <div class="grid grid-cols-2 gap-4 w-full px-2">
                  <div class="text-left border-r border-rose-900/10 pr-2">
                    <p
                      class="text-[6px] font-black text-rose-400 uppercase mb-1"
                    >
                      Nhà Trai
                    </p>
                    <p class="text-[8px] text-rose-900-italic">
                      {{ weddingData.groomParents }}
                    </p>
                  </div>
                  <div class="text-right pl-2">
                    <p
                      class="text-[6px] font-black text-rose-400 uppercase mb-1"
                    >
                      Nhà Gái
                    </p>
                    <p class="text-[8px] text-rose-900-italic">
                      {{ weddingData.brideParents }}
                    </p>
                  </div>
                </div>
                <div class="flex-1 flex flex-col justify-center py-6">
                  <p
                    class="text-xs text-rose-950 font-serif italic leading-relaxed"
                  >
                    {{ weddingData.invitationText }}
                  </p>
                </div>
                <div class="mb-8 flex flex-col gap-2">
                  <span class="text-xl text-rose-900 font-serif italic">{{
                    weddingData.groomName
                  }}</span>
                  <span class="text-[10px] text-rose-300 font-serif">&</span>
                  <span class="text-xl text-rose-900 font-serif italic">{{
                    weddingData.brideName
                  }}</span>
                </div>
              </template>

              <template v-else-if="index === 2">
                <h2 class="text-xl text-rose-900 font-serif italic mt-8">
                  Hôn Lễ
                </h2>
                <div class="flex-1 flex flex-col gap-6 justify-center w-full">
                  <div class="border-b border-rose-900/5 pb-4">
                    <p class="text-lg text-rose-900 font-serif italic">
                      {{ weddingData.time }}
                    </p>
                    <p
                      class="text-[9px] font-bold tracking-tighter text-rose-900/60 opacity-60"
                    >
                      {{ formatDate(weddingData.date) }}
                    </p>
                  </div>
                  <p
                    class="text-xs text-rose-900 font-serif italic leading-relaxed px-2"
                  >
                    {{ weddingData.location }}
                  </p>
                </div>
                <div class="mb-8 opacity-20">
                  <Heart class="w-4 h-4 mx-auto" />
                </div>
              </template>

              <template v-else-if="index === 3">
                <h2 class="text-xl text-rose-900 font-serif italic mt-8">
                  Bản Đồ
                </h2>
                <div
                  class="flex-1 w-full bg-[#FFF5E1] rounded-2xl mt-4 overflow-hidden shadow-inner"
                >
                  <iframe
                    v-if="weddingData.mapUrl"
                    :src="weddingData.mapUrl"
                    class="w-full h-full border-none grayscale-[0.5] contrast-75"
                  ></iframe>
                  <div v-else class="h-full flex items-center justify-center">
                    <MapPin class="w-6 h-6 text-rose-200" />
                  </div>
                </div>
                <p class="mt-4 mb-8 text-[8px] text-rose-900/40 italic">
                  Chạm để xem đường đi chi tiết
                </p>
              </template>

              <template v-else-if="index === 4">
                <h2 class="text-xl text-rose-900 font-serif italic mt-8">
                  Lời Cảm Ơn
                </h2>
                <div
                  class="flex-1 flex flex-col items-center justify-center gap-6 w-full"
                >
                  <div
                    class="w-28 h-28 bg-[#FFF5E1] rounded-3xl flex items-center justify-center border-4 border-white shadow-xl relative group"
                  >
                    <QrCode
                      v-if="weddingData.qrInfo"
                      class="w-20 h-20 text-rose-900/80"
                    />
                    <div
                      class="absolute inset-0 bg-white/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    ></div>
                  </div>
                  <p
                    class="text-[9px] text-rose-950 font-serif italic leading-relaxed px-4"
                  >
                    {{
                      weddingData.qrInfo || "Mừng hạnh phúc cho hai chúng mình!"
                    }}
                  </p>
                </div>
                <div
                  class="mb-8 text-[8px] text-rose-400 font-black tracking-widest uppercase"
                >
                  Thank You So Much
                </div>
              </template>
            </div>

            <!-- Hints -->
            <span
              class="absolute bottom-2 right-4 text-[6px] text-rose-900/10 font-bold uppercase tracking-widest"
            >
              Chạm để lật
            </span>
          </div>

          <!-- Back of Page (The Paper Texture Behind) -->
          <div
            class="absolute inset-0 bg-[#FDFDFD] rounded-[30px] backface-hidden rotate-Y-180 border-[8px] border-[#FFF5E1] shadow-inner"
          >
            <div
              class="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent"
            ></div>
            <div
              class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10"
            ></div>
          </div>
        </div>

        <!-- END OF BOOK MSG -->
        <div
          v-if="activePage === pages"
          class="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-white/20 backdrop-blur-3xl rounded-[30px] border border-white/20 z-0"
        >
          <Heart class="w-12 h-12 text-rose-500 mb-6 animate-bounce" />
          <p class="text-xl text-white font-serif italic">
            Mong được đón tiếp bạn!
          </p>
          <button
            @click="activePage = 0"
            class="mt-8 text-[8px] font-black uppercase tracking-widest text-rose-400 hover:text-white transition-colors"
          >
            Xem lại từ đầu
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <div
      v-if="isExtracted"
      class="fixed bottom-12 flex flex-col items-center gap-4 z-[200]"
    >
      <div class="flex gap-3">
        <div
          v-for="p in pages + 1"
          :key="p"
          class="w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-glow"
          :class="activePage === p - 1 ? 'bg-rose-500 w-8' : 'bg-white/20'"
        ></div>
      </div>
      <p class="text-[8px] text-white/30 font-black uppercase tracking-[0.4em]">
        Trang {{ activePage + 1 }} / {{ pages + 1 }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Heart, MapPin, QrCode } from "lucide-vue-next";

defineProps<{
  weddingData: any;
  formatDate: (dateStr: string) => string;
}>();

const isOpened = ref(false);
const isExtracted = ref(false);
const activePage = ref(0);
const pages = 5;

const handleEnvelopeClick = () => {
  if (!isOpened.value) {
    isOpened.value = true;
    setTimeout(() => {
      isExtracted.value = true;
    }, 1200);
  }
};

const flipNext = (index: number) => {
  if (index === activePage.value) {
    activePage.value++;
  }
};
</script>

<style scoped>
.perspective-2000 {
  perspective: 3000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-X-180 {
  transform: rotateX(180deg);
}
.rotate-Y-180 {
  transform: rotateY(180deg);
}
.book-container {
  transform: rotateX(10deg);
}
.page-wrapper {
  transform-origin: left center;
  transition: transform 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.shadow-glow {
  box-shadow: 0 0 10px rgba(244, 63, 94, 0.3);
}
@keyframes shine {
  0% {
    transform: translateX(-150%) skewX(-30deg);
  }
  20%,
  100% {
    transform: translateX(150%) skewX(-30deg);
  }
}
.animate-shine {
  animation: shine 6s infinite ease-in-out;
}
@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}
.animate-sparkle {
  animation: sparkle 4s infinite;
}
.text-rose-900-italic {
  color: rgba(159, 18, 57, 0.6);
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
}
.page-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.1),
    transparent 10%,
    transparent 90%,
    rgba(0, 0, 0, 0.05)
  );
  z-index: 10;
  border-radius: 30px;
}
</style>
