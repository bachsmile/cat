<template>
  <div class="h-screen w-full relative">
     <!-- Back Button -->
    <button 
      @click="router.back()"
      class="fixed top-10 right-10 z-[1000] p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-2 group backdrop-blur-xl"
    >
      <X class="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
      <span class="text-[10px] font-black uppercase tracking-widest mr-2">Thoát Xem Thử</span>
    </button>

    <!-- Template Switcher -->
    <component 
      :is="templates[selectedTemplate]" 
      :wedding-data="data" 
      :format-date="formatDate" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { X } from "lucide-vue-next";
import WeddingBookTemplate from "./templates/WeddingBookTemplate.vue";
import WeddingElegantTemplate from "./templates/WeddingElegantTemplate.vue";

const router = useRouter();
const route = useRoute();

const templates: Record<string, any> = {
    'classic-gold': WeddingBookTemplate,
    'elegant-suite': WeddingElegantTemplate,
    'blank': WeddingBookTemplate,
    'default': WeddingBookTemplate
};

const selectedTemplate = computed(() => {
    const t = route.query.template as string || data.value.template || 'default';
    return templates[t] ? t : 'default';
});

const data = ref(JSON.parse(localStorage.getItem("latest_wedding_card") || "{}"));

const formatDate = (dateStr: string) => {
  if (!dateStr) return "Ngày 00 Tháng 00 Năm 2026";
  const d = new Date(dateStr);
  return `Ngày ${d.getDate()} Tháng ${d.getMonth() + 1} Năm ${d.getFullYear()}`;
};

onMounted(() => {
    if (!data.value.title) {
        data.value = {
            title: "Lễ Thành Hôn",
            groomName: "Mạnh Hùng",
            brideName: "Thùy Chi",
            envelopeText: "Thân mời bạn & Gia đình",
            date: "2026-05-20",
            time: "18:00",
            location: "Riverside Palace, Quận 4, TP.HCM",
            invitationText: "Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình.",
            groomParents: "Ông Cao Mạnh Thăng & Bà Trần Thu Hà",
            brideParents: "Ông Lê Gia Khiêm & Bà Ngô Phương Thúy",
            template: route.query.template || 'classic-gold'
        };
    }
});
</script>
