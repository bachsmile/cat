<!-- Elegant Wedding Template - Fixed Assets & Layout -->
<script setup lang="ts">
import { ref } from "vue";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  QrCode,
  MapPin,
} from "lucide-vue-next";
import weddingCouple from "@/assets/images/wedding_couple_elegant.png";
import floralAccents from "@/assets/images/wedding_floral_accents.png";

defineProps<{
  weddingData: any;
  formatDate: (dateStr: string) => string;
  isPreview?: boolean;
}>();

const activePage = ref(0);
const totalPages = 4;

const nextPage = () => {
  if (activePage.value < totalPages - 1) activePage.value++;
};
const prevPage = () => {
  if (activePage.value > 0) activePage.value--;
};
</script>

<template>
  <div
    class="elegant-template-wrapper w-full bg-[#FAF9F6] text-[#1a1a1a] font-serif overflow-hidden relative select-none"
    :class="isPreview ? 'h-full' : 'h-screen'"
  >
    <!-- 🌸 Floral Background (Static) -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <img
        :src="floralAccents"
        class="absolute top-0 right-0 w-[40%] max-w-[400px] rotate-90"
      />
      <img
        :src="floralAccents"
        class="absolute bottom-0 left-0 w-[40%] max-w-[400px] -rotate-90 opacity-40"
      />
    </div>

    <!-- MAIN CONTENT AREA -->
    <div
      class="relative z-10 h-full w-full flex items-center justify-center p-4 md:p-8"
    >
      <Transition name="fade-slide" mode="out-in">
        <!-- PAGE 0: BÌA THIỆP (FRONT COVER) -->
        <div
          v-if="activePage === 0"
          key="page0"
          class="w-full h-full max-w-[500px] max-h-[700px] bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden border border-black/5"
        >
          <!-- Decorative Arch -->
          <div
            class="absolute inset-x-8 md:inset-x-12 top-12 md:top-16 bottom-20 md:bottom-24 border-[#d4af37]/30 border-2 rounded-t-full pointer-events-none"
          ></div>

          <div class="space-y-4 md:space-y-6 relative z-20">
            <p
              class="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-[#d4af37] font-black"
            >
              the WEDDING of
            </p>

            <!-- Monogram -->
            <div
              class="text-7xl md:text-9xl text-[#d4af37] font-script leading-none py-2 translate-y-2"
            >
              {{ weddingData.groomName?.[0] || "L"
              }}{{ weddingData.brideName?.[0] || "B" }}
            </div>

            <div class="space-y-3">
              <h1
                class="text-xl md:text-2xl text-[#1a1a1a] font-serif uppercase tracking-[0.3em] font-bold"
              >
                {{ weddingData.groomName || "LUNA" }} &
                {{ weddingData.brideName || "BARON" }}
              </h1>
              <p
                class="text-[9px] md:text-[11px] text-[#d4af37] uppercase tracking-[0.5em] font-medium"
              >
                {{
                  weddingData.date
                    ? formatDate(weddingData.date)
                    : "11 NOVEMBER 2045"
                }}
              </p>
            </div>
          </div>

          <!-- Floral Bouquet -->
          <div
            class="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 w-[110%] z-30"
          >
            <img :src="floralAccents" class="w-full h-auto drop-shadow-xl" />
          </div>
        </div>

        <!-- PAGE 1: LỜI MỜI (FORMAL INVITATION) -->
        <div
          v-else-if="activePage === 1"
          key="page1"
          class="w-full h-full max-w-[500px] max-h-[700px] bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-8 md:p-12 text-center relative border border-black/5"
        >
          <div
            class="absolute inset-6 md:inset-8 border border-gray-100 rounded-lg pointer-events-none"
          ></div>

          <div class="space-y-6 md:space-y-8">
            <p
              class="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-gray-400 font-bold"
            >
              TOGETHER WITH THEIR FAMILIES
            </p>

            <div class="space-y-3 md:space-y-4">
              <h2 class="text-4xl md:text-5xl text-[#d4af37] font-script">
                {{ weddingData.groomName }}
              </h2>
              <p class="text-lg md:text-xl font-serif text-gray-300 italic">
                and
              </p>
              <h2 class="text-4xl md:text-5xl text-[#d4af37] font-script">
                {{ weddingData.brideName }}
              </h2>
            </div>

            <div class="pt-6 md:pt-10 space-y-3 md:space-y-4">
              <p
                class="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-gray-400 font-black"
              >
                INVITE YOU TO CELEBRATE THEIR WEDDING
              </p>
              <div class="h-px w-8 md:w-10 bg-[#d4af37]/20 mx-auto"></div>
              <p class="text-md md:text-lg font-serif italic text-gray-800">
                {{ formatDate(weddingData.date) }}
              </p>
              <p
                class="text-[10px] md:text-xs uppercase tracking-widest text-gray-500"
              >
                {{ weddingData.time }}
              </p>

              <div class="pt-4 md:pt-6">
                <p class="text-sm md:text-md font-bold text-gray-900">
                  {{ weddingData.location?.split(",")[0] }}
                </p>
                <p
                  class="text-[9px] md:text-[10px] text-gray-400 mt-2 italic max-w-[200px] mx-auto leading-relaxed"
                >
                  {{ weddingData.location }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGE 2: GALLERY / STORY -->
        <div
          v-else-if="activePage === 2"
          key="page2"
          class="w-full h-full max-w-[500px] max-h-[700px] bg-white shadow-2xl rounded-2xl flex flex-col items-center p-6 md:p-8 text-center relative border border-black/5"
        >
          <div
            class="w-full h-[50%] md:h-[55%] rounded-xl overflow-hidden shadow-lg mb-6 md:mb-8 group"
          >
            <img
              :src="weddingCouple"
              class="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>

          <div
            class="px-4 space-y-4 md:space-y-6 flex-1 flex flex-col justify-center"
          >
            <span
              class="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-[#d4af37] font-black"
              >OUR STORY</span
            >
            <p
              class="text-[11px] md:text-xs font-serif italic leading-relaxed text-gray-600"
            >
              "Chúng mình gặp nhau và từ giây phút đó, mọi thứ dường như đã được
              sắp đặt. Một hành trình đầy ắp tiếng cười đang chờ đón..."
            </p>
            <div class="flex items-center justify-center gap-4 text-[#d4af37]">
              <div class="h-px w-6 bg-current opacity-30"></div>
              <Heart :size="14" />
              <div class="h-px w-6 bg-current opacity-30"></div>
            </div>
          </div>
        </div>

        <!-- PAGE 3: MAP / QR / RSVP -->
        <div
          v-else-if="activePage === 3"
          key="page3"
          class="w-full h-full max-w-[500px] max-h-[700px] bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-6 md:p-8 text-center relative border border-black/5 overflow-hidden"
        >
          <div class="w-full space-y-6 md:space-y-10">
            <div class="grid grid-cols-2 gap-4 md:gap-6 w-full">
              <div
                class="bg-gray-50 aspect-square rounded-2xl overflow-hidden flex flex-col p-3 md:p-4"
              >
                <p
                  class="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-[#d4af37] mb-1 md:mb-2"
                >
                  Location
                </p>
                <div
                  class="flex-1 bg-white rounded-lg shadow-inner flex items-center justify-center relative"
                >
                  <iframe
                    v-if="weddingData.mapUrl"
                    :src="weddingData.mapUrl"
                    class="w-full h-full border-none opacity-50"
                  ></iframe>
                  <MapPin v-else :size="20" class="text-gray-200" />
                </div>
              </div>
              <div
                class="bg-gray-50 aspect-square rounded-2xl overflow-hidden flex flex-col p-3 md:p-4"
              >
                <p
                  class="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-[#d4af37] mb-1 md:mb-2"
                >
                  Gift
                </p>
                <div
                  class="flex-1 bg-white rounded-lg shadow-inner flex items-center justify-center"
                >
                  <QrCode
                    v-if="weddingData.qrInfo"
                    :size="32"
                    class="text-gray-900/80"
                  />
                  <Heart v-else :size="20" class="text-gray-100" />
                </div>
              </div>
            </div>

            <div class="pt-4 md:pt-8 space-y-4 md:space-y-6">
              <h4 class="text-xl md:text-2xl font-script text-[#d4af37]">
                Mọi sự hiện diện đều là món quà quý giá...
              </h4>
              <div class="flex gap-2 md:gap-3">
                <button
                  class="flex-1 py-3 md:py-4 rounded-xl bg-gray-900 text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
                >
                  Tham dự
                </button>
                <button
                  class="flex-1 py-3 md:py-4 rounded-xl border border-gray-100 text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                  Rất tiếc
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- NAVIGATION CONTROLS (Floating Arrows) -->
      <div
        v-if="activePage > 0"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-[100]"
      >
        <button
          @click="prevPage"
          class="p-4 rounded-full bg-white shadow-2xl border border-gray-100/50 text-[#d4af37] hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft :size="24" />
        </button>
      </div>

      <div
        v-if="activePage < totalPages - 1"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-[100]"
      >
        <button
          @click="nextPage"
          class="p-4 rounded-full bg-white shadow-2xl border border-gray-100/50 text-[#d4af37] hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronRight :size="24" />
        </button>
      </div>

      <!-- Pagination Dots -->
      <div
        class="absolute inset-x-0 bottom-4 z-[100] flex justify-center gap-3"
      >
        <div
          v-for="i in totalPages"
          :key="i"
          @click="activePage = i - 1"
          class="w-2 h-2 rounded-full transition-all duration-500 cursor-pointer shadow-sm"
          :class="activePage === i - 1 ? 'bg-[#d4af37] w-8' : 'bg-gray-300'"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Alex+Brush&family=Inter:wght@100..900&display=swap");

.font-serif {
  font-family: "Playfair Display", serif;
}
.font-script {
  font-family: "Alex Brush", cursive;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.elegant-template-wrapper {
  user-select: none;
}
</style>
