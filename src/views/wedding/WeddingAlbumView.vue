<template>
  <div class="wedding-album-view min-h-screen bg-[#fcf8f8] selection:bg-rose-200 overflow-x-hidden">
    <!-- 1. Full-page Hero -->
    <section 
      class="hero-section h-screen relative flex items-center justify-center overflow-hidden"
      :style="{ backgroundImage: `url(${heroImage})` }"
    >
      <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      <div class="relative z-10 text-center animate-entrance">
        <h1 class="text-white text-[60px] lg:text-[100px] font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-2xl">
          Our Special <br />
          <span class="text-rose-400">Memories</span>
        </h1>
        <p class="text-white/90 text-xl font-bold uppercase tracking-widest drop-shadow-lg">
          {{ weddingDate }} • {{ location }}
        </p>
        
        <!-- Scroll indicator -->
        <div class="fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-60">
           <div class="w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent"></div>
           <span class="text-[10px] text-white font-black uppercase tracking-[0.3rem]">Scroll</span>
        </div>
      </div>
    </section>

    <!-- 2. Story / Info Section -->
    <section class="py-32 px-12 lg:px-24 container mx-auto text-center reveal-init">
      <h2 class="text-4xl font-black text-[#4a1e30] uppercase mb-8 tracking-tighter">
        Khoảnh Khắc Hạnh Phúc
      </h2>
      <p class="text-gray-500 max-w-2xl mx-auto font-medium leading-[2] text-lg italic">
        "Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng. Cảm ơn bạn đã là một phần trong hành trình kỳ diệu này của chúng tôi."
      </p>
    </section>

    <!-- 3. Dynamic Photo Grid -->
    <section class="pb-48 px-8 lg:px-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1440px] mx-auto">
        <div 
          v-for="(img, idx) in albumImages" 
          :key="idx"
          class="photo-card reveal-init rounded-[2.5rem] overflow-hidden shadow-2xl group relative aspect-[4/5]"
        >
          <img 
            :src="img" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </div>
    </section>

    <!-- 4. Footer Mini -->
    <footer class="py-20 border-t border-rose-100 text-center">
       <span class="text-xs font-black text-rose-300 uppercase tracking-widest">Wedding ID: {{ albumId }}</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Wedding assets (placeholders)
import heroImage from "@/assets/images/wd2.jpg";
import defaultImg1 from "@/assets/images/nt4.jpg";
import defaultImg2 from "@/assets/images/fn2.jpg";
import defaultImg3 from "@/assets/images/AdobeStock_2.png";

const route = useRoute();
const albumId = ref(route.query.id as string || 'W-2026-X');
const weddingDate = ref('20.04.2026');
const location = ref('Grand Wedding Hall, Saigon');

// Fallback images if none provided in query (just for demo)
const albumImages = ref([
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg1,
  defaultImg2,
  defaultImg3,
]);

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const reveals = document.querySelectorAll('.reveal-init');
  
  reveals.forEach((el, index) => {
    gsap.fromTo(el, 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        delay: (index % 3) * 0.1,
      },
    );
  });
});
</script>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

@keyframes entrance {
  from { opacity: 0; transform: translateY(40px) scale(1.05); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.animate-entrance {
  animation: entrance 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.photo-card {
  will-change: transform, opacity;
}

/* Smooth parallax-ish scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
