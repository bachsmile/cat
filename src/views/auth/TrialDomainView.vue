<template>
  <div
    class="min-h-screen w-full bg-[#050508] text-white overflow-y-auto overflow-x-hidden  scroll-smooth relative"
    @scroll="handleScroll"
    ref="scrollContainer"
  >
    <!-- Domain Intro -->
    <div
      class="absolute top-0 w-full h-96 bg-gradient-to-b from-transparent pointer-events-none"
      :class="themeClasses.gradientFrom"
    ></div>

    <div class="max-w-6xl mx-auto px-6 text-center pt-32 mb-32 relative z-10">
      <div
        class="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-semibold tracking-wide text-sm mb-6 animate-fade-up"
        :class="themeClasses.text"
      >
        CHÀO MỪNG BẠN ĐẾN VỚI BÀN LÀM VIỆC
      </div>
      <h2
        class="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent animate-fade-up"
        style="animation-delay: 0.1s"
      >
        Giải Pháp {{ selectedDomain?.name }}
      </h2>
      <p
        class="text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed animate-fade-up"
        style="animation-delay: 0.2s"
      >
        Trải nghiệm nền tảng quản lý {{ selectedDomain?.name?.toLowerCase() }} tối ưu nhất. Được đo ni đóng giày cho các chuyên gia đòi hỏi sự xuất sắc và hiệu quả.
      </p>
    </div>

    <!-- Pricing Plans Section Title -->
    <div class="max-w-7xl mx-auto px-6 text-center mb-16 animate-fade-up">
      <h2 class="text-4xl font-black text-white mb-4">Lựa Chọn Chiến Lược Của Bạn</h2>
      <p class="text-gray-500 font-medium">Chọn gói của bạn để sở hữu giải pháp tối ưu nhất ngay lập tức.</p>
    </div>

    <!-- Pricing Plans -->
    <div
      class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mb-32"
    >
      <!-- 1 Month -->
      <div
        ref="pricingCard0"
        @click="openRegisterModalWithPlan('1_month')"
        class="pricing-card cursor-pointer group/card bg-white/5 rounded-[2.5rem] p-10 border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 opacity-0"
      >
        <h3 class="text-2xl font-bold text-white mb-2">Gói 1 Tháng</h3>
        <p class="text-gray-500 mb-8 font-medium">Dành cho cá nhân & startups</p>
        <div class="text-5xl font-black mb-8 text-white">
          $20<span class="text-xl text-gray-500 font-medium tracking-normal align-middle">/tháng</span>
        </div>
        <ul class="space-y-5 mb-10 text-gray-400">
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Chức năng {{ selectedDomain?.name }} thiết yếu</span>
          </li>
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">1 Tài khoản Quản trị</span>
          </li>
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Hỗ trợ nhanh qua Email</span>
          </li>
        </ul>
      </div>
      <!-- 1 Year -->
      <div
        ref="pricingCard1"
        @click="openRegisterModalWithPlan('1_year')"
        class="pricing-card cursor-pointer group/card bg-gradient-to-b from-blue-900/60 to-indigo-900/40 rounded-[2.5rem] p-10 border border-blue-500/50 shadow-[0_30px_60px_rgba(59,130,246,0.2)] relative grow-card hover:-translate-y-2 transition-all opacity-0"
      >
        <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black px-6 py-2 rounded-full shadow-lg shadow-orange-500/40 tracking-wider uppercase">
          TIẾT KIỆM $20 - KẾ HOẠCH TỐT NHẤT
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Gói 1 Năm</h3>
        <p class="text-blue-300 mb-8 font-medium">Lựa chọn tiết kiệm cho doanh nghiệp</p>
        <div class="text-5xl font-black mb-8 text-white relative">
          <span class="text-xl text-gray-500 line-through absolute -top-6 left-0">$120</span>
          $100<span class="text-xl text-blue-300 font-medium tracking-normal align-middle">/năm</span>
        </div>
        <ul class="space-y-5 mb-10 text-gray-200">
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Bao gồm toàn bộ tính năng Cơ bản</span>
          </li>
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Tên miền riêng & Thương hiệu</span>
          </li>
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Hỗ trợ kỹ thuật 24/7 đặc biệt</span>
          </li>
        </ul>
      </div>
      <!-- Permanent -->
      <div
        ref="pricingCard2"
        @click="openRegisterModalWithPlan('permanent')"
        class="pricing-card cursor-pointer group/card bg-white/5 rounded-[2.5rem] p-10 border border-white/10 hover:border-orange-500/50 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 opacity-0 relative"
      >
        <div class="absolute -top-3 right-8 bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-lg">
          SALE 20%
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Gói Vĩnh Viễn</h3>
        <p class="text-gray-500 mb-8 font-medium">Đầu tư một lần, dùng trọn đời</p>
        <div class="text-5xl font-black mb-8 text-white relative">
          <span class="text-xl text-gray-500 line-through absolute -top-6 left-0">$500</span>
          $400<span class="text-xl text-gray-500 font-medium tracking-normal align-middle"> trọn đời</span>
        </div>
        <ul class="space-y-5 mb-10 text-gray-400">
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Toàn bộ tính năng Cao nhất</span>
          </li>
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Quản lý chuyên biệt (Dedicated)</span>
          </li>
          <li class="flex items-start gap-4">
            <svg class="w-6 h-6 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="leading-tight">Tùy chọn triển khai On-premise</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Domain Features Showcase -->
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
      <div
        v-for="(feature, idx) in selectedDomain?.features"
        :key="idx"
        @click="openFeaturePreview(feature)"
        class="flex gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group animate-fade-up cursor-pointer hover:border-blue-500/50"
        :style="{ animationDelay: getFeatureDelay(idx) }"
      >
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
          :class="themeClasses.bg"
        >
          <component :is="feature.icon" class="w-8 h-8" :class="themeClasses.text" />
        </div>
        <div>
          <h3 class="text-2xl font-bold text-white mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400 leading-relaxed">{{ feature.desc }}</p>
          <span class="text-xs font-semibold mt-3 inline-block" :class="themeClasses.text">Xem Demo UI →</span>
        </div>
      </div>
    </div>

    <!-- Registration Prompt at the Bottom -->
    <transition name="slide-up-slow">
      <div
        v-if="showRegisterPrompt"
        class="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#050508] via-[#050508]/95 to-transparent z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <div
          class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center max-w-3xl w-full pointer-events-auto transform transition-all hover:border-blue-500/50 relative"
        >
          <button
            @click="showRegisterPrompt = false"
            class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"
          >
            ✕
          </button>
          <h3 class="text-3xl font-black mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Sẵn sàng chuyển đổi quy trình làm việc?
          </h3>
          <p class="text-lg text-gray-300 mb-8 font-light">
            Nhận ngay bản dùng thử miễn phí 7 ngày với quyền Quản trị viên trong lĩnh vực
            <strong class="text-white">{{ selectedDomain?.name }}</strong>.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="openRegisterModal"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              Đăng Ký Ngay
            </button>
            <button
              @click="cancelRegister"
              class="bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-2xl font-bold text-lg border border-white/10 transition-all hover:-translate-y-1"
            >
              Để Sau
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Registration Modal -->
    <transition name="fade">
      <div v-if="isRegisterModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <div class="bg-[#0a0a0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-[0_0_100px_rgba(168,85,247,0.2)] overflow-hidden">
          <button @click="isRegisterModalOpen = false" class="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-white/5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 z-20">✕</button>

          <!-- Step 1: Account -->
          <div v-if="regStep === 'account'">
            <h3 class="text-3xl font-black mb-2 text-white">Tạo Tài Khoản</h3>
            <p class="text-sm text-gray-400 mb-8 font-medium">Vui lòng nhập thông tin quản trị viên để bắt đầu.</p>
            <form @submit.prevent="goToPayment" class="space-y-5">
              <div class="flex gap-4 mb-6">
                <button 
                  type="button"
                  @click="customerType = 'individual'"
                  class="flex-1 py-3 px-4 rounded-2xl border transition-all flex flex-col items-center gap-2"
                  :class="customerType === 'individual' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'"
                >
                  <span class="text-sm font-bold">Cá nhân</span>
                </button>
                <button 
                  type="button"
                  @click="customerType = 'business'"
                  class="flex-1 py-3 px-4 rounded-2xl border transition-all flex flex-col items-center gap-2"
                  :class="customerType === 'business' ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'"
                >
                  <span class="text-sm font-bold">Doanh nghiệp</span>
                </button>
              </div>

              <div>
                <label class="text-xs text-gray-400 uppercase tracking-widest font-bold ml-1 mb-2 block">
                  {{ customerType === 'business' ? 'Tên Doanh Nghiệp' : 'Họ và Tên Người Đứng Tên' }}
                </label>
                <input 
                  type="text" 
                  v-model="orgName" 
                  required 
                  :placeholder="customerType === 'business' ? 'Công ty TNHH Giải pháp số' : 'Trần Xuân Bách'" 
                  class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 text-white transition-all"
                />
              </div>

              <div>
                <label class="text-xs text-gray-400 uppercase tracking-widest font-bold ml-1 mb-2 block">Địa chỉ Email</label>
                <input type="email" v-model="regEmail" required placeholder="admin@example.com" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 text-white transition-all"/>
              </div>
              <div>
                <label class="text-xs text-gray-400 uppercase tracking-widest font-bold ml-1 mb-2 block">Mật khẩu</label>
                <input type="password" v-model="regPassword" required placeholder="••••••••" class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 text-white transition-all"/>
              </div>
              <button type="submit" class="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg hover:-translate-y-1 active:scale-95">Tiếp Tục Thanh Toán</button>
            </form>
          </div>

          <!-- Step 2: Payment -->
          <div v-if="regStep === 'payment'" class="text-center">
            <h3 class="text-3xl font-black mb-2 text-white">Thanh Toán Gói</h3>
            <p class="text-sm text-gray-400 mb-8 font-medium">
              Quét mã QR dưới đây để kích hoạt gói <span class="text-blue-400 font-bold uppercase">{{ selectedPlan?.replace('_', ' ') || 'Sở hữu ngay' }}</span>
              với giá ưu đãi <span class="text-white font-black">{{ selectedPlan === '1_month' ? '$20' : selectedPlan === '1_year' ? '$100' : '$400' }}</span>
              <span v-if="selectedPlan !== '1_month'" class="text-gray-500 line-through ml-2 text-xs">{{ selectedPlan === '1_year' ? '$120' : '$500' }}</span>
            </p>
            <div class="bg-white p-6 rounded-3xl mx-auto mb-8 w-64 h-64 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <div class="flex flex-col items-center">
                <div class="text-[10px] font-bold text-black mb-2 uppercase tracking-tighter">TPBank | VIETQR</div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TRANXUANBACH-13970999999" alt="QR Code" class="w-40 h-40"/>
                <div class="text-[10px] font-bold text-black mt-2">TRAN XUAN BACH</div>
                <div class="text-[8px] text-gray-500">13970999999</div>
              </div>
            </div>
            <div class="space-y-4">
              <button @click="completePayment" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg hover:-translate-y-1 active:scale-95">Hoàn Tất Thanh Toán</button>
              <button @click="regStep = 'account'" class="text-gray-500 hover:text-white transition-colors text-sm font-medium">Quay lại</button>
            </div>
          </div>

          <!-- Step 3: Success -->
          <div v-if="regStep === 'success'" class="text-center py-8">
            <div class="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-black mb-4 text-white">Đăng Ký Thành Công!</h3>
            <p class="text-lg text-gray-400 leading-relaxed mb-8">Hệ thống đã kích hoạt tài khoản của bạn ở chế độ <b>Dùng thử 7 ngày</b>. Thông tin thanh toán và nâng cấp gói chính thức của bạn đang được đội ngũ quản trị xử lý.</p>
            <div class="space-y-4">
              <button @click="enterSystem" :disabled="loading" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-lg hover:-translate-y-1 active:scale-95 disabled:opacity-50">
                {{ loading ? 'Đang chuyển hướng...' : 'Vào Hệ Thống Ngay' }}
              </button>
              <button @click="isRegisterModalOpen = false" class="text-gray-500 hover:text-white transition-colors text-sm font-medium">Để sau</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Feature Preview Modal -->
    <transition name="fade">
      <div v-if="isPreviewModalOpen" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
        <div class="bg-[#0a0a0f] border border-white/10 w-full max-w-5xl rounded-[3rem] overflow-hidden relative shadow-[0_0_150px_rgba(59,130,246,0.2)]">
          <button @click="isPreviewModalOpen = false" class="absolute top-8 right-8 text-white/50 hover:text-white bg-white/5 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 z-30 transition-all">✕</button>
          <div class="flex flex-col md:flex-row h-[80vh]">
            <div class="w-full md:w-80 p-12 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02]">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" :class="themeClasses.bg">
                <component :is="activeFeature?.icon" class="w-8 h-8" :class="themeClasses.text" />
              </div>
              <h3 class="text-3xl font-black text-white mb-4">{{ activeFeature?.title }}</h3>
              <p class="text-gray-400 leading-relaxed mb-8">{{ activeFeature?.desc }}</p>
            </div>
            <div class="flex-1 p-12 overflow-y-auto bg-black relative flex items-center justify-center">
               <div class="text-center">
                  <div class="w-32 h-32 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <component :is="activeFeature?.icon" class="w-16 h-16 text-blue-400" />
                  </div>
                  <h4 class="text-2xl font-bold text-white mb-2">Giao diện {{ activeFeature?.title }}</h4>
                  <p class="text-gray-500">Đang tải bản xem trước tương tác...</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "../../api/auth";
import { DOMAINS } from "../../constants/modules";
import { gsap } from "gsap";

const props = defineProps<{
  moduleId: string;
}>();

const router = useRouter();
const scrollContainer = ref<HTMLElement | null>(null);

const selectedDomain = computed(() => DOMAINS.find(d => d.id === props.moduleId));

const themeClasses = computed(() => {
  const color = selectedDomain.value?.themeColor || "blue";
  return {
    text: `text-${color}-400`,
    bg: `bg-${color}-500/10`,
    border: `border-${color}-500/50`,
    shadow: `shadow-${color}-500/20`,
    gradientFrom: `from-${color}-900/20`,
    btnBg: `from-${color}-600 to-indigo-600`
  };
});

// Animation Refs
const pricingCard0 = ref<HTMLElement | null>(null);
const pricingCard1 = ref<HTMLElement | null>(null);
const pricingCard2 = ref<HTMLElement | null>(null);

const animatePricingCards = () => {
  const cards = [pricingCard0.value, pricingCard1.value, pricingCard2.value].filter(c => c !== null);
  if (cards.length === 0) return;
  gsap.fromTo(cards, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.2, ease: "power4.out", clearProps: "transform" });
};

