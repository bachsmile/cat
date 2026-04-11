<template>
  <div class="min-h-screen bg-[#fdfaf8] text-[#1a1c3d] overflow-x-hidden selection:bg-pink-100 selection:text-pink-600" :style="{ fontFamily: theme?.font || 'inherit' }">
    <!-- Theme Layout Engine -->
    <div :class="['relative min-h-screen flex items-center justify-center overflow-hidden', theme?.heroClass]">
      <div class="absolute inset-0 z-0">
        <img :src="weddingData.images[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070'" class="w-full h-full object-cover opacity-60 grayscale-[0.3]" />
      </div>
      <div class="relative z-10 text-center space-y-6 p-8 animate-in fade-in zoom-in-95 duration-1000">
         <span class="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-[0.4em] text-white border border-white/30">Lễ Thành Hôn</span>
         <h1 class="text-7xl md:text-9xl font-black italic tracking-tighter text-white drop-shadow-2xl">
            {{ weddingData.groom || "Hải Nam" }} <span class="text-pink-400">&</span> {{ weddingData.bride || "Quỳnh Mai" }}
         </h1>
         <p class="text-lg font-medium text-white/90 uppercase tracking-[0.5em]">{{ formattedDate }}</p>
         
         <!-- COUNTDOWN COMPONENT -->
         <div class="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div v-for="(val, label) in countdown" :key="label" class="flex flex-col items-center group">
               <div class="w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white text-3xl md:text-5xl font-black italic shadow-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                  {{ val }}
               </div>
               <span class="text-[10px] md:text-xs font-black text-white uppercase tracking-widest mt-4">{{ label }}</span>
            </div>
         </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
         <ArrowDownIcon class="w-6 h-6 text-white opacity-50" />
      </div>
    </div>

    <!-- Invite Message -->
    <div class="py-32 px-8 text-center max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
       <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-xl shadow-pink-500/10">
          <HeartIcon class="w-8 h-8 fill-current" />
       </div>
       <h2 class="text-4xl font-black italic">Lời Ngỏ Của Lứa Đôi</h2>
       <p class="text-lg leading-relaxed text-gray-500 italic font-medium px-4 md:px-0">
          {{ weddingData.message || "Chào đón bạn đến với ngày vui quan trọng nhất trong cuộc đời của chúng tôi. Sự hiện diện của bạn là món quà quý giá nhất mà chúng tôi mong nhận được. Chúng tôi chân thành cảm ơn tình cảm và sự hiện diện của bạn." }}
       </p>
    </div>

    <!-- Album Component -->
    <div class="bg-white py-32 px-4 md:px-20 lg:px-40">
       <div class="text-center mb-20 space-y-4">
          <h2 class="text-3xl font-black uppercase tracking-[0.4em]">Bộ Sưu Tập Tình Yêu</h2>
          <div class="w-24 h-1 bg-pink-500 mx-auto rounded-full"></div>
       </div>
       
       <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <div v-for="(img, i) in (weddingData.images.length ? weddingData.images : DUMMY_IMAGES)" :key="i" class="break-inside-avoid rounded-[2.5rem] overflow-hidden shadow-2xl hover:scale-[1.02] transition-all duration-700 cursor-zoom-in group relative border border-gray-100">
             <img :src="img" class="w-full h-auto" />
             <div class="absolute inset-0 bg-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <HeartIcon class="w-10 h-10 text-white fill-current opacity-50 scale-150 transition-transform duration-700 group-hover:scale-100" />
             </div>
          </div>
       </div>
    </div>

    <!-- Footer -->
    <footer class="py-20 bg-[#050507] text-white text-center">
       <h3 class="text-2xl font-black italic tracking-tighter mb-4">Mãi mãi một tình yêu</h3>
       <p class="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">Cảm ơn bạn đã tham gia cùng chúng tôi</p>
    </footer>

    <!-- Global Firework Canvas Overlay -->
    <canvas v-if="isFireworksActive" ref="fireworkCanvas" class="fixed inset-0 z-[1000] pointer-events-none"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Heart as HeartIcon, 
  ArrowDown as ArrowDownIcon
} from 'lucide-vue-next';

