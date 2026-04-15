<template>
  <CnModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :title="''"
    width="1000px"
    color="rose-300"
    class="wedding-service-modal-root"
  >
    <!-- Content only, base background now managed by color="rose" prop -->
    <div
      class="wedding-service-main relative flex flex-col h-full max-h-[85vh] overflow-hidden"
    >
      <!-- 🌸 Ambient Glow (Rose) -->
      <div
        class="absolute -top-32 -right-32 w-96 h-96 bg-rose-300/30 blur-[130px] rounded-full pointer-events-none"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/20 blur-[100px] rounded-full pointer-events-none"
      ></div>

      <!-- Premium Header (Rose) -->
      <div class="px-12 py-10 relative z-10 flex items-center justify-between">
        <div>
          <h2
            class="text-3xl font-black italic tracking-tighter uppercase text-rose-950 flex items-center gap-4"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(244,63,94,0.3)]"
            >
              <Heart class="w-6 h-6" />
            </div>
            <span class="text-rose-600">Đăng Ký</span> Dịch Vụ Thiệp Cưới
          </h2>
          <p
            class="text-rose-400 mt-2 font-bold text-[10px] uppercase tracking-[0.3em] ml-16"
          >
            Nova Wedding Ecosystem • Premium License
          </p>
        </div>
      </div>

      <!-- Stepper Indicator (Rose) -->
      <div
        class="flex items-center justify-between mt-12 mb-12 px-32 relative z-10"
      >
        <div
          class="absolute top-1/2 left-40 right-40 h-[2px] bg-rose-200/30 -z-10"
        ></div>
        <div
          v-for="i in totalSteps"
          :key="i"
          class="group relative flex flex-col items-center gap-3"
        >
          <div
            class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2"
            :class="
              currentStep >= i
                ? 'bg-rose-500 text-white border-transparent shadow-[0_10px_25px_rgba(244,63,94,0.2)]'
                : 'bg-white/60 border-rose-100 text-rose-200'
            "
          >
            <span v-if="currentStep <= i" class="text-sm font-black">{{
              i
            }}</span>
            <CheckCircle2 v-else class="w-6 h-6" />
          </div>
          <span
            class="absolute -bottom-8 text-[9px] font-black uppercase tracking-widest whitespace-nowrap"
            :class="
              currentStep >= i
                ? 'text-rose-600 font-extrabold'
                : 'text-rose-300'
            "
          >
            {{ i === 1 ? "Chọn Mẫu" : i === 2 ? "Thông Tin" : "Khách Mời" }}
          </span>
        </div>
      </div>

      <!-- STEP CONTENT -->
      <div
        class="flex-1 overflow-y-auto px-12 pb-12 wedding-custom-scroll relative z-10 mt-6"
      >
        <!-- STEP 1: TEMPLATE -->
        <div v-if="currentStep === 1" class="animate-entrance space-y-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="t in templates"
              :key="t.id"
              class="group relative aspect-[3/4.2] rounded-[3rem] overflow-hidden border-2 transition-all duration-700 cursor-pointer shadow-sm hover:shadow-xl bg-white/30"
              :class="
                selectedTemplate === t.id
                  ? 'border-rose-400 ring-4 ring-rose-100 scale-[1.02]'
                  : 'border-white/50 hover:border-rose-200'
              "
              @click="selectTemplate(t.id)"
            >
              <div v-if="t.thumb" class="w-full h-full relative">
                <img
                  :src="t.thumb"
                  class="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"
                ></div>
              </div>
              <div
                v-else
                class="w-full h-full bg-rose-50/50 flex flex-col items-center justify-center text-rose-200 gap-4"
              >
                <div
                  class="w-24 h-24 rounded-full bg-white flex items-center justify-center border border-rose-50 group-hover:border-rose-300 transition-all group-hover:bg-rose-100"
                >
                  <Search
                    class="w-12 h-12 group-hover:text-rose-500 transition-colors"
                  />
                </div>
                <span
                  class="text-[10px] font-black uppercase tracking-widest text-rose-300 group-hover:text-rose-500"
                  >Yêu cầu riêng</span
                >
              </div>

              <div class="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-2">
                <div
                  v-if="selectedTemplate === t.id"
                  class="w-fit px-4 py-1.5 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest mb-2 shadow-lg"
                >
                  Đang chọn
                </div>
                <h4
                  class="text-white font-black uppercase text-xl tracking-tighter italic leading-none"
                >
                  {{ t.name }}
                </h4>
                <p
                  class="text-[10px] text-white/70 font-medium leading-relaxed"
                >
                  {{ t.desc }}
                </p>
              </div>
            </div>
          </div>
          <!-- Space for selection other -->
          <div
            v-if="selectedTemplate === 'other'"
            class="mt-8 animate-entrance"
          >
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-4 bg-rose-500 rounded-full"></div>
                <label
                  class="text-[11px] font-black text-rose-900 uppercase tracking-widest"
                  >Chi tiết yêu cầu thiết kế riêng</label
                >
              </div>
              <textarea
                v-model="customDesc"
                class="w-full bg-white/60 border border-rose-100 rounded-[2.5rem] px-10 py-8 outline-none focus:border-rose-400 focus:bg-white transition-all text-sm font-medium text-rose-950 placeholder:text-rose-200 shadow-sm"
                placeholder="Ví dụ: Tôi muốn phong cách vintage với màu nâu đất, có hình vẽ chibi của cô dâu chú rể..."
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- STEP 2: DETAILS -->
        <div v-else-if="currentStep === 2" class="animate-entrance space-y-12">
          <div class="grid grid-cols-2 gap-16">
            <div class="space-y-10">
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-4"
                  >Thông tin Chú Rể</label
                >
                <input
                  v-model="weddingData.groomName"
                  class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 focus:bg-white transition-all text-sm font-bold text-rose-950"
                  placeholder="Lâm Thành Vinh"
                />
              </div>
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-4"
                  >Phụ huynh nhà trai</label
                >
                <textarea
                  v-model="weddingData.groomParents"
                  class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 focus:bg-white transition-all text-sm font-bold text-rose-950 min-h-[140px]"
                  placeholder="Ông: Lâm A & Bà: Nguyễn B"
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-8">
                <div class="space-y-4">
                  <input
                    v-model="weddingData.date"
                    type="date"
                    class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 text-xs font-bold text-rose-950"
                  />
                </div>
                <div class="space-y-4">
                  <input
                    v-model="weddingData.time"
                    type="time"
                    class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 text-xs font-bold text-rose-950"
                  />
                </div>
              </div>
            </div>
            <div class="space-y-10">
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-4"
                  >Thông tin Cô Dâu</label
                >
                <input
                  v-model="weddingData.brideName"
                  class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 focus:bg-white transition-all text-sm font-bold text-rose-950"
                  placeholder="Thanh Thanh"
                />
              </div>
              <div class="space-y-4">
                <label
                  class="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-4"
                  >Phụ huynh nhà gái</label
                >
                <textarea
                  v-model="weddingData.brideParents"
                  class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 focus:bg-white transition-all text-sm font-bold text-rose-950 min-h-[140px]"
                  placeholder="Ông: Trần C & Bà: Lê D"
                ></textarea>
              </div>
              <div class="space-y-4">
                <input
                  v-model="weddingData.location"
                  class="w-full bg-white/60 border border-rose-100 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 text-sm font-bold text-rose-950"
                  placeholder="Địa điểm tổ chức..."
                />
              </div>
            </div>
          </div>
        </div>

        <!-- STEP 3: GUESTS -->
        <div v-else-if="currentStep === 3" class="animate-entrance space-y-10">
          <div
            class="p-12 bg-white/40 border border-rose-100/30 rounded-[4rem] backdrop-blur-xl space-y-8 shadow-inner"
          >
            <div
              v-for="(guest, idx) in guestList"
              :key="idx"
              class="flex items-center gap-8 group"
            >
              <div
                class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[12px] font-black text-rose-500 border border-rose-100 shadow-sm"
              >
                {{ idx + 1 }}
              </div>
              <input
                v-model="guest.name"
                class="flex-1 bg-white border border-rose-50 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 transition-all text-sm font-bold text-rose-950"
                placeholder="Tên khách mời"
              />
              <input
                v-model="guest.contact"
                class="flex-[1.8] bg-white border border-rose-50 rounded-2xl py-6 px-10 outline-none focus:border-rose-400 transition-all text-sm font-bold text-rose-950"
                placeholder="SĐT / Email"
              />
              <button
                @click="removeGuest(idx)"
                class="w-14 h-14 rounded-2xl bg-white text-rose-200 hover:bg-rose-500 hover:text-white border border-rose-50 shadow-sm active:scale-90 flex items-center justify-center"
              >
                <Trash2 :size="20" />
              </button>
            </div>
            <button
              @click="addGuest"
              class="w-full py-8 border-2 border-dashed border-rose-300/30 rounded-[2.5rem] text-rose-300 hover:text-rose-600 hover:bg-white/60 transition-all flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-[0.2em] mt-8"
            >
              <Plus :size="20" /> Thêm khách mời
            </button>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <!-- ACTIONS -->
      <div class="flex items-center justify-between">
        <CnButton
          v-if="currentStep > 1"
          variant="text"
          @click="prevStep"
          class="text-rose-400 hover:text-rose-600 uppercase font-black text-[11px] tracking-widest"
          ><ChevronLeft :size="22" /> Quay lại</CnButton
        >
        <div v-else></div>
        <div class="flex items-center gap-6">
          <CnButton
            v-if="currentStep < totalSteps"
            @click="nextStep"
            class="!px-16 !text-white font-black uppercase tracking-widest text-[11px] h-16"
          >
            <div class="flex items-center gap-2">
              <div>Tiếp tục</div>
              <ChevronRight :size="22" />
            </div>
          </CnButton>
          <CnButton
            v-else
            @click="finish"
            :disabled="!canFinish"
            class="!px-20 !bg-rose-600 !text-white font-black uppercase tracking-widest text-[11px] h-16 rounded-2xl shadow-xl active:scale-95 border-none"
            >HOÀN TẤT & ĐẶT HÀNG</CnButton
          >
        </div>
      </div>
    </template>
  </CnModal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { CnModal, CnButton } from "glass-studio-ui-pro";
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Search,
  Heart,
} from "lucide-vue-next";