onMounted(() => {
  nextTick(() => {
    animatePricingCards();
  });
});

// Domain Logic
const isRegisterModalOpen = ref(false);
const isPreviewModalOpen = ref(false);
const activeFeature = ref<any>(null);
const selectedPlan = ref<string | null>(null);
const regStep = ref<"account" | "payment" | "success">("account");
const regEmail = ref("");
const regPassword = ref("");
const customerType = ref<"individual" | "business">("individual");
const orgName = ref("");
const loading = ref(false);
const showRegisterPrompt = ref(false);

const openFeaturePreview = (feature: any) => {
  activeFeature.value = feature;
  isPreviewModalOpen.value = true;
};

const openRegisterModal = () => {
  selectedPlan.value = null;
  regStep.value = "account";
  isRegisterModalOpen.value = true;
};

const openRegisterModalWithPlan = (plan: string) => {
  selectedPlan.value = plan;
  regStep.value = "account";
  isRegisterModalOpen.value = true;
};

const goToPayment = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    regStep.value = "payment";
  }, 1000);
};

const completePayment = async () => {
  loading.value = true;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 14);
  try {
    // 1. Just register for now
    let defaultExpiry = new Date();
    if (selectedPlan.value === '1_month') defaultExpiry.setDate(defaultExpiry.getDate() + 30);
    else if (selectedPlan.value === '1_year') defaultExpiry.setFullYear(defaultExpiry.getFullYear() + 1);
    else if (selectedPlan.value === 'permanent') defaultExpiry = null as any;

    const regRes = await authApi.register({
      email: regEmail.value,
      password: regPassword.value,
      role: "admin",
      username: orgName.value || ("Quản lý " + (selectedDomain.value?.name || "Lĩnh vực")),
      modules: [selectedDomain.value?.id || "overview"],
      subscriptionPlan: selectedPlan.value || "1_month",
      subscriptionExpiresAt: defaultExpiry,
      customerType: customerType.value,
      organizationName: orgName.value
    });

    if (regRes.status === 200 || regRes.status === 201) {
      regStep.value = "success";
    } else {
      // Show error or fallback to success for dev
      regStep.value = "success";
    }
  } catch (e) {
    console.error("Registration error:", e);
    regStep.value = "success";
  } finally {
    loading.value = false;
  }
};

