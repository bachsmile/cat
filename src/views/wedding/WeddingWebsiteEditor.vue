<template>
  <div class="space-y-8 animate-in fade-in duration-700">
    <!-- Theme Selection Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-2xl font-black text-white italic tracking-tighter">THIẾT KẾ WEBSITE ĐÁM CƯỚI</h3>
        <p class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-2">Chọn giao diện và cá nhân hóa ngày vui của bạn</p>
      </div>
      <div class="flex gap-4">
        <button 
           @click="viewMode = 'themes'"
           class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
           :class="viewMode === 'themes' ? 'bg-pink-600 text-white shadow-xl shadow-pink-500/20' : 'bg-white/5 text-gray-400 hover:text-white'"
        >
          Kho Giao Diện
        </button>
        <button 
           @click="viewMode = 'editor'"
           class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
           :class="viewMode === 'editor' ? 'bg-pink-600 text-white shadow-xl shadow-pink-500/20' : 'bg-white/5 text-gray-400 hover:text-white'"
        >
          Trình Chỉnh Sửa
        </button>
      </div>
    </div>

    <!-- 1. THEME GALLERY -->
    <div v-if="viewMode === 'themes'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <CgCard 
        v-for="theme in THEMES" 
        :key="theme.id"
        type="grain-frost"
        class="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-pink-500/30 transition-all duration-500"
        @click="selectTheme(theme)"
      >
        <div class="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 bg-center bg-cover" :style="{ backgroundImage: `url(${theme.preview})` }"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
        
        <div class="absolute inset-0 p-8 flex flex-col justify-end">
          <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span class="px-3 py-1 bg-pink-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-4 inline-block">Theme: {{ theme.style }}</span>
            <h4 class="text-2xl font-black text-white italic tracking-tighter mb-2">{{ theme.name }}</h4>
            <p class="text-xs text-gray-400 line-clamp-2 mb-6 font-medium leading-relaxed">{{ theme.desc }}</p>
            
            <button class="w-full py-4 bg-white/10 group-hover:bg-pink-600 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all">
              Sử dụng theme này
            </button>
          </div>
        </div>

        <!-- Featured Tag -->
        <div v-if="theme.featured" class="absolute top-6 right-6 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-lg">
          <span class="text-[8px] font-black text-amber-500 uppercase tracking-widest">Premium Choice</span>
        </div>
      </CgCard>
    </div>

    <!-- 2. LIVE EDITOR -->
    <div v-else-if="viewMode === 'editor'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Config side -->
      <div class="lg:col-span-4 space-y-6">
        <CgCard type="heavy-frost" class="p-8 rounded-[2.5rem] border border-white/5">
          <h4 class="text-lg font-bold text-white mb-8 italic flex items-center gap-3">
             <SettingsIcon class="w-5 h-5 text-pink-400" />
             Thông tin cơ bản
          </h4>
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Tên Chú rể & Cô dâu</label>
              <div class="grid grid-cols-2 gap-3">
                <input v-model="weddingData.groom" type="text" placeholder="Chú rể" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-pink-500/50 text-white" />
                <input v-model="weddingData.bride" type="text" placeholder="Cô dâu" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-pink-500/50 text-white" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Ngày diễn ra</label>
              <input v-model="weddingData.date" type="datetime-local" class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-pink-500/50 text-white" />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Lời ngỏ</label>
              <textarea v-model="weddingData.message" rows="3" placeholder="Gửi lời mời chân thành đến khách..." class="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-pink-500/50 text-white resize-none"></textarea>
            </div>

            <div class="space-y-4 pt-4 border-t border-white/5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Hình ảnh Album ({{ weddingData.images.length }})</label>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="(img, idx) in weddingData.images" :key="idx" class="aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden relative group">
                  <img :src="img" class="w-full h-full object-cover" />
                  <button @click="removeImage(idx)" class="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
                <label v-if="weddingData.images.length < 6" class="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-pink-500/50 flex flex-col items-center justify-center cursor-pointer transition-all group">
                  <PlusIcon class="w-5 h-5 text-gray-500 group-hover:text-pink-400 group-hover:scale-110 transition-all" />
                  <input type="file" @change="handleUpload" hidden multiple accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        </CgCard>

        <button @click="publishWebsite" class="w-full py-5 bg-pink-600 hover:bg-pink-700 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-pink-500/20 transition-all active:scale-95 flex items-center justify-center gap-3">
          <GlobeIcon class="w-5 h-5" />
          Xuất bản Website
        </button>
      </div>

      <!-- Right Preview side -->
      <div class="lg:col-span-8 sticky top-30">
        <CgCard type="heavy-frost" class="rounded-[3rem] border border-white/5 overflow-hidden p-0 h-[800px] flex flex-col shadow-2xl shadow-pink-500/10">
          <!-- Browser Top bar -->
          <div class="h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2 shrink-0">
            <div class="flex gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
            <div class="flex-1 text-center">
              <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest opacity-50">{{ weddingUrl }}</span>
            </div>
          </div>

          <!-- The Live Preview Render -->
          <div class="flex-1 overflow-y-auto relative bg-[#fdfaf8] text-[#1a1c3d]" :style="{ fontFamily: selectedTheme?.font || 'inherit' }">
             <div v-if="!selectedTheme" class="h-full flex flex-col items-center justify-center p-12 text-center opacity-30">
               <LayersIcon class="w-20 h-20 mb-6 text-pink-500 animate-pulse" />
               <h5 class="text-xl font-black uppercase italic">Vui lòng chọn giao diện để xem trước</h5>
             </div>

             <div v-else class="min-h-full animate-in fade-in zoom-in-95 duration-700">
                <!-- Theme Layout Engine -->
                <div :class="['relative min-h-[500px] flex items-center justify-center overflow-hidden', selectedTheme.heroClass]">
                  <div class="absolute inset-0 z-0">
                    <img :src="weddingData.images[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80\u0026w=2070'" class="w-full h-full object-cover opacity-60 grayscale-[0.3]" />
                  </div>
                  <div class="relative z-10 text-center space-y-4 p-8">
                     <span class="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/30">Lễ Thành Hôn</span>
                     <h2 class="text-6xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                        {{ weddingData.groom || "Hải Nam" }} <span class="text-pink-400">&</span> {{ weddingData.bride || "Quỳnh Mai" }}
                     </h2>
                     <p class="text-sm font-medium text-white/80 uppercase tracking-[0.4em]">{{ formattedDate }}</p>
                     
                     <!-- COUNTDOWN COMPONENT -->
                     <div class="mt-12 flex items-center justify-center gap-6">
                        <div v-for="(val, label) in countdown" :key="label" class="flex flex-col items-center">
                           <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-2xl font-black italic shadow-2xl">
                              {{ val }}
                           </div>
                           <span class="text-[9px] font-black text-white/60 uppercase tracking-widest mt-2">{{ label }}</span>
                        </div>
                     </div>
                  </div>
                </div>

                <!-- Invite Message -->
                <div class="py-20 px-8 text-center max-w-2xl mx-auto space-y-6">
                   <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-xl shadow-pink-500/10">
                      <HeartIcon class="w-6 h-6 fill-current" />
                   </div>
                   <h3 class="text-2xl font-black italic">Lời Ngỏ Của Lứa Đôi</h3>
                   <p class="text-sm leading-relaxed text-gray-500 italic font-medium">
                      {{ weddingData.message || "Chào đón bạn đến với ngày vui quan trọng nhất trong cuộc đời của chúng tôi. Sự hiện diện của bạn là món quà quý giá nhất mà chúng tôi mong nhận được..." }}
                   </p>
                </div>

                <!-- Album Component -->
                <div class="bg-white py-20 px-4 md:px-12">
                   <h3 class="text-xl font-black text-center uppercase tracking-[0.3em] mb-12">Dòng ký sự tình yêu</h3>
                   <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                      <div v-for="(img, i) in (weddingData.images.length ? weddingData.images : DUMMY_IMAGES)" :key="i" class="break-inside-avoid rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500 cursor-zoom-in group relative">
                         <img :src="img" class="w-full h-auto" />
                         <div class="absolute inset-0 bg-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                   </div>
                </div>

                <!-- Global Firework Canvas Overlay -->
                <canvas v-if="isFireworksActive" ref="fireworkCanvas" class="fixed inset-0 z-[1000] pointer-events-none"></canvas>
             </div>
          </div>
        </CgCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { 
  Settings as SettingsIcon, 
  Trash2 as TrashIcon, 
  Plus as PlusIcon, 
  Globe as GlobeIcon,
  Layers as LayersIcon,
  Heart as HeartIcon
} from 'lucide-vue-next';
import { CgCard } from 'glass-studio-ui-pro';