// Import sample images for templates
import elegantThumb from "@/assets/images/wedding_couple_elegant.png";
import bookThumb from "@/assets/images/wd2.jpg";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue", "complete"]);

const currentStep = ref(1);
const totalSteps = 3;

const templates = [
  {
    id: "elegant",
    name: "Elegant Minimal Suite",
    thumb: elegantThumb,
    desc: "Phong cách tối giản, sang trọng với các tông màu trung tính.",
  },
  {
    id: "book",
    name: "Classic 3D Wedding Book",
    thumb: bookThumb,
    desc: "Thiết kế lật sách 3D cổ điển, mang đậm nét truyền thống.",
  },
  {
    id: "other",
    name: "Lựa chọn khác...",
    thumb: null,
    desc: "Mô tả yêu cầu riêng của bạn cho đội ngũ thiết kế.",
  },
];

const selectedTemplate = ref("");
const customDesc = ref("");
const weddingData = ref({
  groomName: "",
  brideName: "",
  groomParents: "",
  brideParents: "",
  date: "",
  time: "",
  location: "",
  qrInfo: "",
  mapUrl: "",
});
const guestList = ref([{ name: "", contact: "" }]);

const addGuest = () => guestList.value.push({ name: "", contact: "" });
const removeGuest = (index: number) =>
  guestList.value.length > 1 && guestList.value.splice(index, 1);