// In a real app, you'd fetch by ID. Here we use dummy logic or local storage.
const route = useRoute();
const weddingId = route.params.id;

const THEMES = [
  { id: 1, font: "'Playfair Display', serif", heroClass: 'bg-amber-900' },
  { id: 2, font: "'Inter', sans-serif", heroClass: 'bg-slate-100' },
  { id: 3, font: "'Poppins', sans-serif", heroClass: 'bg-rose-50' }
];

const theme = ref(THEMES[0]);
const weddingData = ref({
  groom: 'Hải Nam',
  bride: 'Quỳnh Mai',
  date: '2026-12-25T18:00',
  message: '',
  images: [] as string[]
});

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1740',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1740',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1738',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1740',
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1744'
];

const countdown = ref({ Ngày: 0, Giờ: 0, Phút: 0, Giây: 0 });

const formattedDate = computed(() => {
   return new Date(weddingData.value.date).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
   }).split('/').join(' / ');
});

// --- FIREWORKS LOGIC ---
const isFireworksActive = ref(false);
const fireworkCanvas = ref<HTMLCanvasElement | null>(null);
let timerInterval: any;

const updateCountdown = () => {
   const diff = new Date(weddingData.value.date).getTime() - Date.now();
   if (diff <= 0) {
      countdown.value = { Ngày: 0, Giờ: 0, Phút: 0, Giây: 0 };
      if (!isFireworksActive.value) {
         isFireworksActive.value = true;
         startFireworks();
      }
      return;
   }
   countdown.value = {
      Ngày: Math.floor(diff / (1000 * 60 * 60 * 24)),
      Giờ: Math.floor((diff / (1000 * 60 * 60)) % 24),
      Phút: Math.floor((diff / (1000 * 60)) % 60),
      Giây: Math.floor((diff / 1000) % 60)
   };
};

const startFireworks = () => {
   setTimeout(() => {
      const canvas = fireworkCanvas.value;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      class Particle {
         x: number; y: number; vx: number; vy: number; radius: number; alpha: number; color: string;
         constructor(x: number, y: number, color: string) {
            this.x = x; this.y = y;
            this.vx = (Math.random() - 0.5) * 8;
            this.vy = (Math.random() - 0.5) * 8;
            this.radius = Math.random() * 2 + 1;
            this.alpha = 1;
            this.color = color;
         }
         draw() {
            if (!ctx) return;
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
         }
         update() { this.x += this.vx; this.y += this.vy; this.vy += 0.05; this.alpha -= 0.01; }
      }

      let particles: Particle[] = [];
      const colors = ['#ff0055', '#efff00', '#00ff44', '#00d0ff', '#ff00ff'];
      const animate = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         if (Math.random() < 0.1) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)] || '#fff';
            for (let i = 0; i < 40; i++) particles.push(new Particle(x, y, color));
         }
         particles = particles.filter(p => p.alpha > 0);
         particles.forEach(p => { p.update(); p.draw(); });
         requestAnimationFrame(animate);
      };
      animate();
   }, 100);
};

onMounted(() => {
   // Try to load from localStorage if it matches our ID
   const saved = localStorage.getItem(`wedding_site_${weddingId}`);
   if (saved) {
      const parsed = JSON.parse(saved);
      weddingData.value = parsed.data;
      theme.value = THEMES.find(t => t.id === parsed.themeId) || THEMES[0];
   }
   timerInterval = setInterval(updateCountdown, 1000);
   updateCountdown();
});

onUnmounted(() => { clearInterval(timerInterval); });
</script>

<style scoped>
.bg-amber-900 { background: linear-gradient(135deg, #451a03 0%, #1a1c3d 100%); }
.bg-rose-50 { background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%); }

.animate-in { animation-fill-mode: forwards; }
.fade-in { animation: fade-in 1.2s ease-out forwards; }
.slide-in-from-bottom-8 { animation: slide-in 1s ease-out forwards; }
.zoom-in-95 { animation: zoom-in 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
@keyframes zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