const viewMode = ref<'themes' | 'editor'>('themes');
const selectedTheme = ref<any>(null);
const weddingUrl = ref('nguyenvietanh.net/wedding/hai-nam-quynh-mai');

const THEMES = [
  { 
    id: 1, 
    name: 'Antique Gold', 
    style: 'Luxury', 
    desc: 'Thiết kế cổ điển với tông màu vàng đồng rực rỡ và họa tiết cung đình sang trọng.',
    preview: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80\u0026w=1742',
    font: "'Playfair Display', serif",
    heroClass: 'bg-amber-900',
    featured: true
  },
  { 
    id: 2, 
    name: 'Modern Minimalist', 
    style: 'Clean', 
    desc: 'Sự tối giản tinh tế, tập trung vào hình ảnh và font chữ thanh mảnh hiện đại.',
    preview: 'https://images.unsplash.com/photo-1460364154851-61917c066e4c?q=80\u0026w=1740',
    font: "'Inter', sans-serif",
    heroClass: 'bg-slate-100'
  },
  { 
    id: 3, 
    name: 'Floral Dream', 
    style: 'Romantic', 
    desc: 'Tràn ngập hoa lá và các hiệu ứng bay bổng dành cho những buổi lễ lãng mạn.',
    preview: 'https://images.unsplash.com/photo-1549419105-09d57a220265?q=80\u0026w=1740',
    font: "'Poppins', sans-serif",
    heroClass: 'bg-rose-50'
  }
];

const DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80\u0026w=1887',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80\u0026w=1740',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80\u0026w=1740',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80\u0026w=1738',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80\u0026w=1740',
  'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80\u0026w=1744'
];

const weddingData = ref({
  groom: '',
  bride: '',
  date: '',
  message: '',
  images: [] as string[]
});

const selectTheme = (theme: any) => {
  selectedTheme.value = theme;
  viewMode.value = 'editor';
};

const handleUpload = (e: any) => {
  const files = Array.from(e.target.files);
  files.forEach((file: any) => {
    const reader = new FileReader();
    reader.onload = (res) => {
      if (typeof res.target?.result === 'string') {
        weddingData.value.images.push(res.target.result);
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (idx: number) => {
  weddingData.value.images.splice(idx, 1);
};

const countdown = ref({
   Ngày: 0,
   Giờ: 0,
   Phút: 0,
   Giây: 0
});

const formattedDate = computed(() => {
   if (!weddingData.value.date) return '25 / 12 / 2026';
   return new Date(weddingData.value.date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
   }).split('/').join(' / ');
});

const publishWebsite = () => {
   alert('Website đã được xuất bản thành công tại: ' + weddingUrl.value);
};

// --- FIREWORKS LOGIC ---
const isFireworksActive = ref(false);
const fireworkCanvas = ref<HTMLCanvasElement | null>(null);
let timerInterval: any;

const updateCountdown = () => {
   if (!weddingData.value.date) return;
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
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
         }
         update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;
            this.alpha -= 0.01;
         }
      }

      let particles: Particle[] = [];
      const colors = ['#ff0055', '#efff00', '#00ff44', '#00d0ff', '#ff00ff'];

      const burst = () => {
         const x = Math.random() * canvas.width;
         const y = Math.random() * canvas.height * 0.5;
         const color = colors[Math.floor(Math.random() * colors.length)] || '#ffffff';
         for (let i = 0; i < 40; i++) {
            particles.push(new Particle(x, y, color));
         }
      };

      const animate = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         if (Math.random() < 0.1) burst();
         particles = particles.filter(p => p.alpha > 0);
         particles.forEach(p => {
            p.update();
            p.draw();
         });
         requestAnimationFrame(animate);
      };
      animate();
   }, 100);
};

onMounted(() => {
   timerInterval = setInterval(updateCountdown, 1000);
   // If user set a date in the past for testing:
   watch(() => weddingData.value.date, () => {
      isFireworksActive.value = false;
      updateCountdown();
   });
});

onUnmounted(() => {
   clearInterval(timerInterval);
});
</script>

<style scoped>
.animate-in {
  animation-fill-mode: forwards;
}
.fade-in {
  animation: fade-in 0.8s ease-out;
}
.zoom-in-95 {
  animation: zoom-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes zoom-in { 
   from { opacity: 0; transform: scale(0.95) translateY(20px); } 
   to { opacity: 1; transform: scale(1) translateY(0); } 
}

.bg-amber-900 {
  background: linear-gradient(135deg, #451a03 0%, #1a1c3d 100%);
}
.bg-rose-50 {
  background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
}

.animate-spin-slow {
   animation: spin 8s linear infinite;
}
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Custom Scrollbar for the preview iframe-like area */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