const isGuestValid = (guest: any) =>
  guest.name &&
  (guest.contact.includes("@") || /^\+?[0-9\s-]{8,}$/.test(guest.contact));
const canFinish = computed(() => guestList.value.every(isGuestValid));

const nextStep = () => {
  if (currentStep.value < totalSteps) currentStep.value++;
};
const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};
const selectTemplate = (id: string) => {
  selectedTemplate.value = id;
  nextStep();
};

const finish = () => {
  emit("complete", {
    templateId: selectedTemplate.value,
    customTemplateDesc:
      selectedTemplate.value === "other" ? customDesc.value : null,
    weddingData: weddingData.value,
    guestList: guestList.value,
  });
  emit("update:modelValue", false);
};
</script>

<style>
/* 
 * CRITICAL UI OVERRIDE: 
 * Target the library's internal modal box layout.
 * Background is now handled by color="rose" prop.
 */
.wedding-service-modal-root [class*="modal-box"],
.wedding-service-modal-root [class*="modal-content"],
.wedding-service-modal-root .cm-modal-box,
.wedding-service-modal-root .cn-modal-box {
  padding: 0 !important;
  border-radius: 3.5rem !important;
  overflow: hidden !important; /* CRITICAL: Prevent outer scrollbar */
}

/* Hide library UI elements */
.wedding-service-modal-root [class*="modal-header"],
.wedding-service-modal-root [class*="modal-close"],
.wedding-service-modal-root .cm-modal-close {
  display: none !important;
}

/* 
 * INTERNAL SCROLLBAR STYLING 
 * Clear the "thumb track" background and fix positioning
 */
.wedding-custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 63, 94, 0.4) transparent;
}

.wedding-custom-scroll::-webkit-scrollbar {
  width: 6px;
  background: transparent !important; /* Clear track background */
}

.wedding-custom-scroll::-webkit-scrollbar-track {
  background: transparent !important; /* Clear track background */
  margin: 20px 0;
}

.wedding-custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(244, 63, 94, 0.2) !important;
  border-radius: 10px;
  border: 1px solid transparent;
  background-clip: content-box;
}

.wedding-custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(244, 63, 94, 0.5) !important;
}
</style>

<style scoped>
.animate-entrance {
  animation: entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes entrance {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Fix for date/time input icons in light theme */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  opacity: 0.3;
  cursor: pointer;
  filter: sepia(100%) hue-rotate(300deg) saturate(500%);
}
</style>
