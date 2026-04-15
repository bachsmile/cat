<template>
  <CnModal
    :model-value="modelValue"
    @update:model-value="handleClose"
    title=""
    width="1200px"
    color="rose"
    :showClose="false"
  >
    <div class="wco-container relative min-h-[750px] flex flex-col overflow-hidden">
      <!-- Ambient -->
      <div class="absolute -top-24 -left-24 w-80 h-80 bg-rose-400/20 blur-[100px] rounded-full"></div>
      <div class="absolute top-1/2 -right-32 w-96 h-96 bg-pink-300/10 blur-[130px] rounded-full"></div>

      <!-- Stepper (visible after plan selection) -->
      <div v-if="step !== 'plan' && step !== 'success'" class="px-12 pt-8 pb-0 relative z-10">
        <div class="flex items-center justify-center gap-2">
          <div v-for="(s, i) in stepLabels" :key="i" class="flex items-center gap-2">
            <div class="flex flex-col items-center gap-1.5">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all"
                :class="stepIndex >= i ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/60 text-rose-200 border border-rose-100'">
                <CheckCircle2 v-if="stepIndex > i" :size="18" />
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-[8px] font-black uppercase tracking-widest" :class="stepIndex >= i ? 'text-rose-600' : 'text-rose-300'">{{ s }}</span>
            </div>
            <div v-if="i < stepLabels.length - 1" class="w-12 h-px mb-5" :class="stepIndex > i ? 'bg-rose-400' : 'bg-rose-100'"></div>
          </div>
        </div>
      </div>

      <!-- PLAN SELECTION -->
      <template v-if="step === 'plan'">
        <div class="relative z-10 px-12 pt-12 text-center">
          <h2 class="text-3xl font-black italic tracking-tighter uppercase text-rose-950">
            Chọn <span class="text-rose-600">Gói Dịch Vụ</span>
          </h2>
          <p class="text-rose-400 mt-3 font-bold text-[10px] uppercase tracking-[0.4em]">Chọn gói phù hợp trước khi thiết kế thiệp</p>
        </div>
        <div class="flex-1 px-12 pb-12 relative z-10 overflow-y-auto wco-scroll mt-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div class="group p-8 rounded-[3rem] bg-white/40 border border-white/60 backdrop-blur-2xl transition-all shadow-sm hover:shadow-xl hover:bg-white/60 cursor-pointer"
              @click="selectPlan('single_card', 'Thiệp Cưới Đơn')">
              <div class="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                <Layout class="w-7 h-7" />
              </div>
              <h3 class="text-xl font-black text-rose-950 uppercase italic tracking-tighter">Thiệp Cưới Đơn</h3>
              <p class="text-rose-400/60 text-[10px] font-bold mt-2 leading-relaxed">Đặt thiệp mời theo số lượng, chọn mẫu và nhập thông tin cá nhân.</p>
              <div class="mt-6 flex items-baseline gap-2">
                <span class="text-lg font-black text-rose-600">Từ 500đ</span>
                <span class="text-[9px] font-bold text-rose-300 uppercase">/ thiệp</span>
              </div>
              <div class="mt-6 w-full h-12 bg-rose-500 text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-lg group-hover:bg-rose-600 transition-colors">Chọn gói này</div>
            </div>
            <div class="group p-8 rounded-[3rem] bg-rose-950 border border-rose-800 transition-all shadow-sm hover:shadow-xl cursor-pointer"
              @click="selectPlan('combo_card', 'Gói Combo Thiệp')">
              <div class="w-14 h-14 rounded-2xl bg-rose-800 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles class="w-7 h-7" />
              </div>
              <h3 class="text-xl font-black text-white uppercase italic tracking-tighter">Gói Combo Thiệp</h3>
              <p class="text-rose-300/50 text-[10px] font-bold mt-2 leading-relaxed">Bao gồm thiệp mời + website cưới + quản lý khách mời toàn diện.</p>
              <div class="mt-6 flex items-baseline gap-2">
                <span class="text-lg font-black text-rose-400">Từ 1.500.000đ</span>
                <span class="text-[9px] font-bold text-rose-500 uppercase">/ gói</span>
              </div>
              <div class="mt-6 w-full h-12 bg-white text-rose-950 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest group-hover:bg-rose-100 transition-colors">Chọn gói này</div>
            </div>
          </div>
        </div>
      </template>

      <!-- STEP 1: THEME SELECTION -->
      <template v-else-if="step === 'theme'">
        <div class="relative z-10 px-12 pt-6 text-center">
          <h2 class="text-2xl font-black italic tracking-tighter uppercase text-rose-950">Chọn <span class="text-rose-600">Mẫu Thiệp</span></h2>
          <p class="text-rose-400 mt-2 font-bold text-[10px] uppercase tracking-[0.3em]">Mỗi mẫu thiệp có mức giá riêng</p>
        </div>
        <div class="flex-1 px-12 pb-8 relative z-10 overflow-y-auto wco-scroll mt-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div v-for="t in CARD_THEMES" :key="t.id"
              @click="selectTheme(t)"
              class="group relative rounded-[2.5rem] border-2 transition-all p-3 cursor-pointer bg-white/30"
              :class="selectedTheme?.id === t.id ? 'border-rose-500 bg-white/60 shadow-xl' : 'border-white/60 hover:border-rose-200'">
              <div class="aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 relative">
                <img :src="t.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div class="absolute top-3 right-3 bg-rose-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">{{ t.priceLabel }}</div>
                <div v-if="selectedTheme?.id === t.id" class="absolute inset-0 bg-rose-500/10 flex items-center justify-center">
                  <div class="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-2xl"><Check :size="24" /></div>
                </div>
                <!-- Preview Button -->
                <button @click.stop="openPreview(t.id)" class="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 shadow-lg flex items-center gap-1.5">
                  <Eye :size="12" /> Xem thử
                </button>
              </div>
              <h4 class="text-center font-black text-rose-900 uppercase italic tracking-tighter">{{ t.name }}</h4>
              <p class="text-center text-[10px] text-rose-400 font-bold mt-1">{{ t.desc }}</p>
            </div>
          </div>
          <div class="mt-8 flex justify-center gap-4">
            <button @click="goBack" class="px-8 py-3 text-rose-300 font-bold uppercase tracking-widest text-[10px] hover:text-rose-500 transition-colors">Quay lại</button>
            <button @click="goNext" :disabled="!canGoToInfo"
              class="px-12 py-3 bg-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors">Tiếp tục</button>
          </div>
        </div>
      </template>

      <!-- STEP 2: WEDDING INFO -->
      <template v-else-if="step === 'info'">
        <div class="relative z-10 px-12 pt-6 text-center">
          <h2 class="text-2xl font-black italic tracking-tighter uppercase text-rose-950">Thông Tin <span class="text-rose-600">Thiệp Cưới</span></h2>
        </div>
        <div class="flex-1 px-12 pb-8 relative z-10 overflow-y-auto wco-scroll mt-4">
          <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Groom side -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-2"><div class="w-1.5 h-5 bg-blue-500 rounded-full"></div><span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Nhà Trai</span></div>
              <div><label class="wco-label">Tên Chú Rể</label><input v-model="weddingData.groomName" class="wco-input" placeholder="Nguyễn Văn A" /></div>
              <div><label class="wco-label">Phụ huynh nhà trai</label><textarea v-model="weddingData.groomParents" class="wco-input min-h-[80px]" placeholder="Ông: ... & Bà: ..."></textarea></div>
            </div>
            <!-- Bride side -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-2"><div class="w-1.5 h-5 bg-rose-500 rounded-full"></div><span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Nhà Gái</span></div>
              <div><label class="wco-label">Tên Cô Dâu</label><input v-model="weddingData.brideName" class="wco-input" placeholder="Trần Thị B" /></div>
              <div><label class="wco-label">Phụ huynh nhà gái</label><textarea v-model="weddingData.brideParents" class="wco-input min-h-[80px]" placeholder="Ông: ... & Bà: ..."></textarea></div>
            </div>
            <!-- Ceremony -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-2"><div class="w-1.5 h-5 bg-amber-500 rounded-full"></div><span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Lễ Cưới</span></div>
              <div class="grid grid-cols-2 gap-4">
                <div><label class="wco-label">Ngày</label><input type="date" v-model="weddingData.ceremonyDate" class="wco-input" /></div>
                <div><label class="wco-label">Giờ</label><input type="time" v-model="weddingData.ceremonyTime" class="wco-input" /></div>
              </div>
            </div>
            <!-- Party -->
            <div class="space-y-4">
              <div class="flex items-center gap-2 mb-2"><div class="w-1.5 h-5 bg-emerald-500 rounded-full"></div><span class="text-[10px] font-black text-rose-800 uppercase tracking-widest">Tiệc Mời</span></div>
              <div class="grid grid-cols-2 gap-4">
                <div><label class="wco-label">Ngày</label><input type="date" v-model="weddingData.partyDate" class="wco-input" /></div>
                <div><label class="wco-label">Giờ</label><input type="time" v-model="weddingData.partyTime" class="wco-input" /></div>
              </div>
            </div>
            <!-- QR -->
            <div><label class="wco-label">QR Nhận Tiền Mừng (link ảnh)</label><input v-model="weddingData.qrPaymentUrl" class="wco-input" placeholder="https://img.vietqr.io/..." /></div>
            <!-- Address + Map -->
            <div>
              <label class="wco-label">Địa Chỉ Tổ Chức</label>
              <input v-model="weddingData.address" class="wco-input" placeholder="Nhà hàng ABC, 123 Đường XYZ" @input="searchAddress" />
              <div v-if="weddingData.address" class="mt-3 rounded-2xl overflow-hidden border border-rose-100 h-[180px] bg-rose-50/50">
                <iframe
                  :src="`https://maps.google.com/maps?q=${encodeURIComponent(weddingData.address)}&output=embed&z=15`"
                  class="w-full h-full border-0"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div class="mt-8 flex justify-center gap-4">
            <button @click="goBack" class="px-8 py-3 text-rose-300 font-bold uppercase tracking-widest text-[10px] hover:text-rose-500">Quay lại</button>
            <button v-if="selectedTheme" @click="openPreview(selectedTheme.id, true)"
              class="px-8 py-3 bg-white border border-rose-200 text-rose-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-50 transition-colors flex items-center gap-2">
              <Eye :size="14" /> Xem trước thiệp
            </button>
            <button @click="goNext" :disabled="!canGoToPurchase"
              class="px-12 py-3 bg-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-rose-600 transition-colors">Tiếp tục</button>
          </div>
        </div>
      </template>

      <!-- STEP 3: PURCHASE -->
      <template v-else-if="step === 'purchase'">
        <WcoStepPurchase
          :quantity="quantity" @update:quantity="quantity = $event"
          :deliveryType="deliveryType" @update:deliveryType="deliveryType = $event"
          :unitPrice="unitPrice" :autoFee="autoFee" :totalPerCard="totalPerCard" :totalPrice="totalPrice"
          :guestList="guestList" :guestValidation="guestValidation" :isValidatingGuests="isValidatingGuests"
          :formatPrice="formatPrice" :canGoToPayment="canGoToPayment"
          @back="goBack" @next="goNext"
          @download="downloadTemplate" @import="onFileImport" @validate="validateGuests"
        />
      </template>

      <!-- STEP 4: PAYMENT -->
      <template v-else-if="step === 'payment'">
        <WcoStepPayment
          :totalPrice="totalPrice" :formatPrice="formatPrice" :quantity="quantity"
          :selectedTheme="selectedTheme" :deliveryType="deliveryType"
          :unitPrice="unitPrice" :autoFee="autoFee"
          :walletBalance="walletBalance" :isWalletPayment="shouldUseWalletPayment"
          :paymentReceipt="paymentReceipt" :isSubmitting="isSubmitting" :canFinish="canFinish"
          @back="goBack" @receipt="onReceiptUpload" @submit="submitOrder"
        />
      </template>

      <!-- SUCCESS -->
      <template v-else-if="step === 'success'">
        <div class="flex-1 flex flex-col items-center justify-center p-12 relative z-10 animate-entrance text-center">
          <div class="relative mb-10">
            <div class="w-28 h-28 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl"><Check :size="56" /></div>
            <div class="absolute -top-3 -right-3 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce"><Heart :size="20" /></div>
          </div>
          <h2 class="text-4xl font-black text-rose-950 uppercase italic tracking-tighter mb-3">THÀNH CÔNG!</h2>
          <p class="text-rose-500 font-bold uppercase tracking-[0.3em] text-sm mb-8">Đơn hàng đã gửi lên hệ thống. Admin sẽ duyệt sớm nhất.</p>
          <button @click="handleClose(false)" class="px-16 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-rose-700 transition-colors">Đóng</button>
        </div>
      </template>

      <!-- Noise -->
      <div class="absolute inset-0 pointer-events-none opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>
    </div>
  </CnModal>

  <!-- Card Preview Modal -->
  <WcoCardPreviewModal
    v-model="showPreview"
    :templateId="previewTemplateId"
    :weddingData="previewWithUserData ? weddingData : undefined"
  />
