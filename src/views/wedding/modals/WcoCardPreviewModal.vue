<template>
  <CnModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    title=""
    width="600px"
    color="slate"
    :showClose="false"
  >
    <div class="relative overflow-hidden" style="height: 80vh;">
      <!-- Close Button -->
      <button @click="emit('update:modelValue', false)"
        class="absolute top-4 right-4 z-[200] w-10 h-10 rounded-full bg-black/50 backdrop-blur-xl text-white/70 hover:text-white flex items-center justify-center transition-all hover:bg-black/70">
        <X :size="18" />
      </button>

      <!-- Template Label -->
      <div class="absolute top-4 left-4 z-[200] flex items-center gap-2">
        <div class="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
          <span class="text-[9px] font-black text-white/70 uppercase tracking-widest">{{ templateLabel }}</span>
        </div>
      </div>

      <!-- Template Content -->
      <div class="w-full h-full bg-[#050507] rounded-xl overflow-hidden">
        <WeddingElegantTemplate
          v-if="templateId === 'elegant'"
          :weddingData="previewData"
          :formatDate="formatDate"
          :isPreview="true"
        />
        <WeddingBookTemplate
          v-else-if="templateId === 'classic' || templateId === 'royal'"
          :weddingData="previewData"
          :formatDate="formatDate"
        />
        <WeddingElegantTemplate
          v-else
          :weddingData="previewData"
          :formatDate="formatDate"
          :isPreview="true"
        />
      </div>
    </div>
  </CnModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { X } from 'lucide-vue-next';
import { CnModal } from 'glass-studio-ui-pro';
import WeddingElegantTemplate from '../templates/WeddingElegantTemplate.vue';
import WeddingBookTemplate from '../templates/WeddingBookTemplate.vue';

const props = defineProps<{
  modelValue: boolean;
  templateId: string;
  weddingData?: any;
}>();

const emit = defineEmits(['update:modelValue']);

const TEMPLATE_NAMES: Record<string, string> = {
  elegant: 'Hạnh Phúc — Elegant',
  classic: 'Sắc Hồng — Classic Book',
  royal: 'Hoàng Gia — Royal Book',
};

const templateLabel = computed(() => TEMPLATE_NAMES[props.templateId] || 'Xem trước');

const SAMPLE_DATA = {
  groomName: 'Thành Vinh',
  brideName: 'Thanh Thanh',
  groomParents: 'Ông: Lâm Văn A & Bà: Nguyễn Thị B',
  brideParents: 'Ông: Trần Văn C & Bà: Lê Thị D',
  date: '2026-11-15',
  time: '10:30',
  ceremonyDate: '2026-11-15',
  ceremonyTime: '09:00',
  partyDate: '2026-11-15',
  partyTime: '17:30',
  location: 'Nhà hàng White Palace, 588 Phạm Văn Đồng, Thủ Đức, TP.HCM',
  address: 'Nhà hàng White Palace, 588 Phạm Văn Đồng, Thủ Đức, TP.HCM',
  qrInfo: 'Mừng hạnh phúc cho hai chúng mình!',
  qrPaymentUrl: '',
  mapUrl: '',
  title: 'WEDDING INVITATION',
  envelopeText: 'Thân mời bạn',
  envelopeColor: '#8B1E3F',
  invitationText: 'Trân trọng kính mời quý khách đến dự tiệc chung vui cùng gia đình chúng tôi.',
};

const previewData = computed(() => {
  if (!props.weddingData) return SAMPLE_DATA;
  const userData = props.weddingData;
  return {
    ...SAMPLE_DATA,
    groomName: userData.groomName || SAMPLE_DATA.groomName,
    brideName: userData.brideName || SAMPLE_DATA.brideName,
    groomParents: userData.groomParents || SAMPLE_DATA.groomParents,
    brideParents: userData.brideParents || SAMPLE_DATA.brideParents,
    date: userData.ceremonyDate || userData.date || SAMPLE_DATA.date,
    time: userData.ceremonyTime || userData.time || SAMPLE_DATA.time,
    ceremonyDate: userData.ceremonyDate || SAMPLE_DATA.ceremonyDate,
    ceremonyTime: userData.ceremonyTime || SAMPLE_DATA.ceremonyTime,
    partyDate: userData.partyDate || SAMPLE_DATA.partyDate,
    partyTime: userData.partyTime || SAMPLE_DATA.partyTime,
    location: userData.address || userData.location || SAMPLE_DATA.location,
    address: userData.address || SAMPLE_DATA.address,
    qrPaymentUrl: userData.qrPaymentUrl || SAMPLE_DATA.qrPaymentUrl,
    mapUrl: userData.address
      ? `https://maps.google.com/maps?q=${encodeURIComponent(userData.address)}&output=embed&z=15`
      : '',
  };
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};
</script>