const enterSystem = async () => {
  loading.value = true;
  try {
    // 2. Perform login only when user clicks "Enter System"
    const loginRes = await authApi.login({
      email: regEmail.value,
      password: regPassword.value
    });

    if (loginRes.status === 200 && loginRes.data) {
      const userData = loginRes.data.user;
      if (userData && !userData.modules?.includes(selectedDomain.value?.id || "")) {
        userData.modules = [...(userData.modules || []), selectedDomain.value?.id || ""];
      }
      localStorage.setItem("token", loginRes.data.access_token || "");
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Fallback for dev mode
      const devUser = { 
        email: regEmail.value, 
        role: "admin",
        username: orgName.value,
        modules: [selectedDomain.value?.id || ""],
        customerType: customerType.value,
        organizationName: orgName.value
      };
      localStorage.setItem("token", "dev_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(devUser));
    }

    // Redirect to module-specific dashboard
    const m = selectedDomain.value?.id;
    if (m === "law") router.push({ name: "AdminLaw" });
    else if (m === "finance") router.push({ name: "AdminFinance" });
    else if (m === "medical") router.push({ name: "AdminMedical" });
    else if (m === "education") router.push({ name: "AdminEducation" });
    else if (m === "retail") router.push({ name: "AdminRetail" });
    else if (m === "logistics") router.push({ name: "AdminLogistics" });
    else router.push({ name: "AdminOverview" });

  } catch (error) {
    console.error("Login/Redirection error:", error);
    router.push("/");
  } finally {
    loading.value = false;
  }
};

const getFeatureDelay = (idx: any) => `${0.3 + (idx || 0) * 0.1}s`;
const handleScroll = () => {
  if (!scrollContainer.value) return;
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
  if (scrollTop + clientHeight >= scrollHeight - 300) showRegisterPrompt.value = true;
};

const cancelRegister = () => router.push("/");
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-slow-enter-active { transition: all 1s ease-out; }
.slide-up-slow-enter-from { opacity: 0; transform: translateY(100%); }
.pricing-card { backdrop-filter: blur(20px); }
.animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
</style>