</template>

<script setup lang="ts">
import { CheckCircle2, Check, Heart, Layout, Sparkles, Eye } from 'lucide-vue-next';
import { CnModal } from 'glass-studio-ui-pro';
import { useCardOrder } from '../composables/useCardOrder';
import WcoStepPurchase from './WcoStepPurchase.vue';
import WcoStepPayment from './WcoStepPayment.vue';
import WcoCardPreviewModal from './WcoCardPreviewModal.vue';

defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue', 'orderCreated']);

const {
  step, isSubmitting, selectedTheme, weddingData, quantity, deliveryType,
  guestList, guestValidation, isValidatingGuests,
  paymentReceipt, CARD_THEMES,
  unitPrice, autoFee, totalPerCard, totalPrice, formatPrice,
  canGoToInfo, canGoToPurchase, canGoToPayment, canFinish,
  walletBalance, shouldUseWalletPayment,
  selectPlan, selectTheme, goBack, goNext,
  downloadTemplate, importExcel, validateGuests,
  handleReceiptUpload, submitOrder, resetAll,
} = useCardOrder(emit);

const stepLabels = ['Chọn Mẫu', 'Thông Tin', 'Đặt Hàng', 'Thanh Toán'];
const stepMap: Record<string, number> = { theme: 0, info: 1, purchase: 2, payment: 3 };
const stepIndex = computed(() => stepMap[step.value] ?? -1);

