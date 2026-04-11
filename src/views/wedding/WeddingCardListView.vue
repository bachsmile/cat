<template>
  <div class="min-h-screen bg-[#050507] text-white p-10 md:p-20 font-inter">
    <!-- 🌠 Ambient Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-10%] right-[10%] w-[50vw] h-[50vw] bg-rose-500/10 blur-[120px] rounded-full"></div>
      <div class="absolute bottom-[-10%] left-[10%] w-[40vw] h-[40vw] bg-purple-500/5 blur-[100px] rounded-full"></div>
    </div>

    <div class="max-w-[1400px] mx-auto relative z-10">
      <!-- Header -->
      <header class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div class="text-left">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Mail class="text-white w-6 h-6" />
            </div>
            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">Thiết kế thiệp cưới điện tử</span>
          </div>
          <h1 class="text-5xl font-black tracking-tighter italic uppercase text-white">
            Mẫu thiệp <span class="text-rose-500 italic">độc quyền</span>
          </h1>
          <p class="text-gray-500 font-medium mt-4 max-w-xl leading-relaxed">
            Khám phá bộ sưu tập các mẫu thiệp cưới phong cách hiện đại, tinh tế và đầy cảm hứng. Chỉnh sửa dễ dàng chỉ với vài bước đơn giản.
          </p>
        </div>
        
        <div class="flex items-center gap-4">
          <button 
            @click="router.back()"
            class="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
          >
            Quay lại
          </button>
          <button 
             @click="createNewTemplate"
             class="px-10 py-4 rounded-2xl bg-rose-500 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            Tạo mẫu mới
          </button>
        </div>
      </header>

      <!-- Template Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <!-- Create New Placeholder -->
        <div 
          @click="createNewTemplate"
          class="aspect-[3/4] rounded-[40px] border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center group cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/5 transition-all duration-500"
        >
          <div class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:border-rose-500 transition-all duration-500">
            <Plus class="w-8 h-8 text-white" />
          </div>
          <p class="text-lg font-bold text-white uppercase tracking-widest">Bắt đầu từ trống</p>
          <p class="text-xs text-gray-500 mt-2 font-medium">Tự do thiết kế theo ý muốn của bạn</p>
        </div>

        <!-- Static Templates -->
        <div 
          v-for="template in templates" 
          :key="template.id"
          class="group relative aspect-[3/4] rounded-[40px] overflow-hidden cursor-pointer"
          @click="selectTemplate(template)"
        >
          <img :src="template.preview" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-10 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <div class="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              <span v-for="tag in template.tags" :key="tag" class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-gray-300">
                {{ tag }}
              </span>
            </div>
            <h3 class="text-2xl font-black text-white italic tracking-tight uppercase">{{ template.name }}</h3>
            <p class="text-gray-400 text-xs font-medium mt-2 opacity-60 group-hover:opacity-100 transition-opacity">{{ template.desc }}</p>
            
            <div class="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700 delay-200">
              <span class="text-rose-500 text-[10px] font-black uppercase tracking-widest">Sử dụng mẫu này</span>
              <div class="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <ArrowRight class="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Mail, Plus, ArrowRight } from "lucide-vue-next";

// Placeholder images
import wd1 from "@/assets/images/wd1.jpg";
import wd2 from "@/assets/images/wd2.jpg";
import nt4 from "@/assets/images/nt4.jpg";

const router = useRouter();

const templates = ref([
  {
    id: "classic-gold",
    name: "Classic Gold Royale",
    desc: "Vẻ đẹp cổ điển với viền vàng kim sang trọng và phông chữ Serif tinh tế.",
    preview: wd1,
    tags: ["Luxury", "Classic", "Serif"]
  },
  {
    id: "modern-minimal",
    name: "Modern Minimalist",
    desc: "Phong cách tối giản, tập trung vào khoảnh khắc yêu thương và khoảng trắng.",
    preview: wd2,
    tags: ["Minimal", "Modern", "Sans"]
  },
  {
    id: "vintage-rose",
    name: "Vintage Soft Rose",
    desc: "Tông màu hồng tro lãng mạn kết hợp cùng họa tiết hoa lá vẽ tay.",
    preview: nt4,
    tags: ["Vintage", "Floral", "Romantic"]
  }
]);

const createNewTemplate = () => {
    router.push({ name: 'WeddingCardEditor', query: { template: 'blank' } });
};

const selectTemplate = (template: any) => {
    router.push({ name: 'WeddingCardEditor', query: { template: template.id } });
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
