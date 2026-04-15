<template>
  <div
    class="min-h-screen bg-[#050507] flex items-center justify-center relative overflow-hidden"
  >
    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center gap-6">
      <div
        class="w-12 h-12 border-4 border-rose-800 border-t-rose-400 rounded-full animate-spin"
      ></div>
      <p class="text-rose-400 text-[10px] font-black uppercase tracking-widest">
        Đang tải thiệp mời...
      </p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center p-12">
      <div
        class="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mx-auto mb-6"
      >
        <AlertCircle :size="32" class="text-red-400" />
      </div>
      <h2 class="text-xl font-black text-white uppercase tracking-tighter mb-2">
        Không tìm thấy thiệp
      </h2>
      <p class="text-rose-400/60 text-sm">{{ error }}</p>
    </div>

    <!-- Invitation -->
    <template v-else-if="data">
      <!-- Personalized greeting overlay -->
      <div
        v-if="showGreeting"
        class="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-xl"
        @click="showGreeting = false"
      >
        <div class="text-center animate-entrance p-12">
          <p
            class="text-[10px] font-black text-rose-400 uppercase tracking-[0.5em] mb-6"
          >
            Thiệp mời dành cho
          </p>
          <h1
            class="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4"
          >
            {{ data.guest.name }}
          </h1>
          <div class="h-px w-20 bg-rose-500/40 mx-auto mb-6"></div>
          <p
            class="text-rose-300/60 text-xs font-bold uppercase tracking-widest mb-12"
          >
            Chạm để xem thiệp
          </p>
          <div
            class="w-8 h-8 rounded-full border-2 border-rose-500/30 flex items-center justify-center mx-auto animate-bounce"
          >
            <ChevronDown :size="16" class="text-rose-400" />
          </div>
        </div>
      </div>

      <!-- Full-screen template -->
      <div class="w-full h-screen">
        <WeddingElegantTemplate
          v-if="data.templateId === 'elegant'"
          :weddingData="enrichedData"
          :formatDate="formatDate"
          :isPreview="false"
        />
        <WeddingBookTemplate
          v-else
          :weddingData="enrichedData"
          :formatDate="formatDate"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AlertCircle, ChevronDown } from "lucide-vue-next";
import WeddingElegantTemplate from "./templates/WeddingElegantTemplate.vue";
import WeddingBookTemplate from "./templates/WeddingBookTemplate.vue";
import api from "@/api/client";

const route = useRoute();
const loading = ref(true);
const error = ref("");
const data = ref<any>(null);
const showGreeting = ref(true);

const enrichedData = computed(() => {
  if (!data.value) return {};
  const wd = data.value.weddingData || {};
  return {
    ...wd,
    // Map to template expected fields
    date: wd.ceremonyDate || wd.date || "",
    time: wd.ceremonyTime || wd.time || "",
    location: wd.address || wd.location || "",
    mapUrl: wd.address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(wd.address)}&output=embed&z=15`
      : "",
    title: "WEDDING INVITATION",
    envelopeText: `Kính mời ${data.value.guest.name}`,
    envelopeColor: "#8B1E3F",
    invitationText: `Trân trọng kính mời ${data.value.guest.name} đến dự tiệc chung vui cùng gia đình chúng tôi.`,
    qrInfo: wd.qrPaymentUrl ? "Mừng hạnh phúc" : "",
  };
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};

onMounted(async () => {
  const code = route.params.code as string;
  if (!code) {
    error.value = "Thiếu mã thiệp mời";
    loading.value = false;
    return;
  }

  try {
    const res = await api.get(`/wedding/invitation/${code}`);
    data.value = res.data;
  } catch (e: any) {
    error.value =
      e?.response?.data?.message || "Thiệp mời không hợp lệ hoặc chưa sẵn sàng";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.animate-entrance {
  animation: entrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes entrance {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