import { computed, ref } from 'vue';

const searchAddress = () => { /* Google Maps auto-updates via iframe */ };

const onFileImport = (file: File) => importExcel(file);
const onReceiptUpload = (file: File) => handleReceiptUpload(file);

// Preview
const showPreview = ref(false);
const previewTemplateId = ref('');
const previewWithUserData = ref(false);

const openPreview = (templateId: string, withUserData = false) => {
  previewTemplateId.value = templateId;
  previewWithUserData.value = withUserData;
  showPreview.value = true;
};

const handleClose = (val: boolean) => {
  if (!val) resetAll();
  emit('update:modelValue', val);
};
</script>



<style scoped>
.wco-scroll::-webkit-scrollbar { width: 4px; }
.wco-scroll::-webkit-scrollbar-thumb { background: rgba(244,63,94,0.2); border-radius: 10px; }
.wco-scroll { scrollbar-width: thin; scrollbar-color: rgba(244,63,94,0.3) transparent; }
.animate-entrance { animation: wcoEntrance 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
@keyframes wcoEntrance {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.wco-label {
  display: block;
  font-size: 10px;
  font-weight: 900;
  color: #fb7185;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
  margin-left: 0.25rem;
}
.wco-input {
  width: 100%;
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(255,228,230,1);
  border-radius: 0.75rem;
  padding: 0.75rem 1.25rem;
  outline: none;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1c1917;
}
.wco-input:focus {
  border-color: #fb7185;
  background: white;
}
.wco-input::placeholder {
  color: #fecdd3;
}
</style>
